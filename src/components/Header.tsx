// src/components/Header.tsx
import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import DropdownMenu from "./DropdownMenu";
import { useMain } from "../contexts/MainContext"; // Assumendo che MainContext.tsx si trovi in src/contexts

const Header = () => {
  const mainContext = useMain();
  const { userName, userNick, userId, jwt } = mainContext || {};
  const [isDropdownOpen, setIsDropdownOpen] = useState<boolean>(false);
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [dropdownRef]);

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const userIdString = userId + "";

  const user =
    jwt && userNick && userName && userId
      ? { userId: userIdString, userName, userNick }
      : null; // Costruiamo l'oggetto user

  return (
    <header className="relative w-full z-10" role="banner">
      <div className="relative w-full h-82 md:h-60 flex justify-between items-center">
        <img
          src={`/header.webp`}
          alt="GoGreen Header"
          className="w-full h-full object-cover"
          style={{ objectFit: "cover", objectPosition: "center" }}
        />
        <Link to="/" className="absolute top-2 left-4">
          <img
            src={`/yellow-logo.svg`}
            alt="GoGreen Logo"
            className="w-16 h-16"
          />
        </Link>
        <div className="absolute top-4 right-4">
          {jwt && (
            <button
              onClick={toggleDropdown}
              className="bg-transparent border-0 p-0"
            >
              <img src={`/user-yellow.svg`} alt="Logo" className="w-8 h-8" />
            </button>
          )}
          {jwt && (
            <div ref={dropdownRef}>
              <DropdownMenu
                isLoggedIn={jwt ? true : false}
                user={user}
                isDropdownOpen={isDropdownOpen}
              />
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

export default Header;
