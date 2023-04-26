import DataTable from 'react-data-table-component';
import { Link } from 'react-router-dom';
import { users } from '../../helper/helper';
import { useState } from 'react';
import '../../styling/dashboard.css'

const AllTravelers =()=>{
const [currUsers,setUsers]=useState(users);
const columns = [
    {
        name: 'email',
        selector: row => row.email,
        sortable: true,
        center: true
    },
    {
        name: 'phone',
        selector: row => row.phone,
        sortable: true,
        center: true
    },
    {
        name: "",
        cell: (param) => updateTraveler(param),
        center: true
    },
    {
        name: "",
        cell: (param) => deleteTraveler(param),
    },
    {
        name: "",
        cell: (param) => showRequest(param),
    },
];
const handleDelete = (params) => {
    setUsers(currUsers.filter((item) => item.email !== params.email))
};

const updateTraveler = (param) => {
    return (
        <>
            <Link to={`update_traveler/${param.email}`} className='UpdateBtn' >
                update
            </Link>
        </>
    );
};
const showRequest =(param)=>{
    return (
        <>
            <Link to={`traveler_request/${param.email}`} className='UpdateBtn' >
                requests
            </Link>
        </>
    );
}
const deleteTraveler = (param) => {
    return (
        <>
            <button className='deleteBtn' onClick={() => handleDelete(param)}>
                delete
            </button>
        </>
    );
};
    return(<>
     <div className="title-datatable">
                <h2>All Travelers</h2>
                <div className="a-container">
                    <Link to={"add_traveler"} className="addApp">
                        Add Travelers
                    </Link>
                </div>
            </div>
            <DataTable
                columns={columns}
                data={currUsers}/>
    </>);
}
export default AllTravelers;