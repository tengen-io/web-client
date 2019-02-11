import { createContext } from 'react';

const AuthContext = createContext({
    username: null,
    token: null,
    logIn: (username, token) => {},
    logOut: () => {},
});
export default AuthContext;
