import axios from "axios";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

export default function CreateUser() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    lastname: "",
    email: "",
    pwd: "",
    city: "",
    age: "",
    hobbies: "",
    mobile: "",
    address: "",
  });

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.pwd || !formData.mobile) {
    alert("Please fill in all required fields are (name, email, password).");
    return;
  }

    axios
      .post("http://localhost:5000/api/users", {
        name: formData.name,
        lastname: formData.lastname,
        email: formData.email,
        password: formData.pwd,
        city: formData.city,
        age: formData.age,
        hobbies: formData.hobbies,
        mobile: formData.mobile,
        address: formData.address,
      })
      .then(function (response) {
        console.log("🚀 ~ file: CreateUser.jsx:37 ~ response:", response);

        if (response.data.message) {          
            alert(response.data.message);
            navigate("/");        
        }
      })
      .catch(function (error) {
        console.log({ error });
      });
  };

  const handleNameChange = (event) => {
    setFormData({
      ...formData,
      [event.target.name]: event.target.value,
    });
  };

  return (
    <div>
      <header>
        <h1 className="container p-5 my-5 bg-primary text-white text-center rounded-4">
          Create User
        </h1>
      </header>
      <section className="float-end me-4 mb-2">
        <Link to="/" className="btn btn-secondary btn-sm">
          Back
        </Link>
      </section>
      <div className="container mt-3">
        <form onSubmit={handleOnSubmit} className="needs-validation">
          <fieldset className="container p-5 my-5 bg-dark text-white rounded-4">
            <div className="mb-3 mt-3">
              <label htmlFor="name" className="form-label">
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                name="name"
                onChange={handleNameChange}
                value={formData.name}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="lastname" className="form-label">
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Enter Last Name"
                name="lastname"
                onChange={handleNameChange}
                value={formData.lastname}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="email" className="form-label">
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                value={formData.email}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="pwd" className="form-label">
                Password:
              </label>
              <input
                type="password"
                className="form-control"
                id="pwd"
                placeholder="Enter password"
                name="pwd"
                value={formData.pwd}
                onChange={handleNameChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="address" className="form-label">
                Address:
              </label>
              <textarea
                className="form-control"
                rows="5"
                id="address"
                placeholder="Enter Address"
                name="address"
                onChange={handleNameChange}
                defaultValue={formData.address}
              ></textarea>
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="city" className="form-label">
                City:
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter City"
                name="city"
                onChange={handleNameChange}
                value={formData.city}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="hobbies" className="form-label">
                Hobbies:
              </label>
              <input
                type="text"
                className="form-control"
                id="hobbies"
                placeholder="Enter Hobbies"
                name="hobbies"
                onChange={handleNameChange}
                value={formData.hobbies}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="age" className="form-label">
                Age:
              </label>
              <input
                type="text"
                className="form-control"
                id="age"
                placeholder="Enter Age"
                name="age"
                onChange={handleNameChange}
                value={formData.age}
              />
            </div>
            <div className="mb-3 mt-3">
              <label htmlFor="mobile-no" className="form-label">
                Mobile No.:
              </label>
              <input
                type="tel"
                className="form-control"
                id="mobile-no"
                onChange={handleNameChange}
                placeholder="Enter Mobile No."
                name="mobile"
                value={formData.mobile}
              />
            </div>
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </fieldset>
        </form>
      </div>
      <footer>
        <div>
          <p>footer</p>
        </div>
      </footer>
    </div>
  );
}
