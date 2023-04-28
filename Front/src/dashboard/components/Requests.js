    import DataTable from 'react-data-table-component';
    import { Link } from 'react-router-dom';
    import { useState } from 'react';


    const RequestComponent =({ inputs, title })=>{
    const [currRequests,setRequests]=useState(inputs);
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

    ];

        return(<>
        <div className="title-datatable">
                    <h2>{title}</h2>
                
                </div>
                <DataTable
                    columns={columns}
                    data={inputs}/>
        </>);
    }
    export default RequestComponent;