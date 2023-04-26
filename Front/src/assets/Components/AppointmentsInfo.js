import React from "react";
import "../Styles/AppointmentCard.css"

const AppointmentsInfo = (props)=>{
  console.log(props);
 
    
    return(
        
<div className="Appoint-card">
    <div className="card-top"></div>
    <div className="card-info">
       
       <div className="distenations"><h4 className="from">from : {props.data.from_location}</h4>
       <h4>To: {props.data.to_location}</h4></div>
        <div className="price"><h4>price : {props.data.ticket_price} LE</h4>
        <h4>Date : {props.data.day}</h4>
        <h4>time : {props.data.time}</h4>
       <h4>max number of travellers : {props.data.max_num_of_travelers}</h4></div>
       
       
    </div>
 <button onClick={()=>{
    props.spasificApp(props.id);
 }}>Book</button>
</div>
    )
}
export default AppointmentsInfo;