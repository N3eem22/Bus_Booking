import React from "react";
import "../Styles/Login.css";
//import image from "../images/Futuristic Circuit Board Background.jpg";
import { react, useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";


const LoginPage = ({onLogin}) => {
  
  
 
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Set initial state to false

  function handleLogin() {
    setIsLoggedIn(true); // Update state to true upon successful login\n  }
  }
    //Login fun to make the page dousn't reload
  function Login(event, userInfo) {
    event.preventDefault();
    console.log(userInfo);
   if (userInfo.Username === "admin" && userInfo.Password === "12345") {
    onLogin(); // Update parent component state
    navigate("/ManageAppointments");
    } else {
      handleLogin(); // Update local state
      validateUser(userInfo);
      
    }
  }
  
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({
    email: "",
    Password: "",
  });
  const validateUser = (test) => {
    return navigate("/");
  };



  return (<>
    <div className="regetrationContainer">
      <span className="border-line">
        <h1>Login</h1>
        <form
          action="ProductList"
          onSubmit={(e) => {
            Login(e, userInfo);
            
          }}
        >
          <div>
            <label htmlFor="email">Email</label>
            <div className="input-box">
              <input
                id="email"
                type={"email"}
                value={userInfo.email}
                required
                onChange={(event) => {
                  setUserInfo({ ...userInfo, email: event.target.value });
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
                value={userInfo.Password}
                required
                onChange={(event) => {
                  setUserInfo({ ...userInfo, Password: event.target.value });
                }}
              />
            </div>
          </div>

          <button>Login</button>
          <h3>
            Don't have an account? <Link to={"/Register"}>Register </Link>
          </h3>
        </form>
      </span>
    </div>
    </>
  );
};

export default LoginPage;
