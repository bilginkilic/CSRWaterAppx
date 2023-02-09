import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import SplashScreen from './SplashScreen';
import { AuthContext } from './AuthContext';
import MainScreenToFinale from './MainScreenToFinale';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports'

 



const Stack = createStackNavigator();

function App() {
  Amplify.configure(config)
  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
          };
        case 'SIGN_IN':

          return {

            ...prevState,
            isSignout: false,
            userToken: action.token,
            hasSurvey: false
          };
        case 'TAKE_TEST':
          console.log(prevState)
          return {
            ...prevState,
            hasSurvey: true

          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      hasSurvey: false
    }
  );

  React.useEffect(() => {
    const bootstrapAsync = async () => {
      let userToken;

      try {
        // Restore token stored in `SecureStore` or any other encrypted storage
        // userToken = await SecureStore.getItemAsync('userToken');
      } catch (e) {
        // Restoring token failed
      }

      dispatch({ type: 'RESTORE_TOKEN', token: userToken });
    };

    bootstrapAsync();
  }, []);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        
        if(data.userToken !=''){
          dispatch({ type: 'SIGN_IN', token: data.userToken });
     
        }
        
     
      },
      signOut: () => dispatch({ type: 'SIGN_OUT' }),
      takeTest: () => dispatch({ type: 'TAKE_TEST' }),
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    []
  );



  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // Show the splash screen if the app is loading
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // Show the login screen if the user is not signed in
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Sign in',
              }}
            />
          ) : (
            // Show the main screen if the user is signed in - no survey
            (state.hasSurvey ?
              <Stack.Screen
                name="MainScreenToFinale"
                component={MainScreenToFinale}
                options={{
                  title: 'WATER APP',
                }}
              /> :
              <Stack.Screen
                name="Main"
                component={MainScreen}
                options={{
                  title: 'WELCOME TO WATER APP',
                }}
              />
            )
          )}
        </Stack.Navigator>
      </NavigationContainer>
    </AuthContext.Provider>
  );
}

export default App;

