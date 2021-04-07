import * as mongoose from 'mongoose'
import ExerciseInterface from '../interfaces/exercise.interface';

const ExerciseSchema = new mongoose.Schema({

    username:{type: String, required: true},
    description: {type: String, required: true},
    duration: {type: Number, required:true},
    date: {type: Date, required: true}
},
{timestamps:true})


const ExerciseModel = mongoose.model<ExerciseInterface & mongoose.Document>('Exercise',ExerciseSchema);
 
export default ExerciseModel