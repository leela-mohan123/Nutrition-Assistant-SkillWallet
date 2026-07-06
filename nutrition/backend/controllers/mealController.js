const Meal = require('../models/Meal');

const getMeals = async (req, res) => {
  try {
    const meals = await Meal.find({ userId: req.user.id }).sort({ date: -1 });
    res.json(meals);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const addMeal = async (req, res) => {
  try {
    const { date, meals } = req.body;
    const newMeal = await Meal.create({
      userId: req.user.id,
      date,
      meals
    });
    res.status(201).json(newMeal);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

const deleteMeal = async (req, res) => {
  try {
    const meal = await Meal.findById(req.params.id);
    if (!meal) {
      return res.status(404).json({ message: 'Meal not found' });
    }
    if (meal.userId.toString() !== req.user.id) {
      return res.status(401).json({ message: 'User not authorized' });
    }
    await meal.deleteOne();
    res.json({ id: req.params.id });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { getMeals, addMeal, deleteMeal };
