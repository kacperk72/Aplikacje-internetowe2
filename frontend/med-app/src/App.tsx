import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';
import HomePage from './home/home';
import logo from '././assets/medapp-logo.png';
import UserPage from './user/user';

function App() {
  return (
    <>
      <div>
        <img src={logo} className="app-logo" alt="logo" />
        <h1>Med App</h1>
        <Router>
          <div>
            <nav className="nav">
              <Link to="/home">Strona główna</Link>
              <Link to="/login">Zaloguj</Link>
              <Link to="/register">Zarejestruj</Link>
              <Link to="/doctor">Moje opinie</Link>
              <Link to="/user">Użytkownik</Link>
              <Link to="">Wyloguj</Link>
            </nav>

            <Routes>
              <Route path="/home" element={<HomePage />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/doctor" element={<Register />} />
              <Route path="/user" element={<UserPage />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App
