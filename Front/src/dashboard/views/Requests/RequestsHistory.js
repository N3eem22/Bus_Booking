    import RequestComponent from "../../components/Requests";
    import { requests } from "../../helper/helper";


    const RequestsHistory = () => {

        return (
            <div>
                <RequestComponent inputs={requests} title={"Requests History"} />
            </div>
        );
    }

    export default RequestsHistory