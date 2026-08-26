import { Repository } from 'typeorm';
import { Spot } from './spot.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateSpotDto } from './dto/create-spot';
import { UpdateSpotDto } from './dto/update-spot';

@Injectable()
export class SpotService {
  constructor(
    @InjectRepository(Spot)
    private readonly spotRepository: Repository<Spot>,
  ) {}

  findAll(): Promise<Spot[]> {
    return this.spotRepository.find({
      order: { name: 'ASC' },
    });
  }

  async findOne(id: string): Promise<Spot> {
    const Spot = await this.spotRepository.findOneBy({ id });
    if (!Spot) {
      throw new NotFoundException('Local não encontrado');
    }
    return Spot;
  }

  create(dto: CreateSpotDto): Promise<Spot> {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument
    const Spot = this.spotRepository.create({
      ...dto,
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      name: dto.name,
      active: true,
    });
    return this.spotRepository.save(Spot);
  }

  async update(id: string, dto: UpdateSpotDto): Promise<Spot> {
    const Spot = await this.findOne(id);
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (dto.name !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      Spot.name = dto.name;
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
    if (dto.active !== undefined) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      Spot.active = dto.active;
    }
    return this.spotRepository.save(Spot);
  }

  async remove(id: string): Promise<void> {
    const Spot = await this.findOne(id);
    await this.spotRepository.remove(Spot);
  }
}
