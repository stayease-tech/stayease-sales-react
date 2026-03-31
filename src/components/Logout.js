import React from "react";
import { useAuth } from "./AuthContext";
import { useNavigate } from "react-router-dom";

const Logout = () => {
    const navigate = useNavigate();
    const auth = useAuth();

    const handleLogout = async () => {
        await auth.logout();
        navigate("/sales/sales-login/");
    };

    return <button className="hover:text-[#eba312]" onClick={handleLogout}>Logout</button>;
};

export default Logout;
