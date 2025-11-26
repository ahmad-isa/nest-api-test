import { IsEnum, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";
import { randomUUID } from "crypto";
import { Drivetrain } from "../enums/drivetrain.enum";
import { BodyType } from "../enums/bodytype.enum";
export class UpdateCarDto{
    @IsString()
    @IsOptional()
    name: string; 

    @IsString()
    @IsOptional()
    description: string;  

    @IsNumber({}, {message: 'power must be a number'})
    @IsOptional()
    power: number;

    @IsNumber({}, {message: 'torque must be a number'})
    @IsOptional()
    torque: number;

    @IsEnum(Drivetrain)
    @IsOptional()
    drivetrain: Drivetrain;

    @IsEnum(BodyType)
    @IsOptional()
    bodytype: BodyType;

}