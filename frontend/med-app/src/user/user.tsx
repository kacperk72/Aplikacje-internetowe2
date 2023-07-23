import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import './user.css';

function UserPage() {
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(Cookies.get('user') || '{}');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/reviewsByUser/${user.id}`);
      setReviews(response.data);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div>
      <h1>Profil użytkownika</h1>
      <h2>{user.name} {user.surname}</h2>
      <h3>{user.isDoctor ? 'Lekarz' : 'Pacjent'}</h3>

      <h2>Wystawione opinie:</h2>
      {reviews.length > 0 ? (
          reviews.map((review) => (
              <div key={review.id} className="review-card">
                  <div className="review-header">
                      <h3>{review.doctor_name} {review.doctor_surname}</h3>
                      <span className="review-mark">Ocena: {review.mark}</span>
                  </div>
                  <p>{review.comment}</p>
              </div>
          ))
      ) : (
        <p>Brak opinii</p>
      )}
    </div>
  );
}

export default UserPage;
