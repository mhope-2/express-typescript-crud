import *  as dotenv from 'dotenv'
import validateEnv from './utils/validateEnv'
import ExerciseController from './controllers/exercise.controller'
import AuthenticationController from './controllers/authentication.controller'
import App from './app'

// get env variables
dotenv.config({
  path:'./src/config/.env'
});

// validate env variables
validateEnv();

// instantiate app class
const app = new App(
  [
    new ExerciseController(),
    new AuthenticationController()
  ],
);

app.listen();
