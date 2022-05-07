import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Inject,
  forwardRef,
  UnauthorizedException,
} from '@nestjs/common';
import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { AuthService } from 'src/auth/auth.service';
import { User } from './entities/user.entity';
import { LoginDto } from './dto/login.dto';

@Controller('user')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly authService: AuthService,
  ) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const user = new User();

    user.information = createUserDto.information;
    user.email = createUserDto.email;
    user.password = await this.authService.hashPassword(createUserDto.password);
    user.role = createUserDto.role;
    user.firstName = createUserDto.firstName;
    user.middleName = createUserDto.middleName;
    user.lastName = createUserDto.lastName;

    return this.userService.create(user);
  }

  @Post('login')
  async login(@Body() loginDto: LoginDto) {
    const token = await this.authService.validateUserAndReturnToken(
      loginDto.email,
      loginDto.password,
    );
    if (!token) return UnauthorizedException;
    return token;
  }

  @Get()
  findAll() {
    return this.userService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.userService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.update(+id, updateUserDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.userService.remove(+id);
  }
}
