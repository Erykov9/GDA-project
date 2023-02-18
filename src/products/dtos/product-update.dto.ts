import {
  IsString,
  IsInt,
  Min,
  Max,
  IsUUID
 } from  'class-validator';

export class ProductUpdateDTO {
  @IsString()
  name: string

  @IsString()
  img: string

  @IsInt()
  @Min(1)
  @Max(99999)
  price: number

  @IsString()
  description: string

  @IsUUID()
  storageId: string
}