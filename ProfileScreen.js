import React from 'react';
import { View, Text, Button } from 'react-native';
import { AuthContext } from './AuthContext';
import { useLocalStorage } from './useLocalStorage';

function ProfileScreen() {
  const { signOut } = React.useContext(AuthContext);
  const [username,setUsername,clearStorage,showAllLocalStorage] = useLocalStorage('username', '');
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <Text>Hi {username}!</Text>
      <Button title="Sign Out" onPress={signOut} />
      {/* <Button title="Clear Storage" onPress={() => clearStorage()} />  
      <Button title="Show Storage" onPress={() => showAllLocalStorage()} />   */}
    </View>
  );
}

export default ProfileScreen;
