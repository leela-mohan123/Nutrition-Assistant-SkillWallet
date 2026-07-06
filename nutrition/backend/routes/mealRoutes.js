const express = require('express');
const router = express.Router();
const { getMeals, addMeal, deleteMeal } = require('../controllers/mealController');
const { protect } = require('../middleware/authMiddleware');

router.route('/').get(protect, getMeals).post(protect, addMeal);
router.route('/:id').delete(protect, deleteMeal);

module.exports = router;
