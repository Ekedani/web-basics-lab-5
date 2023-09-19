import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async createUser(registerDto: RegisterDto) {
    const hashedPassword = bcrypt.hashSync(registerDto.password, 10);
    const createdUser = new this.userModel({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
    });
    return createdUser.save();
  }

  async changePassword(userId: string, newPassword: string) {
    const hashedPassword = bcrypt.hashSync(newPassword, 10);
    return this.userModel.findByIdAndUpdate(userId, {
      password: hashedPassword,
    });
  }
}
