import { Injectable } from '@nestjs/common';
import { CreatePersonaDto } from './dto/create-persona.dto';
import { UpdatePersonaDto } from './dto/update-persona.dto';
import { Persona } from './entities/persona.entity';
import { IsNull, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class PersonaService {
  constructor(
    @InjectRepository(Persona)
    private readonly personaRepository: Repository<Persona>,
  ) {}

  async create(createPersonaDto: CreatePersonaDto) {
    const persona = this.personaRepository.create(createPersonaDto);
    return await this.personaRepository.save(persona);
  }

  async findAll() {
    return this.personaRepository.find({
      select: {
        id_persona: true,
        nombre: true,
        apellido_paterno: true,
        apellido_materno: true,
        correo: true,
        fecha_nacimiento: true,
      },
      where: {
        deleted_at: IsNull(),
      },
    });
  }

  async findOne(id_persona: number) {
    return await this.personaRepository.findOne({
      where: {
        id_persona,
      },
    });
  }

  async update(id_persona: number, updatePersonaDto: UpdatePersonaDto) {
    try {
      const persona = await this.personaRepository.findOne({
        where: {
          id_persona,
        },
      });
      if (!persona) {
        throw new Error(`Persona with id ${id_persona} not found`);
      }
      const actualizado = this.personaRepository.merge(
        persona,
        updatePersonaDto,
      );
      return this.personaRepository.save(actualizado);
    } catch (error) {
      console.error('Error updating persona:', error);
    }
  }

  async remove(id_persona: number) {
    return await this.personaRepository.softDelete(id_persona);
  }
}
