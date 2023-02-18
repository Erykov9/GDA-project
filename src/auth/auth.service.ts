import { RegisterDTO } from './../users/dtos/users-register.dto';
import { Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import * as bcrypt from 'bcryptjs'

@Injectable()
export class AuthService {
  constructor(private usersService: UsersService) {}

  public async register(registerData: RegisterDTO) {
    const hashedPassword = await bcrypt.hash(registerData.password, 10);

    const userData = {
      email: registerData.email
    };

    return this.usersService.create(userData, hashedPassword)
  }
}
