import { useLoaderData } from "react-router-dom";
import { RequestInputs } from "../../FormSource";
import { findByEmail, findById } from "../../helper/helper";
import UpdateRequestComp from "../../components/UpdateRequestComp";
export async function UpdateAppointmenyLoader({ RequestInputs }) {
    const oldData = await findByEmail({RequestInputs});
    return oldData;
  }
const UpdateRequests = ({RequestInputs }) => {
    const oldData = useLoaderData()

    return (
        <div>
            <UpdateRequestComp oldData={oldData} inputs={RequestInputs} formTitle={"Update request"} />
        </div>
    );
}

export default UpdateRequests
