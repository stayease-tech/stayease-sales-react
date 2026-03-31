import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from './components/Login';
import ActivityStats from "./components/activity-components/ActivityStats";
import LoginData from "./components/activity-components/LoginData";
import BedsTable from "./components/beds-components/BedsTable";
import TenantsTable from "./components/beds-components/TenantsTable";
import TenantForm from "./components/beds-components/TenantForm";
import TenantDetails from "./components/beds-components/TenantDetails";
import AgreementPdf from "./components/beds-components/AgreementPdf";
import LeadForm from "./components/lead-components/LeadForm";
import LeadTable from "./components/lead-components/LeadTable";
import LeadDetails from "./components/lead-components/LeadDetails";
import ExpenseForm from "./components/expense-components/ExpenseForm";
import ExpenseTable from "./components/expense-components/ExpenseTable";
import VendorForm from "./components/expense-components/VendorForm";
import { useAuth } from "./components/AuthContext";

function Routing() {
    const isMdOrLarger = () => window.innerWidth >= 768;

    const [loggedUserEmail, setLoggedUserEmail] = useState('');

    const [isExpanded, setIsExpanded] = useState(() => {
        if (typeof window !== "undefined" && isMdOrLarger()) {
            return JSON.parse(sessionStorage.getItem("isExpanded")) ?? false;
        }
        return false;
    });

    useEffect(() => {
        if (typeof window !== "undefined" && isMdOrLarger()) {
            sessionStorage.setItem("isExpanded", JSON.stringify(isExpanded));
        }
    }, [isExpanded]);

    const ProtectedRoute = ({ children }) => {
        const { user } = useAuth();
        setLoggedUserEmail(JSON.parse(localStorage.getItem("useremail")));
        return user ? children : <Navigate to="/sales/sales-login" />;
    };

    return (
        <div className="bg-[#000000] min-h-screen">
            <Routes>
                <Route path="/sales/sales-login" element={<Login />} />

                <Route
                    path="/sales/sales-user-activity-data"
                    element={
                        <ProtectedRoute>
                            <ActivityStats isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    } />
                <Route
                    path="/sales/sales-login-data/:id"
                    element={
                        <ProtectedRoute>
                            <LoginData isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    } />

                <Route
                    path="/sales/sales-beds-table"
                    element={
                        <ProtectedRoute>
                            <BedsTable isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sales/sales-tenants-table/:id"
                    element={
                        <ProtectedRoute>
                            <TenantsTable isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sales/sales-tenant-form/:id"
                    element={
                        <ProtectedRoute>
                            <TenantForm isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sales/sales-tenant-details/:id"
                    element={
                        <ProtectedRoute>
                            <TenantDetails isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sales/sales-agreement-pdf/:id"
                    element={
                        <ProtectedRoute>
                            <AgreementPdf isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sales/sales-leads-form"
                    element={
                        <ProtectedRoute>
                            <LeadForm isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sales/sales-leads-table"
                    element={
                        <ProtectedRoute>
                            <LeadTable isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sales/sales-leads-details/:id"
                    element={
                        <ProtectedRoute>
                            <LeadDetails isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sales/sales-expense-form"
                    element={
                        <ProtectedRoute>
                            <ExpenseForm isExpanded={isExpanded} setIsExpanded={setIsExpanded} loggedUserEmail={loggedUserEmail} />
                        </ProtectedRoute>
                    }
                />
                <Route
                    path="/sales/sales-expense-table"
                    element={
                        <ProtectedRoute>
                            <ExpenseTable isExpanded={isExpanded} setIsExpanded={setIsExpanded} loggedUserEmail={loggedUserEmail} />
                        </ProtectedRoute>
                    }
                />

                <Route
                    path="/sales/sales-vendor-form"
                    element={
                        <ProtectedRoute>
                            <VendorForm isExpanded={isExpanded} setIsExpanded={setIsExpanded} />
                        </ProtectedRoute>
                    }
                />
            </Routes>
        </div>
    );
}

export default Routing;
