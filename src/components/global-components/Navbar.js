import React, { useState, useEffect, useRef, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { FiUser } from "react-icons/fi";
import { useAuth } from "../AuthContext";

export default function Navbar({ isExpanded }) {
    let publicUrl = process.env.PUBLIC_URL + '/';
    const navigate = useNavigate();
    const auth = useAuth();

    const [open, setOpen] = useState(false);
    const [isLoggingOut, setisLoggingOut] = useState(false);

    const logoutTimeoutRef = useRef();

    const handleLogout = useCallback(async () => {
        setisLoggingOut(true);

        try {
            await auth.logout();
        } catch (error) {
            console.error('Auto logout failed:', error);
        } finally {
            setisLoggingOut(false);
            navigate("/sales/sales-login");
        }
    }, [auth, navigate]);

    useEffect(() => {
        const schedulePreciseLogout = () => {
            const now = new Date();
            const logoutTime = new Date();

            logoutTime.setHours(23, 59, 59, 0);

            if (now >= logoutTime) {
                logoutTime.setDate(logoutTime.getDate() + 1);
            }

            const timeUntilLogout = logoutTime.getTime() - now.getTime();

            if (logoutTimeoutRef.current) {
                clearTimeout(logoutTimeoutRef.current);
            }

            logoutTimeoutRef.current = setTimeout(() => {
                handleLogout();

                schedulePreciseLogout();
            }, timeUntilLogout);
        };

        schedulePreciseLogout();

        return () => {
            if (logoutTimeoutRef.current) {
                clearTimeout(logoutTimeoutRef.current);
            }
        };
    }, [handleLogout]);

    return (
        <nav className={`bg-[#000000] border-b-2 border-[#eba312] text-white shadow fixed w-full top-0 z-50  transition-opacity duration-300 ${isExpanded ? 'pl-[4rem] md:pl-[16rem]' : 'pl-[4rem]'}`}>
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between h-20 items-center">
                    <div className="flex items-center">
                        <img alt="CompanyLogo" src={publicUrl + "static/img/brand_logo/stayEase-Logo.webp"} className="h-18 w-auto object-cover"
                            loading="lazy" />
                    </div>

                    <div className="flex gap-3">
                        <div to='' className="hover:text-[#eba312] hover:bg-[#282b38] hover:border-[#eba312] p-3 border-2 rounded-full" onClick={() => setOpen(!open)}><FiUser /></div>

                        {open && (
                            <div
                                className="absolute right-0 z-10 mt-[3.5rem] mr-[1rem] w-56 origin-top-right rounded-md bg-white ring-1 shadow-lg ring-black/5 focus:outline-none"
                                role="menu"
                                aria-orientation="vertical"
                                aria-labelledby="menu-button"
                                tabIndex="-1"
                            >
                                <div className="py-1" role="none">
                                    <div
                                        className="block px-4 py-2 text-sm text-gray-700 hover:cursor-pointer"
                                        role="menuitem"
                                        tabIndex="-1"
                                        onClick={() => navigate("/sales/sales-user-activity-data")}
                                    >
                                        Activity Stats
                                    </div>

                                    <hr />

                                    <button
                                        onClick={handleLogout}
                                        className="block w-full px-4 py-2 text-left text-sm text-gray-700"
                                        role="menuitem"
                                        tabIndex="-1"
                                        disabled={isLoggingOut}
                                    >
                                        {isLoggingOut ? "Logging Out..." : "Log Out"}
                                    </button>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav>
    );
}
