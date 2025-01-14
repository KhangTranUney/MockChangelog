import React from 'react';
import { View, Text, ScrollView, StyleSheet } from 'react-native';
import { AvatarUpload } from '../components/AvatarUpload';
import { useProfile } from '../hooks/useProfile';

export const ProfileScreen: React.FC = () => {
  const { profile, updateProfile, uploadAvatar } = useProfile();

  return (
    <ScrollView style={styles.container}>
      <AvatarUpload uri={profile?.avatarUrl} onUpload={uploadAvatar} />
      <View style={styles.info}>
        <Text style={styles.name}>{profile?.displayName}</Text>
        <Text style={styles.email}>{profile?.email}</Text>
      </View>
    </ScrollView>
  );
};
