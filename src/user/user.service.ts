import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Role } from 'src/auth/roles/role.enum';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  async create(createUser: User) {
    const newUser = this.userRepository.create(createUser);
    const result = await this.userRepository.save(newUser);
    return result;
  }

  async findAll() {
    return await this.userRepository.find();
  }

  async findAllStudents() {
    return await this.userRepository.findBy({ role: Role.STUDENT });
  }
  async findOne(id: number) {
    return await this.userRepository.findBy({ id });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return `This action updates a #${id} user`;
  }

  remove(id: number) {
    return `This action removes a #${id} user`;
  }
  async findByEmail(email: string) {
    const user = await this.userRepository.findOneBy({ email });
    return user;
  }
  async getLastLoggedIn(userId: number) {
    const result: { lastLoggedIn: string } = await this.userRepository
      .createQueryBuilder('user')
      .select('user.lastLoggedIn', 'lastLoggedIn')
      .where('user.id = :id', { id: userId })
      .getRawOne();
    return result.lastLoggedIn;
  }
  async updateLastLoggedIn(userId: number, lastLoggedIn: string) {
    const x = await this.userRepository.update(userId, { lastLoggedIn });
  }
}
