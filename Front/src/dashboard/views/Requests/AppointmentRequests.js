    import DataTable from 'react-data-table-component';
    import { Link } from 'react-router-dom';
    import { requests } from '../../helper/helper';
    import { useState } from 'react';
    import '../../styling/dashboard.css'

    const AppointmentRequests =()=>{
    const [currRequests,setRequests]=useState(requests);
    const columns = [
        {
            name: 'email',
            selector: row => row.email,
            sortable: true,
            center: true
        },
        {
            name: 'appointment',
            selector: row => row.appointmentID,
            sortable: true,
            center: true
        },
        {
            name: 'status',
            selector: row => row.status,
            sortable: true,
            center: true
        },
        {
            name: "",
            cell: (param) => updateRequest(param),
            center: true
        },
    ];

    const updateRequest = (param) => {
        const handleDelete = () => {
        setRequests(currRequests.filter((item) => item.email !== param.email));
        };
    
        return (
        <>
            <Link to={`update_request/${param.email}`} className='UpdateBtn' onClick={handleDelete}>
            update
            </Link>
        </>
        );
    };

        return(<>
        <div className="title-datatable">
                    <h2>All requests</h2>
                
                </div>
                <DataTable
                    columns={columns}
                    data={currRequests}/>
        </>);
    }
    export default AppointmentRequests;