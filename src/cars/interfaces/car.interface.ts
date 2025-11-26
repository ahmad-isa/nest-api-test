import { BodyType } from "../enums/bodytype.enum";
import { Drivetrain } from "../enums/drivetrain.enum";

export interface Car{
    id: string;
    name: string;
    power: number;
    torque: number;
    drivetrain: Drivetrain;
    bodytype: BodyType;
    description?: string;
}