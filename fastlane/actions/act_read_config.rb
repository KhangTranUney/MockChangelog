require 'yaml'

module Fastlane
  module Actions
    class ActReadConfigAction < Action
      def self.run(params)
        config_path = params[:config_path] || "ci.config.yml"

        unless File.exist?(config_path)
          UI.user_error!("❌ CI config file not found: #{config_path}")
        end

        begin
          config = YAML.safe_load_file(config_path)
          UI.message("📋 Loaded CI configuration from #{config_path}")
          config
        rescue => e
          UI.user_error!("❌ Failed to parse CI config: #{e.message}")
        end
      end

      def self.description
        "Read CI configuration from ci.config.yml file"
      end

      def self.authors
        ["Core Team"]
      end

      def self.available_options
        [
          FastlaneCore::ConfigItem.new(
            key: :config_path,
            description: "Path to the CI config YAML file",
            optional: true,
            default_value: "ci.config.yml",
            type: String
          )
        ]
      end

      def self.is_supported?(platform)
        true
      end

      def self.example_code
        [
          'act_read_config',
          'act_read_config(config_path: "custom.config.yml")'
        ]
      end

      def self.category
        :project
      end
    end
  end
end
