import { PrismaService } from './../prisma/prisma.service';
import { Injectable } from '@nestjs/common';
import { PersonalStorage } from '@prisma/client';


@Injectable()
export class StorageService {
  constructor(private prismaService: PrismaService) {}

  public getAll(): Promise<PersonalStorage[]> {
    return this.prismaService.personalStorage.findMany({
      include: {
        user: true,
        products: true,
      }
    });
  };

  public getById(id: PersonalStorage['id']): Promise<PersonalStorage | null> {
    return this.prismaService.personalStorage.findUnique({
      where: { id },
      include: {
        products: true,
        user: true,
      }
    });
  };

  public deleteById(id: PersonalStorage['id']): Promise<PersonalStorage> {
    return this.prismaService.personalStorage.delete({
      where: { id }
    });
  };

  public createPersonalStorage(personalStorageData: Omit<PersonalStorage, 'id' | 'createdAt' | 'updatedAt'>): Promise<PersonalStorage> {
    return this.prismaService.personalStorage.create({
      data: personalStorageData,
    });
  };

  public updateById(
    id: PersonalStorage['id'],
    personalStorageData: Omit<PersonalStorage, 'id' | 'createdAt' | 'updatedAt'>): Promise<PersonalStorage> {
    return this.prismaService.personalStorage.update({
      where: { id },
      data: personalStorageData
    });
  };
}
