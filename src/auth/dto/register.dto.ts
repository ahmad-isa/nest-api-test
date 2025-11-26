import { IsEmail, IsEnum, IsNotEmpty, IsString, Matches, MinDate, MinLength } from "class-validator";
import { Match } from "src/validators/match.validator";
import { Roles } from "../enums/roles.enum";

export class RegisterDto{
    
    @IsString()
    @IsNotEmpty()
    @Matches(/^[A-Za-z\s]+$/, {
        message: 'Name must contain letters only',
    })
    name: string;

    @IsEmail()
    @IsNotEmpty()
    email: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Matches(/^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+{}\[\]:;"'<>,.?/~`-]).+$/, {
        message:
        'Password must contain at least one uppercase letter, one number, and one special character',
    })
    password: string;

    @IsString()
    @IsNotEmpty()
    @MinLength(6)
    @Match('password', {message: 'Passwords must match!'})
    confirmPassword: string;

    @IsString()
    @IsNotEmpty()
    @IsEnum(Roles)
    role: string;

}