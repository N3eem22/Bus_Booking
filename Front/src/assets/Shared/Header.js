import { Link, useNavigate } from "react-router-dom";

import "../Styles/Header.css";
import { useState, useEffect } from "react";
import { getAuthUser, removeAuthUser } from "../helper/Storage";

const Header = () => {

  const auth = getAuthUser();
  const logOut = () => {
  
    removeAuthUser();
  };

  return (
    <div className="header">
      <Link to={"AppointmentList"} className="logo">
        {" "}
        Bus Booking{" "}
      </Link>
      <nav>
        <Link to={"/ContactUs"}>History</Link>
        <Link to={"/ContactUs"}>Contact US</Link>
        
        {!auth&&(<><Link to={"/Register"}>Register</Link>
        <Link to={"/LoginPage"}>Log in</Link></>)}

      </nav>
      <div className="header-right">
      { auth&&(<Link to={"/LoginPage"} onClick={logOut()}>
          Log Out
        </Link>)
        }
        
      </div>
    </div>
  );
};

export default Header;
