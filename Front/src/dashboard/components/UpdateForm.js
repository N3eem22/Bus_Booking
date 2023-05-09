import { useEffect, useState } from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import '../styling/UpdateForm.css'
import axios from 'axios';
import { getAuthUser } from '../../assets/helper/Storage';
import { useParams } from 'react-router-dom';
import moment from "moment";
const UpdateForm = ({ inputs , formTitle }) => {
    const Auth =getAuthUser();
    const { id } = useParams();
    const [file, setFile] = useState("");
    const [fileUpdated, setFileUpdated] = useState(false);
    
      const [appointment, setAppointment] = useState({
          From_location:"",
          To_location:"",
          Price:"",
          Date:"",
          Time:"",
          Max_num_of_travelers:"", // corrected label
      });
      const [currRequests,setRequests]=useState({ 
          loading: false,
          results: [],
          err: [],
          reload: 0
        });
        const [requestStatus, setRequestStatus] = useState(null);

    useEffect(() => {
        setRequests({ ...currRequests, loading: true });
        axios
          .get(`http://localhost:4000/ManageAppointments/id/${id}`, {
            headers: {
              token: Auth.token,
            },
          })
          .then((resp) => {
            setRequests({
              ...currRequests,
              results: resp.data,
              loading: false,
              err: null,
            });
            setAppointment({
              From_location: resp.data.From_location,
              To_location: resp.data.To_location,
              Price: resp.data.ticket_price,
              Date: resp.data.day,
              Time: resp.data.time,
              Max_num_of_travelers: resp.data.max_num_of_travelers,
            });
          })
          .catch((err) => {
            console.log(err);
            setRequests({ ...currRequests, loading: false, err: err });
          });
    }, []);
    const handleSubmit = async (event) => {

        event.preventDefault();
        try {
          const formData = new FormData();
          formData.append("image", file, file.name);   // include original file name
          formData.append("from_location", appointment.From_location);
          formData.append("to_location", appointment.To_location);
          formData.append("ticket_price", appointment.Price);
          formData.append("day", appointment.Date);
          formData.append("time", appointment.Time);
        formData.append("max_num_of_travelers", appointment.Max_num_of_travelers);      
          setRequests({ ...currRequests, loading: true });
          const resp = await axios.put(
            `http://localhost:4000/ManageAppointments/${id}`,
            formData,
            {
              headers: {
                token: Auth.token,
              
              },
            }
          );
      
          setRequests({
            ...currRequests,
            results: resp.data,
            loading: false,
            err: null,
          });
          
          console.log(resp.data[0].msg);
          setRequestStatus(resp.data[0].msg);
          console.log(resp);
        } catch (err) { 
          console.log(err);
          setRequestStatus(err.response.data[0].msg);
        
          setRequests({
            ...currRequests,
            loading: false,
            err: "User not added",
          });
        }
        console.log(appointment);
      };
  const handleTimeChange = (event) => {
    const timeValue = event.target.value;
    const formattedTime = moment(timeValue, ["h:mm A", "HH:mm"]).format("HH:mm");
    setAppointment({ ...appointment, Time: formattedTime });
  };
    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>{formTitle}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                fileUpdated 
                                    ? URL.createObjectURL(file)
                                    : file
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                    type="file"
                                    id="file"
                                
                                    onChange={(e) => {setFile(e.target.files[0]);setFileUpdated(true)}}
                                    style={{ display: "none" }}
                                />
                            </div>

                                                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    <label>{input.label}</label>
                                    <input
                                    type={input.type}
                                    value={appointment[input.label]} 
                                    onChange={(event) => {
                                        if (input.label === "Time") {
                                          handleTimeChange(event);
                                        } else {
                                          setAppointment({
                                            ...appointment,
                                            [input.name]: event.target.value,
                                          });
                                        }
                                      }}
                                    placeholder={input.placeholder}
                                    />
                                </div>
))}
                            <button type='submit'>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UpdateForm;