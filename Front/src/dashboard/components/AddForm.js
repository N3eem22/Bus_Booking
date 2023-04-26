import { useState } from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import '../styling/AddForm.css'
import moment from "moment";

const AddForm = ({ inputs, title }) => {
 
    const [file, setFile] = useState("");
    const [appointment, setAppointment] = useState({
        From_location:" ",
        To_location:" ",
        Price:" ",
        Date:" ",
        Time:" " ,
    });
    const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(appointment);
    console.log(file);
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
                    <h1>{title}</h1>
                </div>
                <div className="bottom">
                    <div className="left">
                        <img
                            src={
                                file
                                    ? URL.createObjectURL(file)
                                    : "https://icon-library.com/images/no-image-icon/no-image-icon-0.jpg"
                            }
                            alt=""
                        />
                    </div>
                    <div className="right">
                        <form  action="ProductList" onSubmit={handleSubmit}>
                            <div className="formInput">
                                <label htmlFor="file">
                                    Image: <DriveFolderUploadOutlinedIcon className="icon" />
                                </label>
                                <input
                                required
                                    type="file"
                                    id="file"
                                    onChange={(e) => setFile(e.target.files[0])}
                                    style={{ display: "none" }}
                                />
                            </div>

                            {inputs.map((input) => (
                                <div className="formInput" key={input.id}>
                                    
                                    <label>{input.label}</label>
                                    <input required type={input.type} placeholder={input.placeholder}
                                    value={appointment.label}
                                    onChange={(event)=>{
                                        if (input.label == "Time") {
                                            handleTimeChange(event);
                                        } else {
                                             setAppointment({
                                            ...appointment,
                                             [input.label]: event.target.value,
                                          })
                                        }
                                       
                                    }}
                                    />
                                </div>
                            ))}
                            <button>Send</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default AddForm
