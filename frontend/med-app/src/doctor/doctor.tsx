import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ReactStars from "react-rating-stars-component";
import Cookies from "js-cookie";


const user = JSON.parse(Cookies.get('user') || '{}');

const ReviewForm = ({ doctorId }) => {
    const [rating, setRating] = useState(3);
    const [comment, setComment] = useState('');

    const handleRatingChange = (newRating) => {
        setRating(newRating);
    };

    const handleCommentChange = (event) => {
        setComment(event.target.value);
    };

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await axios.post(`http://localhost:3000/api/reviews`, {
                userId: user.id,
                doctorId: doctorId,
                mark: rating,
                comment: comment,
            });
            setRating(3);
            setComment('');
            alert('Review submitted successfully');
            window.location.reload();
        } catch (error) {
            console.error('Error submitting review:', error);
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <h2>Wystaw opinię:</h2>
            <ReactStars
                count={5}
                onChange={handleRatingChange}
                size={24}
                half={true}
                value={rating}
                emptyIcon={<i className="far fa-star"></i>}
                halfIcon={<i className="fa fa-star-half-alt"></i>}
                fullIcon={<i className="fa fa-star"></i>}
                activeColor="#ffd700"
            />
            <textarea className="review-comment" value={comment} onChange={handleCommentChange} rows={5} style={{width: '100%'}}/>
            <button type="submit">Submit</button>
        </form>
    );
};


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
            <h1 className="title_page">{doctor.name} {doctor.surname}</h1>
            <p><strong>Specjalność:</strong> {doctor.speciality}</p>
            <p><strong>Lokalizacja:</strong> {doctor.localization}</p>
            <p><strong>Ocena:</strong> {doctor.avg_mark}</p>
            { user.id && (user.id != doctor.user_id) ? <ReviewForm doctorId={doctor.user_id} /> : null }
            <div className="container">
                <br/>
                <h2>Opinie:</h2>
                {reviews.map((review) => (
                    <div key={review.id} className="card">
                        <div className="review-header">
                            <h3>{review.author_name} {review.author_surname}</h3>
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
                        <p className="review-comment">{review.comment}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Doctor;
