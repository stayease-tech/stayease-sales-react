import { FiMenu } from "react-icons/fi";
import { FaArrowLeft } from "react-icons/fa";
import { LiaBedSolid } from "react-icons/lia";
import { MdLeaderboard, MdOutlineStickyNote2 } from "react-icons/md";
import { useLocation, Link } from "react-router-dom";

export default function Sidebar({ toggleSidebar, isExpanded }) {
    const location = useLocation();

    const menuItems = [
        // { name: "Home", icon: <FiHome />, link: "/sales/sales-home" },
        { name: "Beds", icon: <LiaBedSolid />, link: "/sales/sales-beds-table" },
        { name: "Leads", icon: <MdLeaderboard />, link: "/sales/sales-leads-table" },
        { name: "Expenses", icon: <MdOutlineStickyNote2 />, link: "/sales/sales-expense-table" },
        // { name: "Settings", icon: <FiSettings />, link: "#" },
    ];

    return (
        <div
            className={`min-h-screen bg-[#000000] border-r-2 border-[#eba312] text-white p-5 duration-300 fixed z-[100] left-0 top-0 ${isExpanded ? "w-64" : "w-16"}`}
        >
            <div className="text-right">
                <button onClick={toggleSidebar} className="text-2xl hover:text-[#eba312]">
                    {isExpanded ? <FaArrowLeft /> : <FiMenu />}
                </button>
            </div>

            <ul className="mt-10 space-y-4">
                {menuItems.map((item, index) => (
                    <li key={index}>
                        <Link
                            to={item.link}
                            className={`flex items-center space-x-3 ${isExpanded ? "hover:bg-[#282b38] p-3" : "py-3"} rounded-md hover:text-[#eba312] ${location.pathname === item.link ? (isExpanded ? "bg-[#282b38] text-[#eba312]" : "text-[#eba312]") : ""}`}
                        >
                            <span className="text-xl">{item.icon}</span>
                            {isExpanded && <span className="text-sm">{item.name}</span>}
                        </Link>
                    </li>
                ))}
            </ul>
        </div >
    );
}
