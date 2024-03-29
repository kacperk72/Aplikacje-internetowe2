import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [doctors, setDoctors] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchDoctors = async (query = "") => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/doctors" +
          (query ? "/search?query=" + query : "")
      );
      setDoctors(response.data);
    } catch (error) {
      console.error("Error fetching doctors:", error);
    }
  };

  useEffect(() => {
    fetchDoctors();
  }, []);

  useEffect(() => {
    fetchDoctors(searchQuery);
  }, [searchQuery]);

  return (
    <div className="container">
      <h2 className="title_page">Lista lekarzy:</h2>
      <div>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          placeholder="Wyszukaj lekarza"
          className="searchDoctor"
        />
        {doctors.map((doctor: any) => (
          <div key={doctor.user_id} className="card">
            <Link to={`../doctor/${doctor.user_id}`}>
              <h2>
                {doctor.name} {doctor.surname}
              </h2>
            </Link>
            <p>
              <strong>Specjalność:</strong> {doctor.speciality}
            </p>
            <p>
              <strong>Lokalizacja:</strong> {doctor.localization}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HomePage;
