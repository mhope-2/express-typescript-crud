const jwt = require('jsonwebtoken')
import * as express from 'express'
import Controller from '../interfaces/controller.interface'
import ExerciseInterface from '../interfaces/exercise.interface'
import ExerciseModel from '../models/exercise.model'
import HttpException from '../exceptions/HttpException'
import ExerciseNotFoundException from '../exceptions/ExerciseNotFoundException' 



class ExerciseController implements Controller {
    public path = '/exercises';
    public router = express.Router();
    private exercise = ExerciseModel;
   
    constructor() {
      this.initializeRoutes()
    }
   
    private initializeRoutes() {
      this.router.get(this.path, this.exerciseList);
      this.router.post(`${this.path}/add`, this.addExercise);
      this.router.get(`${this.path}/:id`, this.findExerciseById);
      this.router.patch(`${this.path}/update/:id`, this.updateExerciseById);
      this.router.delete(`${this.path}/delete`, this.deleteExerciseById);
    }
   

    // list all exercises
    private exerciseList = async (req:express.Request, res:express.Response) => {
        await this.exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err)) 
    } 

   
    // add exercise
    private addExercise = async (req:express.Request, res:express.Response) => {
      const addExerciseData : ExerciseInterface = req.body
      const newExercise = new this.exercise(addExerciseData)
      
      newExercise.save()
      .then(() => res.json({"Response":`Exercise ${addExerciseData.description} added for ${addExerciseData.username}`}))
      .catch(err => res.status(400).json('Error: ' + err));
  }


  // Get Exercise Info by Id
  private findExerciseById = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

    this.exercise.findById(req.params.id)
    .then(exercise => {
      if (exercise)
        res.json(exercise)
      else {
        next(new HttpException(404, 'Post not found'));
      }
    })
  }


  // Update Exercide
   private updateExerciseById = async (req:express.Request, res:express.Response, next:express.NextFunction) => {

    const id = req.params.id
    const updateExerciseData: ExerciseInterface = req.body

    this.exercise.findByIdAndUpdate(id, updateExerciseData, {new: true})
    .then(exercise => {
      if (exercise)
        res.json({"Response":`Exercise ${id} updated`})
      else{
        next(new ExerciseNotFoundException(id))
      }
    }    

    )}


    // Delete by id
    private deleteExerciseById = async (req:express.Request, res:express.Response, next:express.NextFunction) => {
        const id = req.body.id
        this.exercise.findByIdAndDelete(id)
        .then(successResponse => {
          if (successResponse) {
              res.json({"Response":`Exercise with id ${id} deleted successfully`});
          } else {
            next(new ExerciseNotFoundException(id));
          }
        })
    }

  // class end
  }

export default ExerciseController
