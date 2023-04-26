import "../../Styles/Header.css"
import { Link, useNavigate } from "react-router-dom";
const TravellerHeader =()=>{
    return(
        <div className="header">
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

export default TravellerHeader;