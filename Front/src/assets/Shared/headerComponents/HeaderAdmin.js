import react from 'react'
import "../../Styles/Header.css"
import { Link, useNavigate } from "react-router-dom";

const HeaderAdmin=()=>{
    return(
        <div className="header">
         <a className='logo'>Bus Booking </a>  
        <nav>
         <Link to={"/ManageAppointments"}>ManageAppointments</Link>
         <Link to={"/ContactUs"}>Contact US</Link>
         <Link to={"/ContactUs"}>About Us</Link>
        </nav>
        <div className="header-right">
          <a >Log Out</a>
        </div>
      </div>
      
    );
}
export default HeaderAdmin;