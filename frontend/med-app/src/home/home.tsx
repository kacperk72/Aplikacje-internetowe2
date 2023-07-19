import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './home.css';
import {Link} from "react-router-dom";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/doctors');
        console.log(response.data)
        setDoctors(response.data);
      } catch (error) {
        console.error('Error fetching doctors:', error);
      }
    };

    fetchDoctors();
  }, []);

  return (
      <div className="container">
        <h1 className="title">Strona główna</h1>
        <div>
          {doctors.map((doctor: any) => (
              <div key={doctor.user_id} className="doctor-card">
                <Link to={`../doctor/${doctor.user_id}`}>
                  <h2>{doctor.name} {doctor.surname}</h2>
                </Link>
                <p><strong>Specjalność:</strong> {doctor.speciality}</p>
                <p><strong>Lokalizacja:</strong> {doctor.localization}</p>
              </div>
          ))}
        </div>
      </div>
  );
};

export default HomePage;
