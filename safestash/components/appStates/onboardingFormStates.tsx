import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface formValidation {
  email?: string,
  code?: string,
  mobileNumber?: string,
}

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
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  dateField: string;
  setDateField: React.Dispatch<React.SetStateAction<string>>;
  errors: formValidation;
  setErrors: React.Dispatch<React.SetStateAction<formValidation>>;
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [firstName, setFirstName] = useState<string>('');
  const [givenName, setGivenName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+_ _');
  const [password, setPassword] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date())
  const [dateField, setDateField] = useState<string>('')
  const [errors, setErrors] = useState<formValidation>({})


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
        setCountryCode,
        password,
        setPassword,
        date,
        setDate,
        dateField,
        setDateField,
        errors,
        setErrors
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
