import React, { createContext, useContext, useState } from 'react';

interface AuthContextProps {
    user: any; // Replace with your user type
    isAdmin: boolean;
    login: (user: any) => void;
    logout: () => void;
}

const AuthContext = createContext<AuthContextProps>({
    user: null,
    isAdmin: false,
    login: () => {},
    logout: () => {},
});

export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    const [user, setUser] = useState(null);
    const isAdmin = user?.user_type === 'admin'; // Replace with your actual admin role check

    const login = (user: any) => {
        setUser(user);
    };

    const logout = () => {
        setUser(null);
    };

    return (
        <AuthContext.Provider value={{ user, isAdmin, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};
