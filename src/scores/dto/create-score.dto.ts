import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateScoreDto {
    @IsString()
    @IsNotEmpty()
    name: string; 

    @IsNumber({}, {message: 'score must be a number'})
    @IsNotEmpty()
    score: number;
}
