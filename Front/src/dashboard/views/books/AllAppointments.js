import DataTable from 'react-data-table-component';
import '../../styling/dashboard.css'
import { Link } from 'react-router-dom';
import { data } from '../../helper/helper';
import { useState } from 'react';


const AllAppointments = () => {

    const [currdata, setData] = useState(data);

    const columns = [
        {
            name: 'Photo',
            selector: row => (
                <img src={row.photo} width={70}  />
            ),
            center: true
        },
        {
            name: 'From',
            selector: row => row.from,
            sortable: true,
            center: true
        },
        {
            name: 'To',
            selector: row => row.to,
            sortable: true,
            center: true
        },
        {
            name: 'Date',
            selector: row => row.date,
            sortable: true,
            center: true
        },
        {
            name: 'Time',
            selector: row => row.time,
            sortable: true,
            center: true
        },
        {
            name: 'Price',
            selector: row => row.price,
            sortable: true,
            center: true
        },
        {
            name: 'Max Number of travelers',
            selector: row => row.maxNumberOfTravelers,
            sortable: true,
            center: true
        },
        {
            name: "",
            cell: (param) => updateAppointment(param),
            center: true
        },
        {
            name: "",
            cell: (param) => deleteAppointment(param),
        },
    ];

    const handleDelete = (params) => {
        setData(currdata.filter((item) => item.id !== params.id))
    };

    const updateAppointment = (param) => {
        return (
            <>
                <Link to={`update_appointment/${param.id}`} className='UpdateBtn' >
                    update
                </Link>
            </>
        );
    };

    const deleteAppointment = (param) => {
        return (
            <>
                <button className='deleteBtn' onClick={() => handleDelete(param)}>
                    delete
                </button>
            </>
        );
    };

    return (
        <>
            <div className="title-datatable">
                <h2>All Appointments</h2>
                <div className="a-container">
                    <Link to={"add_appointment"} className="addApp">
                        Add Appointment
                    </Link>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={currdata}
            />
        </>
    );
}

export default AllAppointments;