import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { AdminAuthGuard } from './../auth/admin-auth.guard';
import { Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, UseGuards } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('/')
  async getAll() {
    return await this.usersService.getAll();
  };

  @Get('/:id')
  async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getById(id);
    if(!user) throw new NotFoundException('User not found');
    return user;
  };

  @Delete('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const user = await this.usersService.getById(id);

    if(!user) throw new NotFoundException('User not found');
    await this.usersService.deleteById(id);
    return { success: true };
  }
}
