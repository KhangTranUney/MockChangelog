import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, ActivityIndicator } from 'react-native';

interface Props { onSubmit: (ssid: string, password: string) => Promise<void>; }

export const WiFiSetupForm: React.FC<Props> = ({ onSubmit }) => {
  const [ssid, setSsid] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    try { await onSubmit(ssid, password); }
    finally { setIsLoading(false); }
  };

  return (
    <View style={styles.form}>
      <Text style={styles.label}>WiFi Network</Text>
      <TextInput value={ssid} onChangeText={setSsid} placeholder='Enter SSID' />
      <Text style={styles.label}>Password</Text>
      <TextInput value={password} onChangeText={setPassword} secureTextEntry placeholder='Enter password' />
      <TouchableOpacity onPress={handleSubmit} disabled={isLoading || !ssid}>
        {isLoading ? <ActivityIndicator /> : <Text>Connect Device</Text>}
      </TouchableOpacity>
    </View>
  );
};
