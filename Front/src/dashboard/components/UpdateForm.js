import { useState } from 'react';
import DriveFolderUploadOutlinedIcon from "@mui/icons-material/DriveFolderUploadOutlined";
import '../styling/UpdateForm.css'

const UpdateForm = ({ oldData ,inputs , formTitle }) => {
    const [file, setFile] = useState(oldData.photo);
    const [fileUpdated, setFileUpdated] = useState(false);

    inputs[0] = {...inputs[0], oldData: oldData.from}
    inputs[1] = {...inputs[1], oldData: oldData.to}
    inputs[2] = {...inputs[2], oldData: oldData.date}
    inputs[3] = {...inputs[3], oldData: oldData.time}
    inputs[4] = {...inputs[4], oldData: oldData.price}
    inputs[5] = {...inputs[5], oldData: oldData.maxNumberOfTravelers}

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
                        <form>
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
                                    <input type={input.type} defaultValue={input.oldData} placeholder={input.placeholder} />
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

export default UpdateForm
