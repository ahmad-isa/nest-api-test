import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import { Document } from "mongoose";
import { Drivetrain } from "../enums/drivetrain.enum";
import { BodyType } from "../enums/bodytype.enum";

@Schema()
export class Car extends Document {
    @Prop()
    id: string;

    @Prop()
    name: string;

    @Prop()
    power: number;

    @Prop()
    torque: number;

    @Prop()
    drivetrain: Drivetrain;

    @Prop()
    bodytype: BodyType;

    @Prop()
    description?: string;
}

export const CarSchema = SchemaFactory.createForClass(Car)