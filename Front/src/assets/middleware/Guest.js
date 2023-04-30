import React from "react";
import { Outlet , Navigate} from "react-router-dom";
import { getAuthUser } from "../helper/Storage";


const Guest = ()=>{
    const Auth = getAuthUser();
return<>
{
    (!Auth)? <Outlet/> : <Navigate to={"/AppointmentList"}/>
}
    </>

}
export default Guest;