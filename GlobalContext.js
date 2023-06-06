import React, { createContext, useState } from 'react';
import { useLocalStorage } from './useLocalStorage';
// Create the global context
export const GlobalContext = createContext();

// Create a provider component to wrap your app and provide the global state
export const GlobalProvider = ({ children }) => {
  const [globalArray, setGlobalArray] =  useLocalStorage('selectedTasks', []); //useState([]);

  return (
    <GlobalContext.Provider value={{ globalArray, setGlobalArray }}>
      {children}
    </GlobalContext.Provider>
  );
};
