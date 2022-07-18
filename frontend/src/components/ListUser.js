/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const ListUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    const users = await axios.get("http://localhost:8080/users");
    setUsers(users.data);
    console.log(users);
  };

  const deleteUser = async (id) => {
    await axios.delete(`http://localhost:8080/users/${id}`);
    getUsers();
  };

  return (
    <div>
      <Link to="/users/add" className="button is-primary mt-5">
        Add New
      </Link>
      <table className="table is-striped is-fullwidth">
        <thead>
          <tr>
            <th>No</th>
            <th>Username</th>
            <th>Password</th>
            <th>Nama</th>
            <th>Gambar</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user, index) => (
            <tr key={user.id}>
              <td>{index + 1}</td>
              <td>{user.username}</td>
              <td>{user.password}</td>
              <td>{user.nama}</td>
              <td>
                <img
                  src={"http://localhost:8080/img/" + user.gambar}
                  width={60}
                  alt="Player"
                />
              </td>
              <td>
                <Link
                  to={`/users/edit/${user.id}`}
                  className="button is-small is-info"
                >
                  Edit
                </Link>
                <button
                  onClick={() => deleteUser(user.id)}
                  className="button is-small is-danger"
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ListUsers;
