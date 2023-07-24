import React, { useState, useEffect } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import ReactStars from "react-rating-stars-component";

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
    <div className="container">
      <h1 className="title_page">Profil użytkownika</h1>
      <h2>{user.isDoctor ? 'Lekarz' : 'Pacjent'} {user.name} {user.surname}</h2>
        <br/>
      <h2>Wystawione opinie:</h2>
      {reviews.length > 0 ? (
          reviews.map((review: any) => (
              <div key={review.id} className="card">
                  <div className="review-header">
                      <h3>{review.doctor_name} {review.doctor_surname}</h3>
                      <ReactStars
                          count={5}
                          size={24}
                          half={true}
                          value={review.mark}
                          emptyIcon={<i className="far fa-star"></i>}
                          halfIcon={<i className="fa fa-star-half-alt"></i>}
                          fullIcon={<i className="fa fa-star"></i>}
                          activeColor="#ffd700"
                          edit={false}
                      />
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
