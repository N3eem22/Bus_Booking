import React from "react";
import { Outlet , Navigate} from "react-router-dom";
import { getAuthUser } from "../helper/Storage";


const Admin = ()=>{
    const Auth = getAuthUser();
return<>
{
    (!Auth && Auth.type=="admin")? <Outlet/> : <Navigate to={"/AppointmentList"}/>
}
    </>

}
export default Admin;