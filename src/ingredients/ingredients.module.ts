import { PrismaService } from 'src/shared/services/prisma.service';
import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';

@Module({
  providers: [IngredientsService, PrismaService],
  controllers: [IngredientsController]
})
export class IngredientsModule {}
