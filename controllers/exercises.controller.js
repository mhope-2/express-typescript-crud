const Exercise = require("../models/exercise.model");

// list all exercises
exports.exerciseList = async (req, res) => {
    await Exercise.find()
      .then(exercises => res.json(exercises))
      .catch(err => res.status(400).json('Error: ' + err))
} 


// add exercise
exports.addExercise = async (req, res) => {

  const username = req.body.username;
  const description = req.body.description;
  const duration = Number(req.body.duration);
  const date = Date.parse(req.body.date);

  // add new exercise
  const newExercise = new Exercise({
    username,
    description,
    duration,
    date
  })

  newExercise.save()
  .then(() => res.json({"Response":`Exercise ${description} added for ${username}`}))
  .catch(err => res.status(400).json('Error: ' + err));

}

// Get Exercise Info by Id
  exports.findExerciseById = async (req, res) => {

    Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));

  }

  // Delete by id
  exports.deleteExerciseById = async (req, res) => {
      Exercise.findByIdAndDelete(req.params.id)
        .then(() => res.json(`Exercise with id ${req.params.id} deleted.`))
        .catch(err => res.status(400).json('Error: ' + err));
    }

  // Update Exercide
  exports.updateExerciseById = async (req, res) => {

      Exercise.findById(req.params.id)
      .then(exercise => {
        exercise.username = req.body.username;
        exercise.description = req.body.description;
        exercise.duration = Number(req.body.duration);
        exercise.date = Date.parse(req.body.date);

        exercise.save()
        .then(() => res.json({"Response":`Exercise ${req.params.id} updated`}))
        .catch(err => res.status(400).json('Error: ' + err));
        
      })
      .catch(err => res.status(400).json('Error: ' + err));

  }



