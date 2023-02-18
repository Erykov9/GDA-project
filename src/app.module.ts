import { Module, NestModule, MiddlewareConsumer, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { IngredientsModule } from './ingredients/ingredients.module';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { StorageModule } from './storage/storage.module';
import configuration from './config/configuration';
import * as cors from 'cors';

@Module({
  imports: [
    ProductsModule, 
    IngredientsModule, 
    UsersModule, 
    AuthModule, 
    PrismaModule, 
    ConfigModule.forRoot({ 
      load: [configuration],
      isGlobal: true 
    }), StorageModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): void {
    consumer.apply(cors()).forRoutes({
      path: '*',
      method: RequestMethod.ALL,
    });
  }
}
