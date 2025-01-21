import React from 'react';
import { TouchableOpacity, Image, StyleSheet } from 'react-native';
import { launchImageLibrary } from 'react-native-image-picker';

interface Props { uri?: string; onUpload: (uri: string) => void; }

export const AvatarUpload: React.FC<Props> = ({ uri, onUpload }) => {
  const pickImage = async () => {
    const result = await launchImageLibrary({ mediaType: 'photo', maxWidth: 512, maxHeight: 512 });
    if (result.assets?.[0]?.uri) onUpload(result.assets[0].uri);
  };

  return (
    <TouchableOpacity onPress={pickImage}>
      <Image source={uri ? { uri } : require('../assets/default-avatar.png')} style={styles.avatar} />
    </TouchableOpacity>
  );
};
