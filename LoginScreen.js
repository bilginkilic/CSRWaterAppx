import * as React from 'react';
import { Text, TextInput, TouchableOpacity, StyleSheet, Dimensions, Button, View, Alert } from 'react-native';
import { AuthContext } from './AuthContext';
import { Auth } from 'aws-amplify';
const { width, height } = Dimensions.get('window');

const LoginScreen = () => {
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');


  const handleSignIn = async () => {
    try {
      if(username=='' || password==''){
        Alert.alert('WARN','Username or password must be filled.')
      }else{
        const user = await Auth.signIn(username, password);
        console.log('user signed in: ', user.userDataKey);
        signIn({ userToken:user.Session  });
      }
    
    } catch (error) {
      Alert.alert('OOPSS',error.message)
      //console.log('error signing in: ', error);
    }
  };
  
  const { signIn } = React.useContext(AuthContext);

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
      <TouchableOpacity style={styles.buttonContainer} onPress={handleSignIn}>
        <View>
          <Text style={styles.buttonText}>LOGIN</Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

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