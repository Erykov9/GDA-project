import { AdminAuthGuard } from './../auth/admin-auth.guard';
import { JwtAuthGuard } from './../auth/jwt-auth.guard';
import { ProductUpdateDTO } from './dtos/product-update.dto';
import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Post,  Put } from '@nestjs/common/decorators';
import { ProductsService } from './products.service';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ProductDTO } from './dtos/product-create.dto';
import { UseGuards } from '@nestjs/common/decorators';

@Controller('product')
export class ProductsController {
  constructor(private productService: ProductsService) {
    this.productService = productService;
  }

  @Get('/')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public getAll():any {
    return this.productService.getAll()
  };

  @Get('/:id')
  @UseGuards(AdminAuthGuard)
  @UseGuards(JwtAuthGuard)
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productService.getById(id);
    if(!product) throw new NotFoundException('Searching product doesn\'t exists');
    return product;
  };

  @Delete('/:id')
  @UseGuards(JwtAuthGuard)
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productService.getById(id);

    if (!product) throw new NotFoundException('Searching product doesn\'t exists');
    await this.productService.deleteById(id);
    return { success: true, item: id };
  };

  @Post('/')
  @UseGuards(JwtAuthGuard)
  public createProduct(@Body() productData: ProductDTO) {
    return this.productService.createProduct(productData)
  }

  @Put('/:id')
  @UseGuards(JwtAuthGuard)
  public async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: ProductUpdateDTO) {
      const product = await this.productService.getById(id)
      if(!product) throw new NotFoundException('Searching product doesn\'t exists')

      await this.productService.updateById(id, productData);
      return { success: true, editId: id}
    }
}
