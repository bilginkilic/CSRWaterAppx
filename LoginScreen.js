import * as React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, View, Alert } from 'react-native';
import { AuthContext } from './AuthContext';
import { Auth } from 'aws-amplify';
import { useLocalStorage } from './useLocalStorage';

const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [username, setUsername] = useLocalStorage('username', '');
  const [password, setPassword] = React.useState('');
  const [newPassword, setNewPassword] = React.useState('');
  const [userWithChallenge, setUserWithChallenge] = React.useState(null); // Store user with challenge

  const handleSignIn = async () => {
    try {
      if (username === '' || password === '') {
        Alert.alert('WARN', 'Username or password must be filled.');
      } else {
        const user = await Auth.signIn(username, password);
        console.log('user signed in: ', user);
        if (user.challengeName === 'NEW_PASSWORD_REQUIRED') {
          setUserWithChallenge(user); // Store user with challenge
        } else {
          signIn({ userToken: user.Session });
        }
      }
    } catch (error) {
      Alert.alert('OOPSS', error.message);
    }
  };

  const handleNewPasswordSubmit = async () => {
    try {
      const loggedUser = await Auth.completeNewPassword(userWithChallenge, newPassword);
      console.log(loggedUser);
      signIn({ userToken: userWithChallenge.Session });
    } catch (error) {
      Alert.alert('OOPSS', error.message);
    }
  };

  const { resetState, signIn } = React.useContext(AuthContext);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login to WaterApp</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        placeholderTextColor="#999"
        autoCapitalize="none"
        autoCorrect={false}
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        placeholderTextColor="#999"
        secureTextEntry
        autoCapitalize="none"
        autoCorrect={false}
        value={password}
        onChangeText={setPassword}
      />
      {userWithChallenge && userWithChallenge.challengeName === 'NEW_PASSWORD_REQUIRED' && (
        <TextInput
          style={styles.input}
          placeholder="New Password"
          placeholderTextColor="#999"
          secureTextEntry
          autoCapitalize="none"
          autoCorrect={false}
          value={newPassword}
          onChangeText={setNewPassword}
        />
      )}
      <TouchableOpacity style={styles.buttonContainer} onPress={userWithChallenge?.challengeName === 'NEW_PASSWORD_REQUIRED' ? handleNewPasswordSubmit : handleSignIn}>
        <View>
          <Text style={styles.buttonText}>LOGIN</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

// Rest of the code remains unchanged




const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
    width: width,
    height: height*0.8  ,
    padding: 10,
  },
    title: {
    color: '#333',
    fontSize: 32,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 20
  },
  input: {
    width:width * 0.8, // Set the width of the input to 80% of the screen width
    height: 40,
    backgroundColor: '#fff',
    color: '#333',
    paddingHorizontal: 10,
    marginBottom: 15,
    borderRadius: 5
  },
  
 
  buttonContainer: {
    backgroundColor: 'red' ,// 'rgba(244, 67, 54, 1)', // Nice red color
    paddingVertical: 15,
    borderRadius: 5,
    width:width*0.8,
    alignItems: 'center', // Add this line to center the button text
    justifyContent: 'center' // Add this line to center the button text
  },
  buttonText: {
    color: '#fff',
    fontWeight: 'bold',
    textAlign: 'center',
    fontSize: 12
  }
  
});
 

export default  LoginScreen;