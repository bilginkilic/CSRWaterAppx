import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
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
      <Text style={styles.title}>Hi, Welcome, {username}!</Text>
      
      <View style={styles.infoContainer}>
        <Text style={styles.infoText}>Saved water according to survey: {savingValue} L</Text>
        <Text style={styles.infoText}>Total water print: {totalValue} L</Text>
        <Text style={styles.infoText}>Istanbul Dam load balance: 95%</Text>
      </View>
      <Button title="Sign Out" onPress={signOut} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  waterDropContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  savingValue: {
    fontSize: 18,
    fontWeight: 'bold',
    marginTop: 10,
  },
  infoContainer: {
    marginBottom: 20,
  },
  infoText: {
    fontSize: 18,
    marginBottom: 10,
  },
});

export default ProfileScreen;
