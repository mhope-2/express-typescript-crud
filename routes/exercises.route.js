const express = require('express');
const router = express.Router();
const {exerciseList, addExercise, updateExerciseById, deleteExerciseById, findExerciseById} = require('../controllers/exercises.controller')


router.route('/')
.get(exerciseList)

router.route('/add')
.post(addExercise)

router.route('/:id')
.get(findExerciseById)

router.route('/update/:id')
.post(updateExerciseById)


module.exports = router



