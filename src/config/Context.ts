import React from 'react';

export interface UserContextType {
    userId: string;
    setUserId: React.Dispatch<React.SetStateAction<string>>;
    userName: string;
    setUserName: React.Dispatch<React.SetStateAction<string>>;
    userEmail: string;
    setUserEmail: React.Dispatch<React.SetStateAction<string>>;
}

export const UserContext = React.createContext<UserContextType>({
    userId: '',
    setUserId: () => {},
    userName: '',
    setUserName: () => {},
    userEmail: '',
    setUserEmail: () => {}
  });