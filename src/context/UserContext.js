import { createContext } from 'react';

export const UserContext = createContext({
    isAuthenticated: false,
    email: null,
    idToken: null
});