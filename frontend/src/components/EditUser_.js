/* eslint-disable react-hooks/exhaustive-deps */
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import axios from "axios";

const EditUser = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [nama, setNama] = useState("");
  const [gambar, setGambar] = useState("");
  const history = useHistory();
  const { id } = useParams();

  // const updateUser = async (e) => {
  //   e.preventDefault();
  //   await axios.patch(`http://localhost:8080/users/${id}`, {
  //     username: username,
  //     password: password,
  //     nama: nama,
  //     gambar: gambar,
  //   });
  //   history.push("/users");
  // };

  async function updateUser() {
    const formData = new FormData();
    formData.append("username", username);
    formData.append("password", password);
    formData.append("nama", nama);
    formData.append("gambar", gambar);

    axios
      .patch(`http://localhost:8080/users/${id}`, formData)
      .then((res) => {
        alert("File Upload success");
      })
      .catch((err) => alert("File Upload Error"));
    history.push("/users");
  }

  useEffect(() => {
    getUserById();
  }, []);

  const getUserById = async () => {
    const response = await axios.get(`http://localhost:8080/users/${id}`);
    setUsername(response.data.username);
    setPassword(response.data.password);
    setNama(response.data.nama);
    setGambar(response.data.gambar);
  };

  return (
    <div>
      <form encType="multipart/form-data" onSubmit={updateUser}>
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
            onChange={(e) => setNama(e.target.value)}
            placeholder="Nama"
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
          <button className="button is-primary">Update</button>
        </div>
      </form>
    </div>
  );
};

export default EditUser;
