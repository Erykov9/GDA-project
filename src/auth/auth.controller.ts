import { RegisterDTO } from './../users/dtos/users-register.dto';
import { Body, Controller, Post, UseGuards, Request, Response, Delete, Get } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LocalAuthGuard } from './local-auth.guard';
import { JwtAuthGuard } from './jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}
  
  @Post('/register')
  register(@Body() registerData: RegisterDTO) {
    return this.authService.register(registerData)
  }

  @UseGuards(LocalAuthGuard)
  @Post('/login')
  async login(@Request() req, @Response() res) {
    const tokens = await this.authService.createSession(req.user);

    res.cookie('auth', tokens, { httpOnly: true });
    res.send({
      message: 'success',
      user: req.user
    });
    return req.user;
  }

  @UseGuards(JwtAuthGuard)
  @Delete('logout')
  async logout(@Response() res) {
    res.clearCookie('auth', { httpOnly: true });
    res.send({
      message: 'success',
    });
  }

}
