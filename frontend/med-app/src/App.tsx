import './App.css'
import { BrowserRouter as Router, Route, Link, Routes } from 'react-router-dom';
import Login from './login/login';
import Register from './register/register';

function App() {
  return (
    <>
      <div>
        <h1>AI projekt2</h1>
        <Router>
          <div>
            <nav className="nav">
              <Link to="/login">Login</Link>
              <Link to="/register">Register</Link>
            </nav>

            <Routes>
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
            </Routes>
          </div>
        </Router>
      </div>
    </>
  )
}

export default App
