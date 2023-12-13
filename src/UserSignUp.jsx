import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios'


const UserSignUp = () => {
  const navigate = useNavigate();
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  }); 


  const handleOnChange = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };
  // console.log("loginData", loginData);
 

  const handleOnSubmit = (e) => {
    e.preventDefault();

    axios
      .post("http://localhost:5000/api/users/signin", {
        email: loginData.email,
        password: loginData.password,
      })
      .then(function (response) {
         alert(response.data.message);
        console.log("response", response);
        localStorage.setItem("token",response.data.token)
        navigate("/");
      })
      .catch(function (error) {
        alert(error.response.data.message);
        console.log(error);
      });
  }

  return (
    <div className="container">
      <div className="d-flex justify-content-center align-items-center vh-100">
        <div className="card">
          <div className="card-body mb-3">
            <h1 className="text-center mb-4">Login</h1>
            <form onSubmit={handleOnSubmit}>
              <div className="mb-3">
                <label htmlFor="email" className="form-label">
                  Email
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  name="email"
                  onChange={handleOnChange}
                  required
                />
              </div>
              <div className="mb-3">
                <label htmlFor="password" className="form-label">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  name="password"
                  onChange={handleOnChange}
                  required
                />
              </div>

              <button type="submit" className="btn btn-primary w-100 text-center">
                Login
              </button>
              <div className="mt-3">
                <p className="text-decoration-none">
                  Not a member ? <Link to="/create-user">Click here</Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserSignUp;
