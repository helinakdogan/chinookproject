import React, { useState } from "react";
import { FaHome, FaMusic, FaCompactDisc, FaPlus } from "react-icons/fa";

const Navbar = ({ currentSelect, setCurrentSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gradient-to-r from-violet-600 via-purple-600 px-4 sm:px-6 py-4 shadow-lg">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <a href="/" className="flex items-center">
          <span className="self-center text-3xl font-bold whitespace-nowrap text-white drop-shadow-lg">
            Music Library
          </span>
        </a>
        <button
          type="button"
          className="inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden hover:bg-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-300 transition duration-300"
          aria-controls="mobile-menu"
          aria-expanded={isOpen ? "true" : "false"}
          onClick={handleMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
          {isOpen ? (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                clipRule="evenodd"
              ></path>
            </svg>
          ) : (
            <svg
              className="w-6 h-6"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M3 5a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 10a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1zM3 15a1 1 0 011-1h12a1 1 0 110 2H4a1 1 0 01-1-1z"
                clipRule="evenodd"
              ></path>
            </svg>
          )}
        </button>
        <div
          className={`${isOpen ? "block" : "hidden"} w-full md:flex md:w-auto`}
          id="mobile-menu"
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
            {[
              { name: "Home", icon: <FaHome /> },
              { name: "Albums", icon: <FaCompactDisc /> },
              { name: "Tracks", icon: <FaMusic /> },
              { name: "Add Content", icon: <FaPlus /> },
            ].map(({ name, icon }) => (
              <li key={name}>
                <button
                  onClick={() => {
                    setCurrentSelect(name);
                    setIsOpen(false);
                  }}
                  className={`${
                    currentSelect === name
                      ? "text-white bg-violet-500 rounded-md shadow-md"
                      : "text-gray-200 hover:text-white"
                  } flex items-center gap-2 w-full py-2 px-4 text-center md:text-left transition duration-300`}
                  aria-current={currentSelect === name ? "page" : undefined}
                >
                  {icon}
                  {name}
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
