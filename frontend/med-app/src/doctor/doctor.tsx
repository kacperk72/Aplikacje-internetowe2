import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './doctor.css';

const Doctor = () => {
    const { id } = useParams();
    const [doctor, setDoctor] = useState(null);
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        const fetchDoctor = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/doctor/${id}`);
                setDoctor(response.data);
            } catch (error) {
                console.error('Error fetching doctor:', error);
            }
        };

        const fetchReviews = async () => {
            try {
                const response = await axios.get(`http://localhost:3000/api/reviews/${id}`);
                setReviews(response.data);
            } catch (error) {
                console.error('Error fetching reviews:', error);
            }
        };

        fetchDoctor();
        fetchReviews();
    }, [id]);

    if (!doctor) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <h1>{doctor.name} {doctor.surname}</h1>
            <p><strong>Specjalność:</strong> {doctor.speciality}</p>
            <p><strong>Lokalizacja:</strong> {doctor.localization}</p>
            <p><strong>Ocena:</strong> {doctor.avg_mark}</p>
            <h2>Opinie:</h2>
            {reviews.map((review) => (
                <div key={review.id} className="review-card">
                    <div className="review-header">
                        <h3>{review.author_name} {review.author_surname}</h3>
                        <span className="review-mark">Ocena: {review.mark}</span>
                    </div>
                    <p>{review.comment}</p>
                </div>
            ))}
        </div>
    );
};

export default Doctor;
