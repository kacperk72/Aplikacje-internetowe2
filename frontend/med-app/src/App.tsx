import "./App.css";
import { BrowserRouter as Router, Route, Link, Routes } from "react-router-dom";
import Login from "./login/login";
import Register from "./register/register";
import HomePage from "./home/home";
import logo from "././assets/medapp-logo.png";
import UserPage from "./user/user";
import Doctor from "./doctor/doctor";
import Cookies from "js-cookie";

function App() {
  const user = JSON.parse(Cookies.get("user") || "{}");
  const handleLogout = () => {
    Cookies.remove("user");
    window.location.reload();
  };
  return (
    <>
      <div>
        <div className="logo">
          <img src={logo} className="app-logo" alt="logo" />
          <h1>Med App</h1>
        </div>

        <Router>
          <div>
            <nav className="nav">
              <Link to="/home">Strona główna</Link>
              {user.id ? <Link to="/user">Użytkownik</Link> : null}
              {user.id && user.isDoctor ? (
                <Link to={`/doctor/${user.id}`}>Moje opinie</Link>
              ) : null}
              {!user.id ? <Link to="/register">Zarejestruj</Link> : null}
              {!user.id ? <Link to="/login">Zaloguj</Link> : null}
              {user.id ? (
                <Link to="/" onClick={handleLogout}>
                  Wyloguj
                </Link>
              ) : null}
            </nav>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/doctor/:id" element={<Doctor />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  );
}

export default App;
