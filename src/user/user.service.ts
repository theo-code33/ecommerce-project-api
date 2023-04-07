import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entities/user.entity';
import { DeleteResult, Repository } from 'typeorm';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly jwtService: JwtService
  ) {}

  async create(createUserDto: CreateUserDto): Promise<any> {
    const { password } = createUserDto;
    const salt = await bcrypt.genSalt();
    const hashedPassword = await bcrypt.hash(password, salt);
    const newUser = {
      ...createUserDto,
      password: hashedPassword
    }
    const user = await this.userRepository.save(newUser);
    delete user.password;
    const payload = { sub: user.id };
    return {
      access_token: await this.jwtService.signAsync(payload),
    }
  }

  async findOne(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['orders', 'orders.items', 'orders.items.product']
    })
  }

  async findOneByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({
      where: {
        email
      },
      relations: ['orders', 'orders.items', 'orders.items.product']
    })
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const user = await this.userRepository.findOne({
      where: {
        id
      },
      relations: ['orders', 'orders.items', 'orders.items.product']
    })
    const updatedUser = {
      ...user,
      ...updateUserDto
    }
    return await this.userRepository.save(updatedUser);
  }

  async remove(id: string): Promise<DeleteResult> {
    return await this.userRepository.delete(id);
  }
}
