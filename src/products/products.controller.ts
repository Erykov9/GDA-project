import { ProductUpdateDTO } from './dtos/product-update.dto';
import { Controller, Get } from '@nestjs/common';
import { Body, Delete, Param, Post,  Put } from '@nestjs/common/decorators';
import { ProductsService } from './products.service';
import { ParseUUIDPipe } from '@nestjs/common/pipes';
import { NotFoundException } from '@nestjs/common/exceptions';
import { ProductDTO } from './dtos/product-create.dto';

@Controller('product')
export class ProductsController {
  constructor(private productService: ProductsService) {
    this.productService = productService;
  }

  @Get('/')
  public getAll():any {
    return this.productService.getAll()
  };

  @Get('/:id')
  public async getById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productService.getById(id);
    if(!product) throw new NotFoundException('Searching product doesn\'t exists');
    return product;
  };

  @Delete('/:id')
  public async deleteById(@Param('id', new ParseUUIDPipe()) id: string) {
    const product = await this.productService.getById(id);

    if (!product) throw new NotFoundException('Searching product doesn\'t exists');
    await this.productService.deleteById(id);
    return { success: true, item: id };
  };

  @Post('/')
  public createProduct(@Body() productData: ProductDTO) {
    return this.productService.createProduct(productData)
  }

  @Put('/:id')
  public async updateById(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() productData: ProductUpdateDTO) {
      const product = await this.productService.getById(id)
      if(!product) throw new NotFoundException('Searching product doesn\'t exists')

      await this.productService.updateById(id, productData);
      return { success: true, editId: id}
    }
}
