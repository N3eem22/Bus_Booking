import { useState } from "react";
import "../styling/AddForm.css";

const AddUser = ({ inputs, title }) => {
  const [traveler, setTraveler] = useState({
    email: " ",
    phone: " ",
    status: " ",
    type: " ",
    password: "",
  });
  const handleSubmit = (event) => {
    event.preventDefault();
    // Handle form submission here
    console.log(traveler);
  };

  return (
    <div className="new">
      <div className="newContainer">
        <div className="top">
          <h1>{title}</h1>
        </div>
        <div className="bottom">
          <div className="right">
            <form action="ProductList" onSubmit={handleSubmit}>
              {inputs.map((input) => (
                <div className="formInput" key={input.id}>
                  <label>{input.label}</label>
                  <input
                    required
                    type={input.type}
                    placeholder={input.placeholder}
                    value={traveler[input.label]}
                    onChange={(event) => {
                      setTraveler({
                        ...traveler,
                        [input.label]: event.target.value,
                      });
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
};

export default AddUser;
