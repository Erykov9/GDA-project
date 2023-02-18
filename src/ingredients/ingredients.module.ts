import { PrismaService } from 'src/prisma/prisma.service';
import { Module } from '@nestjs/common';
import { IngredientsService } from './ingredients.service';
import { IngredientsController } from './ingredients.controller';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  providers: [IngredientsService],
  controllers: [IngredientsController],
  imports: [PrismaModule]
})
export class IngredientsModule {}
