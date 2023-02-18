import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { PrismaModule } from 'src/prisma/prisma.module';

@Module({
  controllers: [StorageController],
  providers: [StorageService],
  imports: [PrismaModule]
})
export class StorageModule {}
