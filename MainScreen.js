import * as React from 'react';
import { Button, Text, View, Image } from 'react-native';
import { AuthContext } from './AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedScreen from './FeedScreen.js';
import InteractScreen from './InteractScreen';




function Profile() {
  const { signOut } = React.useContext(AuthContext);
  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Text>Profile!</Text>
  <Button title="Sign Out" onPress={signOut} />
  </View>
  );
  }

 



function HomeScreen() {

 
  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator
      initialRouteName="FeedScreen"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
        headerShown: false
       
      }}
       
    >
      <Tab.Screen
        name="About"
        component={FeedScreen}
        options={{
           tabBarLabel: 'About',
           tabBarVisible: false,
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
         
        }
        
      } 
      />
      <Tab.Screen
        name="Task"
        component={InteractScreen}
        options={{
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
          tabBarVisible: false,
        }}
      />
      <Tab.Screen
        name="Porfile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
          tabBarVisible: false,
        }}
      />
    </Tab.Navigator>

  );

}


export default HomeScreen;
