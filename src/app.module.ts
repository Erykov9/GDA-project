import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { IngredientsModule } from './ingredients/ingredients.module';

@Module({
  imports: [ProductsModule, IngredientsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
