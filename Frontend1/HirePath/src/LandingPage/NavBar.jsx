import axios from "axios";
import React, { useEffect, useState } from "react";
import profile from "../assets/profile2.svg";
import dropdown from "../assets/Dropdown.svg";

const NavBar = ({ auth, Logout }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isJobSeeker, setIsJobSeeker] = useState(false);
  const [isUserAuthenticated, setIsUserAuthenticated] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_API_URL}/Profile`,
          {
            withCredentials: true,
          }
        );
        if (response.status === 200) {
          setIsUserAuthenticated(true);
          if (response.data.WhoIAm === "recruiter") {
            setIsJobSeeker(false);
          } else {
            setIsJobSeeker(true);
          }
        }
      } catch (error) {
        setIsUserAuthenticated(false);
      }
    };

    if (!isUserAuthenticated) getUser();
  }, [isUserAuthenticated]);

  const handleLogout = async () => {
    try {
      const logout = await axios.post(
        `${import.meta.env.VITE_API_URL}/api/logout`,
        {},
        {
          withCredentials: true,
        }
      );
      if (logout.status === 200) {
        setIsUserAuthenticated(false);
        window.location.href = "/Landing";
      }
    } catch (error) {
      console.error("Error logging out", error);
    }
  };

  return (
    <nav className="bg-red-700 text-xl  text-white font-bold fixed w-full z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo for Desktop */}
          <div className="flex-shrink-0 hidden md:block">
            <a href="/" className="text-3xl font-extrabold ">
              upDate
            </a>
          </div>

          {/* Desktop Menu Links */}
          <div className="hidden md:flex space-x-8  ">
            <a
              href="/Landing"
              className="text-white hover:scale-105 hover:underline transition-all shadow-lg hover:text-primary"
            >
              Home
            </a>

            <a
              href={isUserAuthenticated ? "/MarketPlace" : "/login"}
              className="text-white hover:scale-105 hover:underline  transition-all shadow-lg hover:text-primary"
            >
              All Jobs
            </a>
            <a
              href="/courses"
              className="text-white hover:underline hover:scale-105 transition-all shadow-lg hover:text-primary"
            >
              Courses
            </a>
          </div>

          {/* Authentication Buttons */}
          <div className="flex items-center justify-center">
            {isUserAuthenticated ? (
              <div className="hidden md:flex justify-end space-x-4 p-2">
                <a href="/Profile">
                  <img
                    src={profile}
                    className="w-10 cursor-pointer hover:scale-105 transition-transform shadow-md"
                    alt="Profile"
                  />
                </a>
                {Logout && (
                  <button
                    onClick={handleLogout}
                    className=" text-black bg-white shadow-inner-custom bg-primary rounded-full px-3 py-1 hover:scale-105 transition-all"
                  >
                    Logout
                  </button>
                )}
              </div>
            ) : (
              <>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="text-black bg-white shadow-inner-custom mx-5  hidden md:block  rounded-full px-3 py-1 hover:bg-opacity-90 transition-all"
                >
                  Login
                </button>
                <button
                  onClick={() => (window.location.href = "/login")}
                  className="text-black bg-white shadow-inner-custom  hidden md:block  rounded-full px-3 py-1 hover:bg-opacity-90 transition-all"
                >
                  SignUp
                </button>
              </>
            )}
            {!isUserAuthenticated && (
              <div className="relative hidden md:block ml-2">
                <button
                  className=" underline text-white text-sm text-black px-1 py-2 rounded-full shadow-inner flex items-center gap-2"
                  onClick={toggleDropdown}
                >
                  Job Seeker{" "}
                  <img
                    src={dropdown}
                    alt="Dropdown Icon"
                    className="    fill-white"
                  />
                </button>
                {dropdownOpen && (
                  <div className="absolute bg-white shadow-md rounded-lg mt-2 w-36">
                    <a
                      href="/login"
                      className="block text-black px-4 py-2 hover:bg-red-700 hover:text-white"
                    >
                      Recruiter
                    </a>
                    <a
                      href="/login"
                      className="block text-black px-4 py-2 hover:bg-red-700 hover:text-white"
                    >
                      Job Seeker
                    </a>
                  </div>
                )}
              </div>
            )}
            {isUserAuthenticated && !isJobSeeker && (
              <>
                {" "}
                <div
                  onClick={() => (window.location.href = "/addjob")}
                  id="addingjob"
                  className="addingjob shadow-inner-custom  bg-white cursor-pointer hover:scale-105 hidden md:block md:flex p-2 text-black rounded-full   "
                >
                  <img
                    src="/plus.svg"
                    height={30}
                    width={30}
                    alt=""
                    srcset=""
                    className="addingjob "
                  />
                  add job
                </div>
              </>
            )}
          </div>

          {/* Mobile View */}
          <div className="md:hidden flex items-center justify-between w-full">
            {/* Menu Button on the Left */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white transition-transform transform hover:scale-105 shadow-lg focus:outline-none"
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={
                    isOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"
                  }
                />
              </svg>
            </button>

            {/* Logo in the Center */}
            <div className="flex-grow text-center">
              <a href="/" className="text-xl font-bold text-primary">
                upDate
              </a>
            </div>
            {isUserAuthenticated && !isJobSeeker && (
              <>
                {" "}
                <button className="bg-white m-1 shadow-inner-custom flex items-center justify-center text-black rounded-full p-1 ">
                  <img src="/plus.svg" alt="" className="w-10" />
                  add job
                </button>
              </>
            )}
            {!isUserAuthenticated && (
              <button
                onClick={() => (window.location.href = "login")}
                className="text-black bg-white  rounded-full px-3 py-1 hover:bg-opacity-90 transition-all"
              >
                signIN
              </button>
            )}
            {/* Profile Icon on the Right */}
            {isUserAuthenticated && (
              <a href="/Profile">
                <img
                  src={profile}
                  className="w-10 cursor-pointer hover:scale-105 transition-transform shadow-md"
                  alt="Profile"
                />
              </a>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-purple-600">
          <ul className="space-y-4 p-4 text-center text-white">
            <li>
              <a
                href="/Landing"
                className="block text-lg hover:scale-105 transition-all shadow-md"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="/Aboutus"
                className="block text-lg hover:scale-105 transition-all shadow-md"
              >
                About Us
              </a>
            </li>
            <li>
              <a
                href={isUserAuthenticated ? "/MarketPlace" : "/login"}
                className="block text-lg hover:scale-105 transition-all shadow-md"
              >
                All Jobs
              </a>
            </li>
            <li>
              <a
                href="/courses"
                className="block text-lg hover:scale-105 transition-all shadow-md"
              >
                Courses
              </a>
            </li>
            <li>
              <a
                href="/contact"
                className="block text-lg hover:scale-105 transition-all shadow-md"
              >
                Contact Us
              </a>
            </li>
          </ul>
        </div>
      )}
    </nav>
  );
};

export default NavBar;
