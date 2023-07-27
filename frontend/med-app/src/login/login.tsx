import React, { useState } from "react";
import axios from "axios";
import Cookies from "js-cookie";

function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      const res = await axios.post("http://localhost:3000/login", {
        username,
        password,
      });

      Cookies.set("user", JSON.stringify(res.data.user));
      alert("Zalogowano prawidłowo");
      window.location.replace("/home");
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        alert("Zły login lub hasło, spróbuj ponownie");
      } else {
        console.error(error);
      }
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h1 className="title_page">Logowanie</h1>
      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        required
      />
      <button type="submit" className="loginButton">
        Zaloguj
      </button>
    </form>
  );
}

export default Login;
