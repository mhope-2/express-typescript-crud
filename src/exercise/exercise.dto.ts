import { IsString } from 'class-validator';
 
class CreateExerciseDto {

    public constructor(){}

    @IsString()
    public username: string;
    
    @IsString()
    public description: string
    
    @IsString()
    public duration: string;

    @IsString()
    public date: Date
}
 
export default CreateExerciseDto;