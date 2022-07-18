import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";

const AddUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [gambar, setGambar] = useState("");
  const history = useHistory();

  const saveUser = async (e) => {
    e.preventDefault();
    await axios.post("http://localhost:8080/users", {
      username: username,
      password: password,
      nama: nama,
      gambar: gambar,
    });
    history.push("/users");
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={saveUser}>
        <div className="field">
          <label className="label">Usernama</label>
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
            placeholder="Password..."
          />
        </div>
        <div className="field">
          <label className="label">Nama</label>
          <input
            type="text"
            className="input"
            value={nama}
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama..."
          />
        </div>
        <div className="field">
          <label className="label">Gambar</label>
          <input
            type="file"
            className="input"
            onChange={(e) => setGambar(e.target.files[0])}
          />
        </div>
        <div className="field">
          <button className="button is-primary">Save</button>
        </div>
      </form>
    </div>
  );
};

export default AddUser;
