import "../../Styles/Header.css"
import { Link, useNavigate } from "react-router-dom";
const HeaderLogin =()=>{
    return(
        <div className="header">
         <Link to={"AppointmentList" }className="logo"> Bus Booking </Link> 
        <nav>
       
         <Link to={"/ContactUs"}>About Us</Link>
        </nav>
        <div className="header-right">
        
          <Link to={"/Register"}>SignUp</Link>
          <Link to={"/LoginPage"}>Login</Link>
        </div>
      </div>
      
    );
};

export default HeaderLogin;