import { createContext, useContext, useEffect, useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(() => {
        return JSON.parse(localStorage.getItem("user")) || null;
    });

    useEffect(() => {
        const checkAuthStatus = async () => {
            const getCSRFToken = () => Cookies.get("csrftoken");
            axios.defaults.withCredentials = true;
            axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();
            try {
                const response = await axios.post("/sales/auth-check/", {}, { withCredentials: true });
                if (response.data.isAuthenticated) {
                    localStorage.setItem("user", JSON.stringify(response.data.username));
                    setUser(response.data.username);
                } else {
                    setUser(null);
                    localStorage.removeItem("user");
                }
            } catch (error) {
                console.error("Auth check failed:", error);
                setUser(null);
                localStorage.removeItem("user");
            }
        };

        checkAuthStatus();
    }, []);

    const login = async (username, password) => {
        const getCSRFToken = () => Cookies.get("csrftoken");
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();

        try {
            const response = await axios.post("/sales/login-data/", { username, password });
            if (response.data.success) {
                const permissions = response.data.permissions;

                const salesPermissions = ['stayease_sales.add_leads_detail', 'stayease_sales.delete_leads_detail', 'stayease_sales.view_leads_detail', 'stayease_sales.change_leads_detail'];

                const containsAll = (arr1, arr2) => arr1.every(item => arr2.includes(item));

                if (containsAll(salesPermissions, permissions)) {
                    setUser(response.data.username);
                    localStorage.setItem("useremail", JSON.stringify(response.data.useremail));
                    localStorage.setItem("login_id", response.data.login_id);

                    return true;
                } else {
                    return false;
                }
            }
        } catch (error) {
            console.error("Login failed:", error);
            return false;
        }
    };

    const logout = async () => {
        const getCSRFToken = () => Cookies.get("csrftoken");
        axios.defaults.withCredentials = true;
        axios.defaults.headers.common["X-CSRFToken"] = getCSRFToken();
        try {
            await axios.post("/sales/logout/", { loginId: localStorage.getItem("login_id") });

            setUser(null);
            localStorage.removeItem('useremail');
            localStorage.removeItem('login_id');
        } catch (error) {
            console.error("Logout failed:", error);
        }
    };

    return (
        <AuthContext.Provider value={{ user, login, logout }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);
