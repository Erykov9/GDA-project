import { IsEmail, IsNotEmpty, IsString, Length } from "class-validator"
import { Match } from "src/utils/match.decorator"

export class RegisterDTO {
  @IsEmail()
  @IsString()
  @IsNotEmpty()
  email: string

  @IsString()
  @Length(7,30)
  @IsNotEmpty()
  password: string

  @IsString()
  @IsNotEmpty()
  @Length(7,30)
  @Match('password')
  passwordRepeat: string
}