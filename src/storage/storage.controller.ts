import { CreateStorageDTO } from './dtos/storage-create.dto';
import { AdminAuthGuard } from './../auth/admin-auth.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { StorageService } from './storage.service';
import { Controller, Delete, Get, NotFoundException, Param, ParseUUIDPipe, UseGuards, Body, Post, Put } from '@nestjs/common';
import { User } from '@prisma/client';


@Controller('storage')
export class StorageController {
  constructor(private storageService: StorageService) {}

  @Get('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public getAll() {
    return this.storageService.getAll()
  }

  @Get('/:id')
  @UseGuards(JwtAuthGuard)
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const storage = await this.storageService.getById(id);

    if(!storage) throw new NotFoundException('Searching Storage doesn\'t exists');
    return storage;
  }

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const storage = await this.storageService.getById(id);

    if(!storage) throw new NotFoundException('Searching Storage doesn\'t exists');
    await this.storageService.deleteById(id);
    return { success: true, item: id};
  }

  @Post('/')
  @UseGuards(JwtAuthGuard)
  public createStorage(@Body() storageData: CreateStorageDTO) {
    return this.storageService.createPersonalStorage(storageData)
  };

  @Put('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() storageData: CreateStorageDTO
  ) {
    const storage = await this.storageService.getById(id);

    if(!storage) throw new NotFoundException('Searching Storage doesn\'t exist');

    await this.storageService.updateById(id, storageData);
    return { success: true, editId: id}
  }
}
