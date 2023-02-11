import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import LoginScreen from './LoginScreen';
import MainScreen from './MainScreen';
import SplashScreen from './SplashScreen';
import { AuthContext } from './AuthContext';
import MainScreenToFinale from './MainScreenToFinale';
import { Amplify } from 'aws-amplify';
import config from './src/aws-exports';
import { useLocalStorage } from './useLocalStorage';

const Stack = createStackNavigator();

function App() {
  Amplify.configure(config);

  const [hasSurvey, setHasSurvey] = useLocalStorage('hasSurvey', false);
  const [userToken, setUserToken] = useLocalStorage('userToken', '');
  const [questionIndex, setQuestionIndex] = useLocalStorage('questionIndex', 0);
  const [answers, setAnswers] = useLocalStorage('answers', []);

  const [state, dispatch] = React.useReducer(
    (prevState, action) => {
      switch (action.type) {
        case 'RESTORE_TOKEN':
          return {
            ...prevState,
            userToken: action.token,
            isLoading: false,
            hasSurvey: action.hasSurvey,
          };
        case 'SIGN_IN':
          return {
            ...prevState,
            isSignout: false,
            userToken: action.token,
            //hasSurvey: false,
          };
        case 'TAKE_TEST':
          return {
            ...prevState,
            hasSurvey: action.hasSurvey,
          };
        case 'SIGN_OUT':
          return {
            ...prevState,
            isSignout: true,
            userToken: null,
            hasSurvey: action.hasSurvey
          };
      }
    },
    {
      isLoading: true,
      isSignout: false,
      userToken: null,
      hasSurvey: false,
    }
  );

  useEffect(() => {
    const bootstrapAsync = async () => {
       

      

      dispatch({ type: 'RESTORE_TOKEN', token: userToken, hasSurvey: hasSurvey });
    };
    bootstrapAsync();
  }, [hasSurvey]);

  const authContext = React.useMemo(
    () => ({
      signIn: async (data) => {
        if (data.userToken !== '') {
          setUserToken(data.userToken)
          dispatch({ type: 'SIGN_IN', token: data.userToken });
        }
      },
      signOut: () => {

        
        setUserToken('')
       
        dispatch({ type: 'SIGN_OUT', hasSurvey: false })
      }

      ,
      takeTest: () => {

        setHasSurvey(true);
        dispatch({ type: 'TAKE_TEST', hasSurvey: true });
      },
      signUp: async (data) => {
        dispatch({ type: 'SIGN_IN', token: 'dummy-auth-token' });
      },
    }),
    [setHasSurvey]
  );
  return (
    <AuthContext.Provider value={authContext}>
      <NavigationContainer>
        <Stack.Navigator>
          {state.isLoading ? (
            // Uygulama yüklenirken Splash ekranını göster
            <Stack.Screen name="Splash" component={SplashScreen} />
          ) : state.userToken == null ? (
            // Kullanıcı oturumu açmadıysa giriş ekranını göster
            <Stack.Screen
              name="Login"
              component={LoginScreen}
              options={{
                title: 'Sign in',
              }}
            />
          ) : (
            // Kullanıcı oturum açtıysa ana ekranı göster - anket yok
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
