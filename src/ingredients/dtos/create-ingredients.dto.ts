import { IsInt, IsNotEmpty, IsString, IsUUID, Length, Max, Min } from "class-validator"

export class CreateIngredientsDTO {
  @IsString()
  @IsNotEmpty()
  @Length(2, 25)
  name: string

  @IsInt()
  @IsNotEmpty()
  @Min(1)
  @Max(9999)
  amount: number

  @IsUUID()
  @IsNotEmpty()
  productId: string
}