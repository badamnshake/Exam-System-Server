import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string) {
    const user = await this.userService.findByEmail(email);
    // compare password with bcryptjs
    const isVerified = await bcryptjs.compare(password, user.password);
    if (isVerified) return user;
    return null;
  }
  async login(user: any) {
    const payload = { sub: user.id, email: user.email, role: user.role };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }
}
