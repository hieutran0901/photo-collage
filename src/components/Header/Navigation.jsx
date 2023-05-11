import React from "react";
import { NavLink } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="bg-[#4e8028] h-8">
      <div className="max-w-screen-lg mx-auto h-full">
        <ul className="flex gap-3 justify-center text-white h-full">
          <li className="w-40 cursor-pointer hover:bg-green-800 h-full">
            <NavLink to="/" className="w-full h-full flex items-center justify-center">
              Collage Maker
            </NavLink>
          </li>
          <li className="w-40 cursor-pointer hover:bg-green-800 h-full">
            <NavLink to="/photo-collage-templates" className="w-full h-full flex items-center justify-center">
              Templates
            </NavLink>
          </li>
          <li className="w-40 cursor-pointer hover:bg-green-800 h-full flex items-center justify-center">Prints</li>
        </ul>
      </div>
    </nav>
  );
};

export default Navigation;
