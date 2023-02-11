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

  return [state, setValue, clearStorage];
};
