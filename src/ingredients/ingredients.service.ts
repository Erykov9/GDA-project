import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { Ingredient } from  '@prisma/client';

@Injectable()
export class IngredientsService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<Ingredient[]> {
    return this.prismaService.ingredient.findMany();
  };

  public getById(id: Ingredient['id']): Promise<Ingredient | null> {
    return this.prismaService.ingredient.findUnique({
      where: { id }
    });
  };

  public deleteById(id: Ingredient['id']): Promise<Ingredient> {
    return this.prismaService.ingredient.delete({
      where: { id }
    });
  };

  public createIngredient(ingredientData: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt'>): Promise<Ingredient> {
    return this.prismaService.ingredient.create({
      data: ingredientData
    });
  };

  public updateById(id: Ingredient['id'], ingredientData: Omit<Ingredient, 'id' | 'createdAt' | 'updatedAt' | 'productId'>): Promise<Ingredient> {
    return this.prismaService.ingredient.update({
      where: { id },
      data: ingredientData
    });
  };
  
 };
