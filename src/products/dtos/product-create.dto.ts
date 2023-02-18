import { IsString, IsInt, IsNotEmpty, Min, Max, Length, IsUUID } from 'class-validator';

export class ProductDTO {

  @IsNotEmpty()
  @IsString()
  @Length(2,25)
  name: string

  @IsNotEmpty()
  @IsString()
  img: string

  @IsNotEmpty()
  @IsInt()
  @Min(1)
  @Max(99999)
  price: number

  @IsNotEmpty()
  @IsString()
  @Length(10,150)
  description: string

  @IsUUID()
  @IsNotEmpty()
  storageId: string
}