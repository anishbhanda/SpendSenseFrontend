import React, { createContext, useState, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [isLoading, setIsLoading] = useState(true);

    // Function you can call from anywhere
    const checkAuthStatus = async () => {
        try {
            const response = await axios.get("http://localhost:5000/api/auth/check", {
                withCredentials: true, // Important if using cookies
            });
            if (response.status === 200) {
                setIsAuthenticated(true);
            }
        } catch (error) {
            setIsAuthenticated(false);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        checkAuthStatus();
    }, []);

    return (
        <AuthContext.Provider
            value={{ isAuthenticated, isLoading, setIsAuthenticated, checkAuthStatus }}
        >
            {children}
        </AuthContext.Provider>
    );
};

export { AuthContext, AuthProvider };
