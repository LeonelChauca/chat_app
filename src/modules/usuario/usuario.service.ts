import { PersonaService } from './../persona/persona.service';
import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUsuarioDto } from './dto/create-usuario.dto';
import { UpdateUsuarioDto } from './dto/update-usuario.dto';
import { Usuario } from './entities/usuario.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UsuarioService {
  constructor(
    @InjectRepository(Usuario)
    private readonly usuarioRepository: Repository<Usuario>,

    private readonly personaService: PersonaService,
  ) {}
  async create(createUsuarioDto: CreateUsuarioDto) {
    try {
      const { id_persona, ...usuarioData } = createUsuarioDto;
      const persona = await this.personaService.findOne(id_persona);

      if (!persona) {
        throw new NotFoundException('Persona no encontrada');
      }

      const usuario = this.usuarioRepository.create({
        ...usuarioData,
        persona: persona,
      });

      return this.usuarioRepository.save(usuario);
    } catch (error) {
      console.error('Error creating usuario:', error);
      throw error;
    }
  }

  findAll() {
    return this.usuarioRepository.find();
  }

  findOne(id_usuario: number) {
    return this.usuarioRepository.findOne({ where: { id_usuario } });
  }

  async update(id_usuario: number, updateUsuarioDto: UpdateUsuarioDto) {
    try {
      const usuario = await this.usuarioRepository.findOne({
        where: { id_usuario },
      });
      if (!usuario) {
        throw new Error(`Usuario with id ${id_usuario} not found`);
      }
      const actualizado = this.usuarioRepository.merge(
        usuario,
        updateUsuarioDto,
      );
      return this.usuarioRepository.save(actualizado);
    } catch (error) {
      console.error('Error updating usuario:', error);
      throw error;
    }
  }

  remove(id_usuario: number) {
    return this.usuarioRepository.delete(id_usuario);
  }
}
