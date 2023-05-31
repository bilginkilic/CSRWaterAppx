import React from 'react';
import { View, Text, Button, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { AuthContext } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';
import Icon from 'react-native-vector-icons/FontAwesome';

function ProfileScreen() {
  const { signOut } = React.useContext(AuthContext);
  const [savingValue, setSavingValue] = useLocalStorage('savingValue', 0);
  const [totalValue, setTotalValue] = useLocalStorage('totalValue', 0);
  const [username, setUsername, clearStorage, showAllLocalStorage] = useLocalStorage('username', '');

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Hi, Welcome</Text>
        <Text style={styles.username}>{username}!</Text>
      </View>

      <View style={styles.waterDropContainer}>
        <Image source={require('./images/category/drop.png')} style={styles.waterDropImage} />
        <Text style={styles.savingValue}>{savingValue} L</Text>
      </View>

      <View style={styles.infoContainer}>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Saved water according to survey:</Text>
          <Text style={styles.infoValue}>{savingValue} L</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Total water print:</Text>
          <Text style={styles.infoValue}>{totalValue} L</Text>
        </View>
        <View style={styles.infoRow}>
          <Text style={styles.infoText}>Istanbul Dam load balance:</Text>
          <Text style={styles.infoValue}>95%</Text>
        </View>
      </View>

      <TouchableOpacity style={styles.signOutButton} onPress={signOut}>
        <Text style={styles.signOutButtonText}>Sign Out</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    padding: 20,
  },
  header: {
    marginBottom: 40,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  username: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#3498db',
  },
  waterDropContainer: {
    alignItems: 'center',
    marginBottom: 30,
  },
  waterDropImage: {
    width: 120,
    height: 120,
  },
  savingValue: {
    fontSize: 24,
    fontWeight: 'bold',
    marginTop: 10,
    color: '#333',
  },
  infoContainer: {
    marginBottom: 30,
    width: '100%',
  },
  infoRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  infoText: {
    fontSize: 18,
    color: '#666',
    marginRight: 10,
  },
  infoValue: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333',
  },
  signOutButton: {
    backgroundColor: '#e74c3c',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 10,
  },
  signOutButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#fff',
  },
});

export default ProfileScreen;
