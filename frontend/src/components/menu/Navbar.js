import React, { useState } from "react";

const Navbar = ({ currentSelect, setCurrentSelect }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleMenuOpen = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="bg-gray-800 px-4 sm:px-6 py-4 shadow-lg">
      <div className="container flex flex-wrap justify-between items-center mx-auto">
        <h1 className="text-white text-2xl font-bold">Music App</h1>
        <button
          type="button"
          className="inline-flex items-center p-2 text-sm text-white rounded-lg md:hidden hover:bg-gray-700 focus:outline-none"
          onClick={handleMenuOpen}
        >
          <span className="sr-only">Open main menu</span>
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
        </button>
        <div
          className={`${
            isOpen ? "block" : "hidden"
          } w-full md:flex md:w-auto`}
        >
          <ul className="flex flex-col md:flex-row md:space-x-8 mt-4 md:mt-0">
            {["Albums", "Tracks", "Add Album", "Add Track"].map((item) => (
              <li key={item}>
                <button
                  onClick={() => {
                    setCurrentSelect(item);
                    setIsOpen(false);
                  }}
                  className={`${
                    currentSelect === item
                      ? "text-gray-900 bg-gray-100 dark:bg-gray-700 dark:text-white rounded-md"
                      : "text-gray-300 hover:text-white"
                  } w-full py-2 px-4 text-center md:text-left transition-colors duration-300`}
                >
                  {item}
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
