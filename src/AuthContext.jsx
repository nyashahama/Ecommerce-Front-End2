import React, { createContext, useState, useEffect } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [username, setUsername] = useState('');

    useEffect(() => {
        // Check if user is logged in on initial load
        const userId = localStorage.getItem('userId');
        const storedUsername = localStorage.getItem('username');
        if (userId && storedUsername) {
            setIsLoggedIn(true);
            setUsername(storedUsername);
        }
    }, []);

    const login = (userId, username) => {
        localStorage.setItem('userId', userId);
        localStorage.setItem('username', username);
        setIsLoggedIn(true);
        setUsername(username);
    };

    const logout = () => {
        localStorage.removeItem('userId');
        localStorage.removeItem('username');
        setIsLoggedIn(false);
        setUsername('');
    };

    return (
        <AuthContext.Provider value={{ isLoggedIn, username, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};