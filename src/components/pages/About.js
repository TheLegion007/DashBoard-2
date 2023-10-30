import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const About = () => {
  const [users, setUser] = useState([]);

  useEffect(() => {
    loadUsers();
  }, []); 

  const loadUsers = async () => {
    const result = await axios.get("http://localhost:3030/users");
    setUser(result.data.reverse());
  };

  const deleteUser = async id => {
    await axios.delete(`http://localhost:3030/users/${id}`);
    loadUsers();
  };
  
  return (
    <div className="container">
      <h2 className="mt-4">TC Download/View Page</h2>
      <div className="py-4">
        <table class="table border shadow">
          <thead class="thead-dark">
            <tr>
              <th scope="col">#</th>
              <th scope="col">First</th>
              <th scope="col">Last</th>
              <th scope="col">Handle</th>
              <th >Action</th>
            </tr>
          </thead>
          <tbody>
            {
              users.map((user,index) => (
               <tr>
                <th scope="row">{index+1}</th>
                <td>{user.name}</td>
                <td>{user.username}</td>
                <td>{user.email}</td>
                <td>
                  <Link class="btn btn-primary mr-2" to={`/users/${user.id}`}>
                    View
                  </Link>
                </td>
               </tr> 
              ))
            }
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default About;
