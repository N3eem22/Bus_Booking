import React from "react";
import { Outlet , Navigate} from "react-router-dom";
import { getAuthUser } from "../helper/Storage";


const Admin = ()=>{
    const Auth = getAuthUser();
return<>
{
    (!Auth)? <Outlet/> : <Navigate to={""}/>
}
    </>

}
export default Admin;