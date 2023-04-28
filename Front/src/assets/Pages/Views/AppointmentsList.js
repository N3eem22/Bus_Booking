import React, { useState, useEffect } from "react";
import AppointmentsInfo from "../../Components/AppointmentsInfo";
import "../../Styles/AppointmentList.css";
import axios from 'axios'
import Spinner from 'react-bootstrap/Spinner';


const AppointmentList = () => {
  const [appointments, setAppointments] = useState({
    loading: false,
    results: null,
    err: null,
    reload: 0
  });
  const [searchs,setSearch]=useState("");
  const [queryp, setQueryp] = useState("");
/*
  const fetchData = async () => {
    setAppointments({...appointments, loading: true});
    try {
      const response = await axios.get("http://localhost:4000/ManageAppointments",{params:{
        search:search
      }});
      setAppointments({...appointments, results: response.data, loading: false, err: null});
    } catch (error) {
      setAppointments({...appointments, loading: false, err: "something went wrong"});
    }
  };
  */

  useEffect(() => {
    setAppointments({...appointments, loading: true});
    axios.get("http://localhost:4000/ManageAppointments",{params:{
        search:searchs
      }}).then((resp)=>{
        console.log(resp);
        setAppointments({...appointments, results: resp.data, loading: false, err: null});
    }).catch((err)=>{
      setAppointments({...appointments, loading: false, err: "something went wrong"});

    })
  }, [appointments.reload]);

  const spasificApp = (id) => {
    console.log("We clicked on ", id);
    console.log(appointments);
  };

  const displayApp = () => {
    if (appointments.loading) {
      return ( <Spinner animation="border" role="status">
      <span className="visually-hidden">Loading...</span>
    </Spinner>)
    }
    if (appointments.err) {
      return <p>{appointments.err}</p>
    }
    if (!appointments.results) {
      return null;
    }

    return appointments.results.map((data) => {
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

  const handelSearch = (event)=>{
    event.preventDefault();
    console.log(searchs);
   setAppointments({...appointments,reload:appointments.reload+1})
  }
  return (
    <>
    <div className="Appointment-List">
      <form className="formSearch" onSubmit={handelSearch}>
        
      <input 
        type="text" 
        placeholder="Search" 
        value={searchs}
        
        onChange={(event) => setSearch(event.target.value)}
      />
          <button className="search-button" type="submit">search</button>
        </form>
      {displayApp()}
    </div>
    </>
  );
};

export default AppointmentList;