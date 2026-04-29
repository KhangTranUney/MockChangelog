import React from 'react';
import { View, Text, FlatList, TouchableOpacity, Alert, StyleSheet } from 'react-native';
import { useTrustedContacts } from '../hooks/useTrustedContacts';

export const TrustedContactsScreen: React.FC = () => {
  const { contacts, loading, removeContact } = useTrustedContacts();

  const handleRemove = (id: string, name: string) => {
    Alert.alert('Remove Contact', `Remove ${name} from trusted contacts?`, [
      { text: 'Cancel', style: 'cancel' },
      { text: 'Remove', style: 'destructive', onPress: () => removeContact(id) },
    ]);
  };

  if (loading) {
    return <View style={styles.container}><Text>Loading...</Text></View>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Trusted Contacts</Text>
      <Text style={styles.subtitle}>
        These contacts will be notified during emergencies and missed check-ins.
      </Text>

      <FlatList
        data={contacts}
        keyExtractor={item => item.id}
        renderItem={({ item }) => (
          <View style={styles.contactCard}>
            <View style={styles.avatar}>
              <Text style={styles.avatarText}>{item.name.charAt(0).toUpperCase()}</Text>
            </View>
            <View style={styles.contactInfo}>
              <Text style={styles.contactName}>{item.name}</Text>
              <Text style={styles.contactPhone}>{item.phone}</Text>
              <Text style={styles.contactRelation}>{item.relationship}</Text>
            </View>
            <TouchableOpacity onPress={() => handleRemove(item.id, item.name)}>
              <Text style={styles.removeText}>Remove</Text>
            </TouchableOpacity>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.emptyText}>No trusted contacts added yet.</Text>}
      />

      <TouchableOpacity style={styles.addButton}>
        <Text style={styles.addButtonText}>+ Add Contact</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  title: { fontSize: 22, fontWeight: '700', marginBottom: 4 },
  subtitle: { fontSize: 14, color: '#666', marginBottom: 16 },
  contactCard: { flexDirection: 'row', alignItems: 'center', padding: 12, backgroundColor: '#F8F8F8', borderRadius: 10, marginBottom: 8 },
  avatar: { width: 44, height: 44, borderRadius: 22, backgroundColor: '#007AFF', justifyContent: 'center', alignItems: 'center' },
  avatarText: { color: '#FFF', fontSize: 18, fontWeight: '700' },
  contactInfo: { flex: 1, marginLeft: 12 },
  contactName: { fontSize: 16, fontWeight: '600' },
  contactPhone: { fontSize: 13, color: '#666', marginTop: 2 },
  contactRelation: { fontSize: 12, color: '#999', marginTop: 1, textTransform: 'capitalize' },
  removeText: { color: '#FF3B30', fontSize: 14 },
  emptyText: { textAlign: 'center', color: '#999', marginTop: 40 },
  addButton: { backgroundColor: '#007AFF', padding: 14, borderRadius: 10, alignItems: 'center', marginTop: 16 },
  addButtonText: { color: '#FFF', fontSize: 16, fontWeight: '600' },
});
