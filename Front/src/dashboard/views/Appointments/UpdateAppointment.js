import { useLoaderData } from "react-router-dom";
import { appointmentInputs } from "../../FormSource";
import UpdateForm from "../../components/UpdateForm";
import { findById } from "../../helper/helper";

export async function UpdateAppointmenyLoader({params}) {
    const oldData = findById({params})

    return oldData;
}

const UpdateAppointment = () => {

    const oldData = useLoaderData()

    return (
        <div>
            <UpdateForm  inputs={appointmentInputs} formTitle={"Update Apppointment"} />
        </div>
    );
}

export default UpdateAppointment