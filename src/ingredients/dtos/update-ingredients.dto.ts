import { IsInt, IsString, Length, Max, Min } from "class-validator"

export class UpdateIngredientsDTO {
  @IsString()
  @Length(2, 25)
  name: string

  @IsInt()
  @Min(1)
  @Max(9999)
  amount: number

}