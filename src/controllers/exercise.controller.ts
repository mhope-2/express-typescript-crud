const jwt = require('jsonwebtoken')
import express from 'express'
import Controller from '../interfaces/controller.interface'
import ExerciseInterface from '../interfaces/exercise.interface'
import ExerciseModel from '../models/exercise.model'
import HttpException from '../exceptions/http/HttpException'
import ExerciseNotFoundException from '../exceptions/exercise/ExerciseNotFoundException' 
import CreateExerciseDto from '../exercise/exercise.dto'
import validationMiddleware from '../middleware/validation.middleware'
import authMiddleware from '../middleware/auth.middleware';


class ExerciseController implements Controller {
    public path = '/exercises';
    public router = express.Router();
    private exercise = ExerciseModel;
   
    constructor() {
      this.initializeRoutes()
    }


   
    private initializeRoutes() {
      this.router.get(this.path, this.exerciseList);
      this.router.get(`${this.path}/:id`, this.findExerciseById);
      this.router.post(`${this.path}/add`, authMiddleware, validationMiddleware(CreateExerciseDto), this.addExercise);
      this.router.patch(`${this.path}/update/:id`, authMiddleware, this.updateExerciseById);
      this.router.delete(`${this.path}/delete`, authMiddleware, this.deleteExerciseById);
      this.router.post(`${this.path}/logout`, this.loggingOut);
    }
   

    // list all exercises
    private exerciseList = async (req:express.Request, res:express.Response) => {
        await this.exercise.find()
        .then(exercises => res.json(exercises))
        .catch(err => res.status(400).json('Error: ' + err)) 
    } 

   
    // add exercise
    private addExercise = async (req:express.Request, res:express.Response) => {
      const addExerciseData : CreateExerciseDto= req.body
      const newExercise = new this.exercise(addExerciseData)
      
      const saveNewExercise = await newExercise.save()
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

    // logging out
    private loggingOut = (req: express.Request, res: express.Response) => {
        res.setHeader('Set-Cookie', ['Authorization=;Max-age=0']);
        res.json({"Response":"Logged out successfully"});
    }

  // class end
  }

export default ExerciseController
