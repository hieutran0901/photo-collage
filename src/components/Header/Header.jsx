import React from "react";
import logo from "../../assets/images/photo-collage-logo.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <header className="underline bg-[#82b338] h-20 ">
      <div className="max-w-screen-lg mx-auto flex items-center h-full cursor-pointer">
        <Link to={'/'}>
          <img src={logo} alt="" />
        </Link>
      </div>
    </header>
  );
};

export default Header;
