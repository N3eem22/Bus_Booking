import { Outlet , Navigate} from "react-router-dom";
import { getAuthUser } from "../helper/Storage";

const Guest = ()=>{
    const authUser = getAuthUser();

    if (!authUser) {
        return <Outlet />;
    } else if (authUser.type === "admin") {
        return <Navigate to="/dashboard" />;
    } else {
        return <Navigate to="/AppointmentList" />;
    }
};

export default Guest;