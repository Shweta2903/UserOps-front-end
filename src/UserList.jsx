import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const perPage = 6;

  useEffect(() => {
    getAllUsers();
  }, [currentPage]);

  const getAllUsers = () => {
    axios
      .get(`http://localhost:5000/api/users?currentPage=${currentPage}&perPage=${perPage}`, {
        params: {
          searchData: searchTerm,
        },
      })
      .then(function (response) {
        console.log(response.data.totalPages);
        if (response.data.users) {
          setUsers(response.data.users);
          setTotalPages(response.data.totalPages);
        }
      })
      .catch(function (error) {
        console.log({ error });
      })
      .finally(function () {
        // always executed
      });
  };

  const handleDeleteUser = (userID) => {
    if (window.confirm(`Are you sure !!! \nYou want to delete.`)) {
      axios
        .delete("http://localhost:5000/api/users/delete/" + userID)
        .then((response) => {
          alert("Deleted");
          getAllUsers();
        })
        .catch(function (error) {
          console.log({ error });
        });
    } else {
    }
  };

  const handleSearchChange = (e) => {
    const newSearchTerm = e.target.value;
    setSearchTerm(newSearchTerm);
    if (newSearchTerm.length === 0) {
      getAllUsers();
    }
  };

  const handleSearchSubmit = () => {
    getAllUsers();
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  return (
    <div>
      <header>
        <h1 className="container-xxl p-5 my-4 bg-dark text-white text-center">UserList</h1>
      </header>
      <i
        className="bi bi-search"
        style={{
          marginRight: "8px",
          fontSize: "1.3em",
        }}
      ></i>
      <input
        type="search"
        placeholder="Search..."
        className="me-2"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      <button className="btn btn-secondary btn-sm" onClick={handleSearchSubmit}>
        Search
      </button>
      <section className="float-end me-4 mb-2">
        <Link to="/create-user" className="btn btn-secondary btn-sm">
          Create User
        </Link>
      </section>
      <section>
        <table className="table table-hover table-striped table-bordered">
          <thead>
            <tr className="text-center">
              <th className="col-sm-1">Sr No</th>
              <th className="col-sm-1">Name</th>
              <th className="col-sm-2">Email</th>
              <th className="col-sm-2">Address</th>
              <th className="col-sm-2">Mobile</th>
              <th className="col-sm-2">Hobbies</th>
              <th className="col-sm-2">Action</th>
            </tr>
          </thead>
          <tbody className="text-center">
            {users && users.length > 0 ? (
              users.map((ele, i) => (
                <Fragment key={i}>
                  {/* {console.log(ele)} */}
                  <tr>
                    <td>{(currentPage - 1) * perPage + i + 1}</td>
                    <td>{ele.name}</td>
                    <td>{ele.email}</td>
                    <td>{ele.userDetails[0].address}</td>
                    <td>{ele.userDetails[0].mobile_no}</td>
                    <td>{ele.userDetails[0].hobbies}</td>
                    <td>
                      <i
                        className="bi bi-pencil-square me-5"
                        style={{
                          fontSize: "1.5em",
                        }}
                        onClick={() => navigate(`/${ele._id}`)}
                      ></i>
                      <i
                        className="bi bi-trash3-fill"
                        style={{
                          fontSize: "1.5em",
                        }}
                        onClick={() => handleDeleteUser(ele._id)}
                      ></i>
                    </td>
                  </tr>
                </Fragment>
              ))
            ) : (
              <tr aria-colspan={5}>No data Found</tr>
            )}
          </tbody>
        </table>
        <section className="float-end">
          <ul className="pagination justify-content-center">
            <li
              className={`page-item ${currentPage === 1 && "disabled"}`}
              style={{ height: "100px", width: "130px" }}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage - 1)}
              >
                Previous Page
              </button>
            </li>
            <li className="page-item" style={{ height: "100px", width: "120px" }}>
              <span className="page-link">{`Page ${currentPage} of ${totalPages}`}</span>
            </li>
            <li
              className={`page-item ${currentPage === totalPages && "disabled"}`}
              style={{ height: "100px", width: "180px" }}
            >
              <button
                className="page-link"
                onClick={() => handlePageChange(currentPage + 1)}
              >
                Next Page
              </button>
            </li>
          </ul>
        </section>
      </section>
    </div>
  );
}
