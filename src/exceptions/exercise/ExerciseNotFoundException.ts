import HttpException from "../http/HttpException";
 
class ExerciseNotFoundException extends HttpException {
  constructor(id: string) {
    super(404, `Exercise with id ${id} not found`);
  }
}
 
export default ExerciseNotFoundException;