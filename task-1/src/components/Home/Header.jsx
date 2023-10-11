import React from "react";
import "./styles/style.css";
import Logo from "../../assets/images/logo.svg";
const Header = () => {
  return (
    <div>
      <header className="headerr">
        <div className="logo-block">
          <img src={Logo} alt="logo" />
        </div>
      </header>
    </div>
  );
};

export default Header;
