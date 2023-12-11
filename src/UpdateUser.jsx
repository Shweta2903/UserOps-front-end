import React, {
  useState,
  useEffect,
} from "react";
import axios from "axios";
import {
  Link,
  useParams,
  useNavigate,
} from "react-router-dom";

export default function UpdateUser() {
  const navigate = useNavigate();
  const { userID } = useParams();

  const [updatedUser, setUpdatedUser] =
    useState();
  // console.log(updtedUser);

  useEffect(() => {
    axios
      .get(
        "http://localhost:5000/api/users/" +
          userID
      )
      .then((response) => {
        console.log(response.data.users[0]);
        if (response.data.users[0]) {
          const userData = {
            name: response.data.users[0].name,
            lastname:
              response.data.users[0].lastname,
            email: response.data.users[0].email,
            city: response.data.users[0]
              .userDetails[0].city,
            age: response.data.users[0]
              .userDetails[0].age,
            hobbies:
              response.data.users[0]
                .userDetails[0].hobbies,
            mobile:
              response.data.users[0]
                .userDetails[0].mobile,
            address:
              response.data.users[0]
                .userDetails[0].address,
          };
          setUpdatedUser(userData);
        }
      })
      .catch((error) => console.log(error));
  }, [userID]);
  console.log(
    "🚀 ~ file: UpdateUser.jsx:44 ~ .then ~ userData:",
    updatedUser
  );

  const handleOnSubmit = (e) => {
    e.preventDefault();
    console.log(e);
    axios
      .put(
        "http://localhost:5000/api/users/" +
          userID,
        {
          name: updatedUser.name,
          lastname: updatedUser.lastname,
          email: updatedUser.email,
          city: updatedUser.city,
          age: updatedUser.age,
          hobbies: updatedUser.hobbies,
          mobile: updatedUser.mobile,
          address: updatedUser.address,
        }
      )
      .then(function (response) {
        console.log(
          "🚀 ~ file: CreateUser.jsx:37 ~ response:",
          response
        );

        if (response.data.message) {
          alert(response.data.message);
          navigate("/");
        }
      })
      .catch(function (error) {
        console.log({ error });
      });
  };

  const handleOnChange = (event) => {
    console.log(
      "🚀 ~ file: UpdateUser.jsx:76 ~ handleOnChange ~ event:",
      event.target.value
    );
    setUpdatedUser({
      ...updatedUser,
      [event.target.name]: event.target.value,
    });
    console.log(updatedUser);
  };

  return (
    <div>
      <header>
        <h1 className="container p-5 my-5 bg-primary text-white text-center rounded-4">
          Update User
        </h1>
      </header>
      <section className="float-end me-4 mb-2">
        <Link
          to="/"
          className="btn btn-secondary btn-sm"
        >
          Back
        </Link>
      </section>
      <div className="container mt-3">
        <form
          className="needs-validation"
          onSubmit={handleOnSubmit}
        >
          <fieldset className="container p-5 my-5 bg-dark text-white rounded-4">
            <div className="mb-3 mt-3">
              <label
                htmlFor="name"
                className="form-label"
              >
                Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="name"
                placeholder="Enter Name"
                name="name"
                value={
                  updatedUser
                    ? updatedUser.name
                    : "-"
                }
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label
                htmlFor="lastname"
                className="form-label"
              >
                Last Name:
              </label>
              <input
                type="text"
                className="form-control"
                id="lastname"
                placeholder="Enter Last Name"
                name="lastname"
                value={
                  updatedUser
                    ? updatedUser.lastname
                    : "-"
                }
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label
                htmlFor="email"
                className="form-label"
              >
                Email:
              </label>
              <input
                type="email"
                className="form-control"
                id="email"
                placeholder="Enter email"
                name="email"
                value={
                  updatedUser
                    ? updatedUser.email
                    : "-"
                }
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label
                htmlFor="address"
                className="form-label"
              >
                Address:
              </label>
              <textarea
                className="form-control"
                rows="5"
                id="address"
                placeholder="Enter Address"
                name="address"
                value={
                  updatedUser
                    ? updatedUser.address
                    : "-"
                }
                onChange={handleOnChange}
              ></textarea>
            </div>
            <div className="mb-3 mt-3">
              <label
                htmlFor="city"
                className="form-label"
              >
                City:
              </label>
              <input
                type="text"
                className="form-control"
                id="city"
                placeholder="Enter City"
                name="city"
                value={
                  updatedUser
                    ? updatedUser.city
                    : "-"
                }
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label
                htmlFor="hobbies"
                className="form-label"
              >
                Hobbies:
              </label>
              <input
                type="text"
                className="form-control"
                id="hobbies"
                placeholder="Enter Hobbies"
                name="hobbies"
                value={
                  updatedUser
                    ? updatedUser.hobbies
                    : "-"
                }
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label
                htmlFor="age"
                className="form-label"
              >
                Age:
              </label>
              <input
                type="text"
                className="form-control"
                id="age"
                placeholder="Enter Age"
                name="age"
                value={
                  updatedUser
                    ? updatedUser.age
                    : "-"
                }
                onChange={handleOnChange}
              />
            </div>
            <div className="mb-3 mt-3">
              <label
                htmlFor="mobile-no"
                className="form-label"
              >
                Mobile No.:
              </label>
              <input
                type="tel"
                className="form-control"
                id="mobile-no"
                placeholder="Enter Mobile No."
                name="mobile"
                value={
                  updatedUser
                    ? updatedUser.mobile_no
                    : "-"
                }
                onChange={handleOnChange}
              />
            </div>
            <button
              type="submit"
              className="btn btn-primary"
            >
              Update
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
