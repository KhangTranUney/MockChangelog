module Fastlane
  module Actions
    class ActGenerateChangelogAction < Action
      def self.run(params)
        output_path = "changelog.md"

        UI.header "📝 Generating Changelog"

        begin

          # ──────────────────────────────────────────────────────────────
          # Step 1: Read JIRA config from ci.config.yml
          #   Uses ActReadConfigAction to load pr_title_check -> jira_prefix
          #   and pr_title_check -> jira_url for linking tickets.
          # ──────────────────────────────────────────────────────────────
          config = Fastlane::Actions::ActReadConfigAction.run({})
          jira_prefix = config.dig('pr_title_check', 'jira_prefix')
          jira_url = config.dig('pr_title_check', 'jira_url')
          unless jira_prefix
            UI.user_error!("jira_prefix not found in ci.config.yml under pr_title_check")
          end
          UI.message "📍 Using JIRA prefix: #{jira_prefix}"
          UI.message "📍 Using JIRA URL: #{jira_url}" if jira_url

          # ──────────────────────────────────────────────────────────────
          # Step 2: Read version from config/version/version.properties
          #   version_name  = VERSION_NAME for display and boundary search
          #                   (e.g. "26.05.10")
          #   version_code  = VERSION_CODE for display
          #                   (e.g. "100")
          # ──────────────────────────────────────────────────────────────
          project_root = Dir.pwd
          while project_root != "/" && !File.exist?(File.join(project_root, "config", "version", "version.properties"))
            project_root = File.dirname(project_root)
          end

          version_file = File.join(project_root, "config", "version", "version.properties")
          unless File.exist?(version_file)
            UI.user_error!("version.properties file not found at #{version_file}")
          end

          properties_content = File.read(version_file)
          name_match = properties_content.match(/^VERSION_NAME=(.+)$/)
          code_match = properties_content.match(/^VERSION_CODE=(.+)$/)
          unless name_match
            UI.user_error!("VERSION_NAME not found in version.properties!")
          end
          unless code_match
            UI.user_error!("VERSION_CODE not found in version.properties!")
          end

          version_name = name_match[1].strip
          version_code = code_match[1].strip
          UI.message "📍 Version name: #{version_name}"
          UI.message "📍 Version code: #{version_code}"

          # ──────────────────────────────────────────────────────────────
          # Step 3: Find head and boundary commits for the current version
          #   Collect all [Bump version] and [Init Release] commits
          #   (merge or direct) whose subject matches the version_name.
          #   Sort by timestamp newest first.
          #   The head is the 1st, the boundary is the 2nd.
          #   Requires at least 2 commits.
          # ──────────────────────────────────────────────────────────────
          bump_pattern = "\\[Bump version\\].*#{Regexp.escape(version_name)}"
          init_pattern = "\\[Init Release\\].*#{Regexp.escape(version_name)}"
          bump_hashes = `git log --grep='#{bump_pattern}' --pretty=format:%H`.strip.split("\n").reject(&:empty?)
          init_hashes = `git log --grep='#{init_pattern}' --pretty=format:%H`.strip.split("\n").reject(&:empty?)

          bump_regex = /\[Bump version\].*#{Regexp.escape(version_name)}/
          init_regex = /\[Init Release\].*#{Regexp.escape(version_name)}/
          all_hashes = (bump_hashes + init_hashes).uniq

          all_version_commits = []
          all_hashes.each do |hash|
            subject = `git log -1 --pretty=%s #{hash}`.strip
            next unless subject.match?(bump_regex) || subject.match?(init_regex)
            all_version_commits << {
              hash: hash,
              message: subject,
              timestamp: `git log -1 --pretty=format:%ct #{hash}`.strip.to_i
            }
          end
          all_version_commits.sort_by! { |c| -c[:timestamp] }

          # Deduplicate commits with the same message, keeping only the
          # latest one (e.g. --no-ff merge + original commit).
          seen_messages = {}
          all_version_commits = all_version_commits.select do |c|
            if seen_messages[c[:message]]
              false
            else
              seen_messages[c[:message]] = true
              true
            end
          end

          if all_version_commits.length < 2
            UI.error "❌ Need at least 2 [Bump version] / [Init Release] commits for version #{version_name}, found #{all_version_commits.length}."
            return
          end

          head_commit = all_version_commits[0]
          boundary_commit = all_version_commits[1]
          UI.message "📍 Head: #{head_commit[:hash][0..7]} - #{head_commit[:message]}"
          UI.message "📍 Boundary: #{boundary_commit[:hash][0..7]} - #{boundary_commit[:message]}"
          UI.message "📍 Git range: #{boundary_commit[:hash][0..7]}..#{head_commit[:hash][0..7]}"

          # ──────────────────────────────────────────────────────────────
          # Step 4: Collect and filter merge commits
          #   Get all merge commits from boundary to head. Keep only
          #   those whose subject starts with a valid JIRA ticket
          #   (e.g. SAF-123). Zero-only IDs (SAF-0, SAF-00, ...) are
          #   ignored. --merges already guarantees these are merge commits.
          # ──────────────────────────────────────────────────────────────
          merge_logs_output = `git log #{boundary_commit[:hash]}..#{head_commit[:hash]} --merges --pretty=format:%s`.strip
          merge_logs = merge_logs_output.split("\n").reject(&:empty?)

          pr_merge_commits = merge_logs
            .select { |line|
              line.match(/^#{jira_prefix}-(?!0+\b)\d+/)
            }

          # ──────────────────────────────────────────────────────────────
          # Step 5: Clean PR titles and insert JIRA links
          #   Strip PR numbers (e.g. (#113) or #113) from commit messages.
          #   Replace ticket IDs with markdown links using jira_url.
          #   e.g. "SAF-123: Fix bug" -> "[SAF-123](https://...SAF-123): Fix bug"
          #   Preserve the original git order (newest first).
          # ──────────────────────────────────────────────────────────────
          prs = pr_merge_commits
            .map do |line|
              cleaned = line.gsub(/\s*\(#\d+\)/, '')
                            .gsub(/\s*#\d+/, '')
              if jira_url
                cleaned.gsub(/(#{jira_prefix}-\d+)/) { |ticket| "[#{ticket}](#{jira_url}#{ticket})" }
              else
                cleaned
              end
            end

          # ──────────────────────────────────────────────────────────────
          # Step 6: Generate and write changelog
          #   Build a markdown section with version name and code as header
          #   (e.g. "## Changelog 26.05.10 (100)") and each PR as a bullet
          #   point. Prepend the new section to the existing changelog.md.
          # ──────────────────────────────────────────────────────────────
          existing_content = ""
          if File.exist?(output_path)
            existing_content = File.read(output_path)
          end

          changelog_title = "## Changelog #{version_name} (#{version_code})"

          new_section = "#{changelog_title}\n\n"
          prs.each { |pr| new_section += "- #{pr}\n" } unless prs.empty?
          new_section += "\n"

          if existing_content.strip.empty?
            content = new_section
          else
            content = new_section + existing_content
          end
          UI.message "📝 Appending new changelog to head of existing content"

          File.write(output_path, content)

          UI.success "✅ Changelog written to: #{File.expand_path(output_path)}"
          UI.message "📄 Found #{prs.length} PR(s) with #{jira_prefix} tickets"

        rescue => e
          UI.error "❌ Failed to generate changelog: #{e.message}"
          raise e
        end
      end

      def self.description
        "Generate changelog between the latest [Bump version] and its previous boundary for the current version"
      end

      def self.details
        "This action reads jira_prefix from ci.config.yml and version from config/version/version.properties. VERSION_NAME is used to find [Bump version] and [Init Release] boundary commits, then generates a changelog of all PRs with valid JIRA tickets in that range. The changelog title includes both VERSION_NAME and VERSION_CODE."
      end

      def self.available_options
        []
      end

      def self.authors
        ["Android Team"]
      end

      def self.is_supported?(platform)
        platform == :android
      end
    end
  end
end
