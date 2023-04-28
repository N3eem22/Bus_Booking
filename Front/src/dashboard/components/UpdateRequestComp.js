

import '../styling/UpdateForm.css'

const UpdateRequestComp = ({ oldData ,inputs , formTitle }) => {

    inputs[0] = {...inputs[0], oldData: oldData.email}
    inputs[1] = {...inputs[1], oldData: oldData.appointment}
    inputs[2] = {...inputs[2], oldData: oldData.status}


    return (
        <div className="new">
            <div className="newContainer">
                <div className="top">
                    <h1>{formTitle}</h1>
                </div>
                <div className="bottom">
                   
                    <div className="right">
                        <form>
                           

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

export default UpdateRequestComp
