import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../assets/beta.png";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { FaChevronDown } from "react-icons/fa";

const Header = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const navigate = useNavigate();

  // check token on mount
  useEffect(() => {
    const token = localStorage.getItem("token");
    setIsLoggedIn(!!token);
  }, []);

  const handleLogout = () => {
    // clear token
    localStorage.removeItem("token");

    setIsLoggedIn(false);
    setDropdownOpen(false);

    // redirect to login page
    navigate("/login");
  };

  return (
    <div className="fixed top-0 left-0 w-full z-50 shadow-xl h-[80px] bg-transparent">
      <nav className="component flex items-center justify-between px-4 py-3 bg-transparent">
        {/* Logo */}
        <Link to="/">
          <img src={logo} alt="logo" className="w-[120px]" />
        </Link>

        {/* Desktop Links */}
        <div className="hidden lg:flex items-center gap-8">
          <Link to="/" className="nav-links">
            Home
          </Link>
          <Link to="#" className="nav-links">
            Properties
          </Link>
          <Link to="#" className="nav-links">
            About Us
          </Link>
          <Link to="#" className="nav-links">
            Blog
          </Link>
          <Link to="#" className="nav-links">
            Contact Us
          </Link>
        </div>

        {/* Right Section */}
        <div className="hidden lg:flex items-center gap-4 relative">
          {!isLoggedIn ? (
            <>
              <button
                onClick={() => navigate("/signup")}
                className="cursor-pointer w-[140px] h-[45px] rounded-[8px] border border-[#F5F5F5] font-[400] text-[16px] text-[#F5F5F5]"
              >
                Sign Up
              </button>
              <button
                onClick={() => navigate("/login")}
                className="cursor-pointer w-[140px] h-[45px] rounded-[8px] font-[400] text-[16px] text-[#F5F5F5] bg-[#3D9970]"
              >
                Login
              </button>
            </>
          ) : (
            <div className="flex items-center gap-2 cursor-pointer">
              <img
                src="https://i.pravatar.cc/40" // dummy avatar
                alt="user avatar"
                className="w-10 h-10 rounded-full border border-gray-400"
              />
              <span className="text-white font-medium">Michael Idioha</span>
              <FaChevronDown
                className="text-white"
                onClick={() => setDropdownOpen(!dropdownOpen)}
              />

              {dropdownOpen && (
                <div className="absolute right-0 top-[60px] bg-[#1a1a1a] shadow-lg rounded-md py-2 w-[150px]">
                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-2 text-white hover:bg-[#333] transition"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <div className="lg:hidden">
          <button onClick={() => setMenuOpen(!menuOpen)}>
            {menuOpen ? (
              <IoMdClose size={30} className="text-white" />
            ) : (
              <IoMdMenu size={30} className="text-white" />
            )}
          </button>
        </div>

        {/* Mobile Menu */}
        {menuOpen && (
          <div className="absolute top-[70px] left-0 w-full bg-[#1a1a1a] flex flex-col items-center gap-6 py-6 z-50">
            <Link
              to="/"
              className="nav-links text-[#F5F5F5]"
              onClick={() => setMenuOpen(false)}
            >
              Home
            </Link>
            <Link
              to="#"
              className="nav-links text-[#F5F5F5]"
              onClick={() => setMenuOpen(false)}
            >
              Properties
            </Link>
            <Link
              to="#"
              className="nav-links text-[#F5F5F5]"
              onClick={() => setMenuOpen(false)}
            >
              About Us
            </Link>
            <Link
              to="#"
              className="nav-links text-[#F5F5F5]"
              onClick={() => setMenuOpen(false)}
            >
              Blog
            </Link>
            <Link
              to="#"
              className="nav-links text-[#F5F5F5]"
              onClick={() => setMenuOpen(false)}
            >
              Contact Us
            </Link>

            {/* Buttons / User Menu */}
            <div className="flex flex-col gap-4 mt-4">
              {!isLoggedIn ? (
                <>
                  <button
                    onClick={() => navigate("/signup")}
                    className="cursor-pointer w-[200px] h-[45px] rounded-[8px] border border-[#F5F5F5] font-[400] text-[16px] text-[#F5F5F5]"
                  >
                    Sign Up
                  </button>
                  <button
                    onClick={() => navigate("/login")}
                    className="cursor-pointer w-[200px] h-[45px] rounded-[8px] font-[400] text-[16px] text-[#F5F5F5] bg-[#3D9970]"
                  >
                    Login
                  </button>
                </>
              ) : (
                <div className="flex flex-col items-center gap-2">
                  <img
                    src="https://i.pravatar.cc/60"
                    alt="user avatar"
                    className="w-14 h-14 rounded-full border border-gray-400"
                  />
                  <span className="text-white font-medium">Michael Idioha</span>
                  <button
                    onClick={handleLogout}
                    className="cursor-pointer w-[200px] h-[45px] rounded-[8px] font-[400] text-[16px] text-[#F5F5F5] bg-red-600"
                  >
                    Logout
                  </button>
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Header;
