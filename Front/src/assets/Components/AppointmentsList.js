import React, { useState, useRef,useEffect } from "react";
import Data from "../core/data/Appointments";
import AppointmentsInfo from "./AppointmentsInfo";
import "../Styles/AppointmentList.css";
import axios from 'axios'

const AppointmentList = () => {
  const [query, setQuery] = useState("");
  const [queryp, setQueryp] = useState("");
  const [data,setData] = useState([]);
 
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/ManageAppointments");
      const data = response.data;
      if (Array.isArray(data)) {
        setData(data);
      } else {
        setData(Array.from(data));
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(()=>{
    fetchData();
  },[query])

  const spasificApp = (id) => {
    console.log("We clicked on ", id);
    console.log(query);
  };
  const displayApp = () => {
    console.log(data);
    return data.map((data) => {
      return ( 
       
        <AppointmentsInfo
          key={data.id}
          id={data.id}
          data={data}
          spasificApp={spasificApp}
        />
      );
    });
  };
  return (<>
   
    <div className="Appointment-List">
    <div className="Searchbars">
    <input type="text" className="search"  placeholder="Search for Appointments..." title="Type in a name"/>

  <label htmlFor="price-filter">Filter</label>
  <input
    type="number"
    id="price-filter"
    placeholder="Filter by price..."
    className="filter"
    value={queryp}
    onChange={e => setQueryp(e.target.value)}
  />
</div>

      {displayApp()}
    </div>
    </>
  );
};
export default AppointmentList;
