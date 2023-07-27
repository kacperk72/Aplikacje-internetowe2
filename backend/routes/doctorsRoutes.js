const express = require("express");
const doctorsController = require("../controllers/doctorsController");
const router = express.Router();

router.get("/doctors", doctorsController.getDoctors);
router.get("/doctor/:id", doctorsController.getDoctorById);
router.get("/doctors/search", doctorsController.searchDoctors);
router.get("/reviews/:doctorId", doctorsController.getDoctorReviews);
router.get("/reviewsByUser/:userId", doctorsController.getReviewsByUser);
router.post("/reviews", doctorsController.submitReview);

module.exports = router;
