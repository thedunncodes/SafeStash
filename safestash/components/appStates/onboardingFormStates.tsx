import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface formValidation {
  email?: string,
  code?: string,
  mobileNumber?: string,
  newJob?: string
}

type AppStateContextType = {
  lastName: string;
  setLastName: React.Dispatch<React.SetStateAction<string>>;
  givenName: string;
  setGivenName: React.Dispatch<React.SetStateAction<string>>;
  email: string;
  setEmail: React.Dispatch<React.SetStateAction<string>>;
  mobileNumber: string;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  countryCode: string;
  setCountryCode: React.Dispatch<React.SetStateAction<string>>;
  country: string;
  setCountry: React.Dispatch<React.SetStateAction<string>>;
  password: string;
  setPassword: React.Dispatch<React.SetStateAction<string>>;
  date: Date;
  setDate: React.Dispatch<React.SetStateAction<Date>>;
  dateField: string;
  setDateField: React.Dispatch<React.SetStateAction<string>>;
  occupation: string;
  setOccupation: React.Dispatch<React.SetStateAction<string>>;
  errors: formValidation;
  setErrors: React.Dispatch<React.SetStateAction<formValidation>>;
};

const AppStateContext = createContext<AppStateContextType | undefined>(undefined);

export const StateProvider = ({ children }: { children: ReactNode }) => {
  const [lastName, setLastName] = useState<string>('');
  const [givenName, setGivenName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [mobileNumber, setMobileNumber] = useState<string>('');
  const [countryCode, setCountryCode] = useState<string>('+_ _');
  const [country, setCountry] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [date, setDate] = useState<Date>(new Date())
  const [dateField, setDateField] = useState<string>('')
  const [occupation, setOccupation] = useState<string>('')
  const [errors, setErrors] = useState<formValidation>({})


  return (
    <AppStateContext.Provider value={{
        lastName, setLastName,
        givenName, setGivenName,
        email, setEmail,
        mobileNumber, setMobileNumber,
        countryCode, setCountryCode,
        country, setCountry,
        password, setPassword,
        date, setDate,
        dateField, setDateField,
        errors, setErrors,
        occupation, setOccupation
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
