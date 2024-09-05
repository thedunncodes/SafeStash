import React, { createContext, useContext, useState, ReactNode } from 'react';

type AppStateContextType = {
  firstName: string;
  setFirstName: React.Dispatch<React.SetStateAction<string>>;
  givenName: string;
  setGivenName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  mobileNumber: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  countryCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<string>>;
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [givenName, setGivenName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+--');

  return (
    <AppStateContext.Provider value={{
        firstName,
        setFirstName,
        givenName,
        setGivenName,
        email,
        setEmail,
        mobileNumber,
        setMobileNumber,
        countryCode,
        setCountryCode
    }}>
      {children}
    </AppStateContext.Provider>
  );
};

export const useAppState = () => {
  const context = useContext(AppStateContext);
  if (context === undefined) {
    throw new Error('useAppState must be used within a StateProvider');
  }
  return context;
};
