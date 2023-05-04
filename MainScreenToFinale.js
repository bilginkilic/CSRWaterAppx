import * as React from 'react';

import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import ProfileScreen from './ProfileScreen';
import { useLocalStorage } from './useLocalStorage';

import FeedScreen from './FeedScreen.js';

 
import MyTask from './MyTask';

MaterialCommunityIcons.loadFont(); 


 
 



function MainScreenToFinale() {

 
  const Tab = createBottomTabNavigator();
  const [taskIndex, setTaskIndex] = useLocalStorage('taskIndex', 0);
  const [remaningTask, setRemainingTask] =  useLocalStorage('remaningTask', 21); 
 
  //   useEffect(() => {
  //     setRemainingTask(21-taskIndex)
  // }, [ taskIndex]);

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
          headerShown: false,
          tabBarLabel: 'FeedScreen',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="home" color={color} size={size} />
          ),
        }}
      />
      <Tab.Screen
        name="TaskScreen"
        component={MyTask}
        options={{
          headerShown: false,
          tabBarLabel: 'Tasks',
          tabBarIcon: ({ color, size }) => (
            <MaterialCommunityIcons name="bell" color={color} size={size} />
          ),
          tabBarBadge: 21,
        }}
      />
      <Tab.Screen
        name="Profile"
        component={ProfileScreen}
        options={{
          headerShown: false,
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
