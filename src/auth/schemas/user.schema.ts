import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';
import { Roles } from '../enums/roles.enum';

@Schema({ timestamps: true })
export class User extends Document {
  @Prop({
    required: true,
    trim: true,
    match: /^[A-Za-z\s]+$/,  // letters only
  })
  name: string;

  @Prop({
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
  })
  email: string;

  @Prop({
    required: true,
  })
  password: string; // hashed password only

  @Prop({
    required: true,
  })
  role: Roles;
}

export const UserSchema = SchemaFactory.createForClass(User);
