import { IsNotEmpty, IsString, IsUUID } from "class-validator";

export class CreateStorageDTO {
  @IsUUID()
  @IsString()
  @IsNotEmpty()
  userId: string
}