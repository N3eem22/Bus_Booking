    import RequestComponent from "../../components/Requests";
    import { requests } from "../../helper/helper";

    export async function UpdateAppointmenyLoader({params}) {
        const oldData = findById({params})
    
        return oldData;
    }
    
    const TravelerRequest = () => {

        return (
            <div>
                <RequestComponent inputs={requests} title={"Requests History"} />
            </div>
        );
    }

    export default TravelerRequest