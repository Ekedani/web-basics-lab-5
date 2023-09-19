import { Injectable, UnauthorizedException } from '@nestjs/common';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private readonly jwtService: JwtService,
  ) {}

  public async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) throw new UnauthorizedException();
    const isPasswordValid = bcrypt.compareSync(
      loginDto.password,
      user.password,
    );
    if (!isPasswordValid) throw new UnauthorizedException();
    return this.getToken({
      sub: user._id.toString(),
      username: user.username,
      roles: user.roles,
    });
  }

  public async register(registerDto: RegisterDto) {
    try {
      const user = await this.usersService.createUser(registerDto);
      return this.getToken({
        sub: user._id.toString(),
        username: user.username,
        roles: user.roles,
      });
    } catch (e) {
      throw e;
    }
  }

  private getToken(jwtPayload: JwtPayload) {
    return {
      accessToken: this.jwtService.sign(jwtPayload),
    };
  }
}
