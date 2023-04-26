import { Link, useNavigate } from "react-router-dom";
import HeaderAdmin from "./headerComponents/HeaderAdmin";
import TravellerHeader from "./headerComponents/travellerHeader";
//import { IsAdmin, IsLoged } from "../Pages/LoginPage";
import HeaderLogin from "./headerComponents/HeaderLogin";
import { useState ,useEffect} from "react";

const Header =()=>{
  const [header, setHeader] = useState(""); // set initial header state
 // const isAdmin = IsAdmin(); // get current admin status
  //const isLogged = IsLoged(); // get current login status

  // update header state based on user status
 /* useEffect(() => {
    if (isAdmin) {
      setHeader("admin");
    } else if (isLogged) {
      setHeader("traveller");
    } else {
      setHeader("login");
    }
  }, [isAdmin, isLogged]);
*/
  // render the appropriate header component based on header state
  const renderHeader = () => {
    switch (header) {
      case "admin":
        return <HeaderAdmin />;
      case "traveller":
        return <TravellerHeader />;
      case "login":
        return <HeaderLogin />;
      default:
        return null;
    }
  };

  return(   <div className="header">
  <Link to={"AppointmentList" }className="logo"> Bus Booking </Link> 
 <nav>
  <Link to={"/ContactUs"}>History</Link>
   <Link to={"/ContactUs"}>Contact US</Link>
  <Link to={"/ContactUs"}>About Us</Link>
 </nav>
 <div className="header-right">
 
   <a >Sign Up</a>
   <a >Log In</a>
 </div>
</div>
);
};

export default Header;
