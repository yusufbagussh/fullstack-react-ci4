/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const history = useHistory();
  const { id } = useParams();

  const updateUser = async (e) => {
    e.preventDefault();
    await axios.patch(`http://localhost:8080/users/${id}`, {
      username: username,
      password: password,
      nama: nama,
    });
    history.push("/users");
  };

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:8080/users/${id}`);
    setUsername(response.data.username);
    setPassword(response.data.password);
    setNama(response.data.nama);
  };

  return (
    <div>
      <form onSubmit={updateUser}>
        <div className="field">
          <label className="label">Username</label>
          <input
            type="text"
            className="input"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
          />
        </div>
        <div className="field">
          <label className="label">Password</label>
          <input
            type="password"
            className="input"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <div className="field">
          <label className="label">Nama</label>
          <input
            type="text"
            className="input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama"
          />
        </div>
        <div className="field">
          <button className="button is-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
