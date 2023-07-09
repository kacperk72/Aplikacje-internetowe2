import React, { useState } from 'react';
import axios from 'axios';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [isDoctor, setIsDoctor] = useState(false);

  const handleSubmit = async (event: any) => {
    event.preventDefault();
    try {
      const response = await axios.post('http://localhost:3000/register', {
        username,
        password,
        name,
        surname,
        isDoctor
      });
      alert(response.data);
      window.location.reload();
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className='registerForm'>
    <form onSubmit={handleSubmit}>
      <h1>Rejestracja</h1>
      <input
        type="text"
        placeholder="Imie"
        value={name}
        onChange={e => setName(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Nazwisko"
        value={surname}
        onChange={e => setSurname(e.target.value)}
        required
      />
      <input
        type="text"
        placeholder="Login"
        value={username}
        onChange={e => setUsername(e.target.value)}
        required
      />
      <input
        type="password"
        placeholder="Hasło"
        value={password}
        onChange={e => setPassword(e.target.value)}
        required
      />
      <label>
        <input
          type="checkbox"
          checked={isDoctor}
          className='checkboxInput'
          onChange={e => setIsDoctor(e.target.checked)}
        />
        Jesteś lekarzem?
      </label>
      <br></br>
      <button type="submit" className='registerButton'>Register</button>
    </form>
    </div>
  );
}

export default Register;
