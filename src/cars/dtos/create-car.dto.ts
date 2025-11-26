import { IsEnum, IsNotEmpty, IsNumber, IsString } from "class-validator";
import { randomUUID } from "crypto";
import { Drivetrain } from "../enums/drivetrain.enum";
import { BodyType } from "../enums/bodytype.enum";
export class CreateCarDto{
    @IsString()
    @IsNotEmpty()
    name: string; 

    @IsString()
    description: string;  

    @IsNumber({}, {message: 'power must be a number'})
    @IsNotEmpty()
    power: number;

    @IsNumber({}, {message: 'torque must be a number'})
    @IsNotEmpty()
    torque: number;

    @IsEnum(Drivetrain)
    drivetrain: Drivetrain;

    @IsEnum(BodyType)
    bodytype: BodyType;

}