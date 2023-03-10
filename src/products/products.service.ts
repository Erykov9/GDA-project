import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Product } from '@prisma/client';

@Injectable()
export class ProductsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Product[]> {
    return this.prismaService.product.findMany({
      include: {
        ingridients: true,
        storage: true
      }
    });
  };

  public getById(id: Product['id']): Promise<Product | null> {
    return this.prismaService.product.findUnique({
      where: { id },
      include: {
        ingridients: true,
        storage: true
      }
    });
  };

  public deleteById(id: Product['id']): Promise<Product> {
    return this.prismaService.product.delete({
      where: { id }
    });
  };

  public createProduct(productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt'>): Promise<Product> {
    return this.prismaService.product.create({
      data: productData,
    });
  };

  public updateById(
    id: Product['id'],
    productData: Omit<Product, 'id' | 'createdAt' | 'updatedAt' | 'storageId'>): Promise<Product> {
    return this.prismaService.product.update({
      where: { id },
      data: productData
    });
  }
}
