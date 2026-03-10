import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateRequestDto } from './dto/create-request.dto';

@Injectable()
export class RequestsService {
  constructor(private prisma: PrismaService) { }

  private async generateRequestCode(): Promise<string> {

    const year = new Date().getFullYear();

    const count = await this.prisma.request.count();

    const sequence = (count + 1).toString().padStart(4, '0');

    return `REQ-${year}-${sequence}`;

  }

  async create(data: CreateRequestDto) {
    const requestCode = await this.generateRequestCode();
    return this.prisma.request.create({
      data: {
        requestCode,
        requestDate: new Date(data.requestDate),
        requester: data.requester,
        department: data.department,

        materials: {
          create: data.materials.map((m) => ({
            materialDescription: m.materialDescription,
            materialType: m.materialType,
            quantity: m.quantity,
            unit: m.unit,
            unitPrice: m.unitPrice,
            supplier: m.supplier,
            totalPrice: m.quantity * m.unitPrice,
          })),
        }

      },
      include: {
        materials: true
      }
    });
  }

  async update(id: number, data: CreateRequestDto) {
    await this.prisma.materialDetail.deleteMany({
      where: { requestId: id },
    });

    return this.prisma.request.update({
      where: { id },
      data: {
        requester: data.requester,
        department: data.department,
        requestDate: new Date(data.requestDate || Date.now()),
        materials: {
          create: data.materials.map((m) => ({
            materialDescription: m.materialDescription,
            materialType: m.materialType,
            quantity: m.quantity,
            unit: m.unit,
            unitPrice: m.unitPrice,
            supplier: m.supplier,
            totalPrice: m.quantity * m.unitPrice,
          })),
        }
      },
      include: {
        materials: true,
      },
    });
  }

  async remove(id: number) {

    await this.prisma.materialDetail.deleteMany({
      where: { requestId: id },
    });

    return this.prisma.request.delete({
      where: { id },
    });
  }

  findAll() {
    return this.prisma.request.findMany({
      include: {
        materials: true,
      },
    });
  }

  findOne(id: number) {
    return this.prisma.request.findUnique({
      where: { id },
      include: {
        materials: true,
      },
    });
  }

}

