import { Injectable } from '@nestjs/common';
import { UserService } from 'src/user/user.service';
import * as bcryptjs from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Role } from './roles/role.enum';
import * as dayjs from 'dayjs';

@Injectable()
export class AuthService {
  constructor(
    private userService: UserService,
    private jwtService: JwtService,
  ) {}

  async validateUserAndReturnToken(
    email: string,
    password: string,
  ): Promise<null | { access_token: string }> {
    const user = await this.userService.findByEmail(email);
    // compare password with bcryptjs
    const isVerified = await bcryptjs.compare(password, user.password);
    if (!isVerified) return null;
    const loginTime = dayjs().format('YYYY-MM-DD HH:mm:ss');
    const iat = dayjs(loginTime).valueOf();
    await this.userService.updateLastLoggedIn(user.id, loginTime);
    const payload = { sub: user.id, email: user.email, role: user.role, iat };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async hashPassword(password: string) {
    return await bcryptjs.hash(password, 12);
  }
}
