import * as React from 'react';
import { Button, Text, View, Image } from 'react-native';
import { AuthContext } from './AuthContext';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import FeedScreen from './FeedScreen.js';

import TaskScreen from './TaskScreen';

MaterialCommunityIcons.loadFont(); 


function Profile() {
  
  const { signOut } = React.useContext(AuthContext);
  return (
  <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
  <Text>Profile!</Text>
  <Button title="Sign Out" onPress={signOut} />
  </View>
  );
  }

 



function MainScreenToFinale() {

 
  const Tab = createBottomTabNavigator();

  return (

    <Tab.Navigator
      initialRouteName="TaskScreen"
      screenOptions={{
        tabBarActiveTintColor: '#e91e63',
      }}
    >
      <Tab.Screen
        name="FeedScreen"
        component={FeedScreen}
        options={{
          tabBarLabel: 'FeedScreen',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TaskScreen"
        component={TaskScreen}
        options={{
          tabBarLabel: 'Updates',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 3,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{
          tabBarLabel: 'Profile',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="account" color={color} size={size} />
          ),
        }}
      />
    </Tab.Navigator>

  );

}


export default MainScreenToFinale;
