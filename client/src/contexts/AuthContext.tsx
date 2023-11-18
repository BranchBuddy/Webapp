import React, { createContext, useEffect, useState } from 'react';
import { verify, type User } from '../api/collections/auth';

export interface AuthState {
    loggedIn: boolean;
    user: User | undefined;
    setLoggedIn: (status: boolean) => void;
    setUser: (user: User | undefined) => void;
    isLoading: boolean;
}

export interface AuthContextProviderType {
    children: React.ReactNode;
}

// create the context with its "features"
export const AuthContext = createContext<AuthState>({
    loggedIn: false,
    user: undefined,
    setLoggedIn: () => null,
    setUser: () => null,
    isLoading: false,
});

// create the context provider
export const AuthContextProvider = ({ children }: AuthContextProviderType) => {
    const [loggedIn, setLoggedIn] = useState<boolean>(false);
    const [user, setUser] = useState<User>();
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        const checkAuthentication = async () => {
            await verify()
                .then((response) => {
                    setUser(response); // the response of is a user
                    setIsLoading(false);
                    setLoggedIn(true);
                })
                .catch(() => {
                    setLoggedIn(false);
                    setIsLoading(false);
                    setUser(undefined);
                });
        };
        setIsLoading(true);
        void checkAuthentication();
    }, []);

    return (
        <AuthContext.Provider
            value={{
                loggedIn,
                user,
                setLoggedIn: (status: boolean) => {
                    setLoggedIn(status);
                },
                setUser: (user: User | undefined) => {
                    setUser(user);
                },
                isLoading,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};
