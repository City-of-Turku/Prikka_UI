/**
 * Auth Context
 * User status:
 * isLogged : if user is logged in
 * isAdmin : if user is an administrator
 */

// --- IMPORTS ---
import React, { useState, ReactNode } from 'react';

interface AuthContextInterface {
    isLogged: boolean;
    isAdmin: boolean;
    setIsLogged(newStatus: boolean): void;
    setIsAdmin(newStatus: boolean): void;
}
// --- CONTEXT ---
const AuthContext = React.createContext<AuthContextInterface | undefined>(
    undefined,
);

// --- HOOK ---
export const useAuthContext = () => {
    const c = React.useContext(AuthContext);
    if (!c)
        throw new Error(
            'useAuthContext must be inside a Provider with a value',
        );
    return c;
};

// --- PROVIDER ---
interface IAuthProvider {
    isLogged: boolean;
    isAdmin: boolean;
}
export const AuthProvider: React.FC<ReactNode & IAuthProvider> = (props) => {
    //States
    const [isLogged, setIsLogged] = useState<boolean>(props.isLogged || false);
    const [isAdmin, setIsAdmin] = useState<boolean>(props.isAdmin || false);

    return (
        <AuthContext.Provider
            value={{
                isLogged,
                setIsLogged,
                isAdmin,
                setIsAdmin,
            }}
        >
            {props.children}
        </AuthContext.Provider>
    );
};
