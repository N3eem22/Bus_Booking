import React, { useState, useRef } from "react";
import "../Styles/Register.css";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const RegestrationPage = () => {
  const [errors, setError] = useState(null);
  const [data, setData] = useState([]);
  const navigate = useNavigate();
  const regestrationForm = useRef([]);

  function regester(event) {
 
    event.preventDefault();
    const user = {
      email: regestrationForm.current[0].value,
      password: regestrationForm.current[1].value,
      phone: regestrationForm.current[2].value,
    };
    axios
      .post("http://localhost:4000/auth/register", user)
      .then((response) => {
        console.log("registration response", response.data);
        if (response.status === 200) {
          navigate("/LoginPage");
        }
      })
      .catch((error) => {
        setError(error.response.data);
        console.log("registration failed", error.response.data);
      });

      console.log(errors);
  }

  return (
    <>
   { errors && <div className="error-message">{errors["errors"][0].msg}</div>}

      <div className="regetrationContainer">
        <span className="border-line">
          <h1>Registration</h1>
          <form action="ProductList" onSubmit={regester}>
            <div>
              <div>
                <label htmlFor="Email">Email</label>
                <div className="input-box">
                  <input
                    id="Email"
                    type={"email"}
                    required
                    ref={(ref) => {
                      regestrationForm.current[0] = ref;
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="Password">Password</label>
                <div className="input-box">
                  <input
                    id="Password"
                    type={"password"}
                    required
                    ref={(ref) => {
                      regestrationForm.current[1] = ref;
                    }}
                  />
                </div>
              </div>
              <div>
                <label htmlFor="phone">Phone number</label>
                <div className="input-box">
                  <input
                    id="Phone"
                    type={"tel"}
                    required
                    ref={(ref) => {
                      regestrationForm.current[2] = ref;
                    }}
                  />
                </div>
              </div>
              <button>Register</button>
              <h3>
                already have an account?{" "}
                <Link to={"/LoginPage"}>Login </Link>
              </h3>
            </div>
          </form>
        </span>
      </div>
    </>
  );
};

export default RegestrationPage;