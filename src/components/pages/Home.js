import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const Home = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []); 
 
  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3030/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    const confirm = window.confirm("Would you like to delete ?");
    if(confirm) {   
      await axios.delete(`http://localhost:3030/users/${id}`)
      .then(res => loadUsers())
      .catch(err => console.log(err));
      //loadUsers();
    }
  };

  return (
    <div className="container">
      <h2 className="mt-4 d-inline-block">TC Upload Page</h2>
      <Link className="btn btn-outline-success float-right mt-4" to="/users/add-tc">Add TC's</Link>
      <div className="py-4">
        <table className="table border shadow table-hover">
          <thead className="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">Name</th>
              <th scope="col">User Name</th>
              <th scope="col">Email</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody >
            {users.map((user, index) => (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                  <Link
                    class="btn btn-outline-primary mr-2" to={`/users/edit/${user.id}`}>
                    Edit
                  </Link>
                  <Link
                    class="btn btn-danger"onClick={() => deleteUser(user.id)}>
                    Delete
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Home;
