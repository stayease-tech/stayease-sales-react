import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Cookies from 'js-cookie';
import { useAuth } from "./AuthContext";

function SupplyLogin() {
    let publicUrl = process.env.PUBLIC_URL + '/';
    const [isScrolledUp, setIsScrolledUp] = useState(true);
    const [lastScrollPosition, setLastScrollPosition] = useState(0);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const auth = useAuth();
    const navigate = useNavigate();

    const [loginData, setLoginData] = useState({
        uname: "",
        pwd: ""
    })

    const handleScroll = useCallback(() => {
        const currentScrollPosition = window.pageYOffset;

        if (currentScrollPosition > lastScrollPosition && currentScrollPosition > 80) {
            setIsScrolledUp(false);
        } else if (currentScrollPosition < lastScrollPosition) {
            setIsScrolledUp(true);
        }

        setLastScrollPosition(currentScrollPosition)
    }, [lastScrollPosition])

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        }
    }, [lastScrollPosition, handleScroll])

    const loginHandleChange = (e) => {
        const { name, value } = e.target;

        setLoginData((prevState) => ({
            ...prevState,
            [name]: value
        }));
    }

    const getCSRFToken = () => {
        return Cookies.get('csrftoken');
    }

    axios.defaults.headers.common['X-CSRFToken'] = getCSRFToken()

    const handleLoginSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const response = await auth.login(loginData.uname, loginData.pwd);
        if (response) {
            alert('Login Successful!');
            navigate("/sales/sales-beds-table");

            setLoginData(
                {
                    uname: "",
                    pwd: ""
                }
            )
            setIsSubmitting(false);
        } else {
            alert("Invalid credentials");
            setIsSubmitting(false);
        }
    }

    return (
        <div className="lg:pb-2 lg:pt-[6rem]">
            <nav className={`bg-[#000000] border-b-2 border-[#eba312] text-white shadow fixed w-full top-0 z-[100] transition-opacity duration-300 ${isScrolledUp ? 'opacity-100' : 'opacity-0'}`}>
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between h-20 items-center">
                        <div className="flex items-center">
                            <img alt="CompanyLogo" src={publicUrl + "static/img/brand_logo/stayEase-Logo.webp"} className="h-18 w-auto object-cover"
                                loading="lazy" />
                        </div>
                    </div>
                </div>
            </nav>

            <form className="w-[100%] lg:w-[50%] mx-auto lg:my-8 p-8 lg:p-10 lg:rounded-lg bg-[#2e2f39] min-h-screen lg:min-h-[0] text-white"
                onSubmit={handleLoginSubmit}
                method='POST'>

                <h1 className="text-center text-xl lg:text-2xl font-semibold mb-8 mt-20 lg:mt-0 text-[#eba312]">SALES LOGIN</h1>

                <label htmlFor="uname" className="text-[#eba312]"><strong>User Name:</strong></label>
                <input
                    type="text"
                    id="uname"
                    value={loginData.uname}
                    onChange={loginHandleChange}
                    className="mt-2 mb-3 text-black w-full p-2 mb-2 border border-gray-300 rounded text-sm placeholder-gray-400 placeholder:text-xs"
                    name="uname"
                    placeholder="Enter the User Name here"
                    required />

                <label htmlFor="pwd" className="text-[#eba312]"><strong>Password:</strong></label>
                <input
                    type="password"
                    id="pwd"
                    value={loginData.pwd}
                    onChange={loginHandleChange}
                    className="mt-2 mb-3 text-black w-full p-2 mb-2 border border-gray-300 rounded text-sm placeholder-gray-400 placeholder:text-xs"
                    name="pwd"
                    placeholder="Enter the Password here"
                    required />

                <button
                    className="mt-8 block w-full px-4 py-2 bg-yellow-600 text-white text-base font-medium rounded cursor-pointer hover:bg-yellow-700" disabled={isSubmitting} type="submit">{isSubmitting ? "Logging In..." : "Login"}</button>
            </form>
        </div>
    )
}

export default SupplyLogin