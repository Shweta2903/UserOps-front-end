import React, { useState, useEffect, Fragment } from "react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

export default function UserList() {
  const navigate = useNavigate();

  const [searchTerm, setSearchTerm] = useState("");
  const [users, setUsers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [perPage, setPerPage] = useState(10);
  const [sortBy, setSortBy] = useState("createdAt");
  const [sortOrder, setSortOrder] = useState("desc");

  // const perPage = 10;

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      navigate("/signin");
    } else {
      getAllUsers();
    }
  }, [currentPage, perPage, sortBy, sortOrder]);

  //pagination
  const getAllUsers = async () => {
    await axios
      .get(`http://localhost:5000/api/users`, {
        params: {
          searchData: searchTerm,
          currentPage: currentPage,
          perPage: perPage,
          sortBy: sortBy,
          sortOrder: sortOrder,
        },
      })
      .then(function (response) {
        if (response.data.data.users) {
          setUsers(response.data.data.users);
          setTotalPages(response.data.data.totalPages);
        }
      })
      .catch(function (error) {
        console.log({ error });
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

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/signin");
  };

  const handlePerPageChange = (event) => {
    const selectedValue = event.target.value;
    setPerPage(Number(selectedValue));
  };

  const handleSortByChange = (event) => {
    setSortBy(event.target.value);
  };

  const handleSortOrderChange = (event) => {
    setSortOrder(event.target.value);
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark bg-secondary">
        <div className="container-fluid">
          <ul className="navbar-nav fs-5">
            <li className="nav-item">
              <a className="nav-link active" aria-current="page" href="#">
                Home
              </a>
            </li>
          </ul>
          <ul className="navbar-nav d-flex">
            <section className="rounded-pill ps-3 border border-secondary bg-secondary bg-light">
              <i
                className="bi bi-search mt-2"
                style={{
                  marginRight: "8px",
                  fontSize: "1.3em",
                }}
              ></i>
              <input
                type="text"
                placeholder="Search..."
                value={searchTerm}
                className="border border-light py-2 ps-3 w-60px bg-light rounded-pill"
                onChange={handleSearchChange}
              />
            </section>
            <button className="me-3 btn btn-secondary btn-sm fs-6" onClick={handleSearchSubmit}>
              Search
            </button>
            <li className="nav-item">
              <i
                className="bi bi-box-arrow-right "
                style={{
                  fontSize: "1.8em",
                }}
                onClick={handleLogout}
              ></i>
            </li>
          </ul>
        </div>
      </nav>
      <header>
        <h1 className="container-xxl p-5 my-4 bg-dark text-white text-center">Users List</h1>
      </header>

      <label htmlFor="sortCriteria">Sort By:</label>
      <select id="sortCriteria" name="sortCriteria" value={sortBy} onChange={handleSortByChange}>
        <option value="createdAt">Queue</option>
        <option value="name">Name</option>
      </select>
      <label htmlFor="sortOrder">Sort Order:</label>
      <select id="sortOrder" name="sortOrder" value={sortOrder} onChange={handleSortOrderChange}>
        <option value="asc">Asc</option>
        <option value="desc">Desc</option>
      </select>
      <label htmlFor="perPage">Per Page:</label>
      <select id="perPage" name="perPage" value={perPage} onChange={handlePerPageChange}>
        <option value="10">10</option>
        <option value="20">20</option>
        <option value="50">50</option>
      </select>

      <section className="float-end me-4 mb-2cm">
        <Link to="/create-user" className="me-2 btn btn-secondary btn-sm">
          Create User
        </Link>

        {/* <button className="btn btn-secondary btn-sm">LOGOUT</button> */}
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
                    <td>{`${ele.name} ${ele.lastname}`}</td>
                    <td>{ele.email}</td>
                    <td>{`${ele.address}, ${ele.city}`}</td>
                    <td>{ele.mobile}</td>
                    <td>{ele.hobbies}</td>
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
              <button className="page-link" onClick={() => handlePageChange(currentPage - 1)}>
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
              <button className="page-link" onClick={() => handlePageChange(currentPage + 1)}>
                Next Page
              </button>
            </li>
          </ul>
        </section>
      </section>
    </div>
  );
}
