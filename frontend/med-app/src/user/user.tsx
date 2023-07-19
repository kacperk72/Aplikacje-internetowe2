import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';

function UserPage() {
  const [reviews, setReviews] = useState([]);
  const user = JSON.parse(Cookies.get('user') || '{}');

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/reviews?userId=${user.id}`);
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

      <h2>Opinie</h2>
      {reviews.length > 0 ? (
        <ul>
          {reviews.map((review: any) => (
            <li key={review.id}>
              <h3>{review.doctorName}</h3>
              <p>{review.comment}</p>
              <p>Ocena: {review.mark}</p>
            </li>
          ))}
        </ul>
      ) : (
        <p>Brak opinii</p>
      )}
    </div>
  );
}

export default UserPage;
