import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { UpdateIngredientsDTO } from './dtos/update-ingredients.dto';
import { CreateIngredientsDTO } from './dtos/create-ingredients.dto';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { IngredientsService } from './ingredients.service';
import { Controller, Get, Param, Delete, Post, Body, Put, UseGuards } from '@nestjs/common';
import { AdminAuthGuard } from 'src/auth/admin-auth.guard';


@Controller('ingredients')
export class IngredientsController {
  constructor(private ingedientsService: IngredientsService) {}
  
  @Get('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public getAll(): any {
    return this.ingedientsService.getAll()
  };

  @Get('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const ing = await this.ingedientsService.getById(id);
    if(!ing) throw new NotFoundException('Searching ingredient doesn\'t exists');
    return ing;
  };

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const ing = await  this.ingedientsService.getById(id);

    if(!ing) throw new NotFoundException('Searching ingredient doesnt\'t exists')
    await this.ingedientsService.deleteById(id);
    return { success: true, item: id };
  };

  @Post('/')
  @UseGuards(JwtAuthGuard)
  public createIngredient(@Body() ingredientData: CreateIngredientsDTO) {
    return this.ingedientsService.createIngredient(ingredientData);
  };

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  public async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() ingredientData: UpdateIngredientsDTO
  ) {
    const ing = await this.ingedientsService.getById(id)
    if(!ing) throw new NotFoundException('Searching product doesn\'t exists');

    await this.ingedientsService.updateById(id,  ingredientData);
    return { success: true, editId: id }
  }
}
