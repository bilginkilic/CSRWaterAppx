import { AsyncStorage } from 'react-native';
import React from 'react';

export const useLocalStorage = (key, initialValue) => {
  const [state, setState] = React.useState(initialValue);

  React.useEffect(() => {
    const loadData = async () => {
      try {
        const value = await AsyncStorage.getItem(key);
        setState(value != null ? JSON.parse(value) : initialValue);
      } catch (error) {
        console.error(error);
      }
    };
    loadData();
  }, []);

  const setValue = async (value) => {
    try {
      const valueToStore = value instanceof Function ? value(state) : value;
      setState(valueToStore);
      await AsyncStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  const clearStorage = async () => {
    try {
      await AsyncStorage.clear();
      setState(initialValue);
    } catch (error) {
      console.error(error);
    }
  };

  const showAllLocalStorage = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);
      const data = keys.map((key, index) => ({ key, value: values[index][1] }));
    //  console.log(data);
    } catch (error) {
      console.error(error);
    }
  };

  const saveAllToUserAttributes = async () => {
    try {
      const keys = await AsyncStorage.getAllKeys();
      const values = await AsyncStorage.multiGet(keys);

      // Prepare the data to be saved to user attributes
      const userData = keys.reduce((data, key, index) => {
        const value = values[index][1];
        data[key] = JSON.parse(value);
        return data;
      }, {});

      saveUserDataToAttributes(userData);

   //   console.log('All values saved to user attributes:', userData);
    } catch (error) {
      console.error(error);
    }
  };

   // Function to save data to user attributes
const saveUserDataToAttributes = async (data) => {
  try {
    const user = await Auth.currentAuthenticatedUser();
    const attributes = {
      ...user.attributes, // Retrieve existing attributes
      ...data, // Add or update new attributes
    };
    await Auth.updateUserAttributes(user, attributes);
    console.log('User attributes updated successfully');
  } catch (error) {
    console.log('Error updating user attributes:', error);
  }
};

  

  return [state, setValue, clearStorage,showAllLocalStorage,saveAllToUserAttributes];
};
