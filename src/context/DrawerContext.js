import React, { createContext, useContext, useState } from 'react';

const DrawerContext = createContext();

export const DrawerContextProvider = ({ children }) => {
  const [userConfirmation, setuserConfirmation] = useState(false)

  const toggleConfirmation = () => {
    setuserConfirmation(prevState => !prevState);
  };

  return (
    <DrawerContext.Provider value={{ userConfirmation, toggleConfirmation,setuserConfirmation }}>
      {children}
    </DrawerContext.Provider>
  );
};

export const useDrawContext = () => useContext(DrawerContext);
