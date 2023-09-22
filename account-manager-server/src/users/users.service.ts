import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/user.schema';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from '../auth/dto/register.dto';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectModel('User')
    private readonly userModel: Model<User>,
  ) {}

  async findByEmail(email: string) {
    return this.userModel.findOne({ email });
  }

  async create(registerDto: RegisterDto) {
    const hashedPassword = bcrypt.hashSync(registerDto.password, 10);
    const createdUser = new this.userModel({
      username: registerDto.username,
      email: registerDto.email,
      password: hashedPassword,
      phone: registerDto.phone,
    });
    try {
      return await createdUser.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw e;
    }
  }

  async changePassword(id: string, updatePasswordDto: UpdatePasswordDto) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    if (!bcrypt.compareSync(updatePasswordDto.oldPassword, user.password))
      throw new BadRequestException('Old password is not correct');
    user.password = bcrypt.hashSync(updatePasswordDto.newPassword, 10);
    return user.save();
  }

  async setNewPassword(id: string, newPassword: string) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.password = bcrypt.hashSync(newPassword, 10);
    return user.save();
  }

  findAll() {
    return this.userModel.find();
  }

  findById(id: string) {
    return this.userModel.findById(id);
  }

  async updateRoles(id: string, updateRolesDto: UpdateRolesDto) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.roles = updateRolesDto.roles;
    return user.save();
  }

  async updateById(id: string, updateProfileDto: UpdateProfileDto) {
    const user = await this.userModel.findById(id);
    if (!user) throw new NotFoundException('User not found');
    user.username = updateProfileDto.username;
    user.email = updateProfileDto.email;
    try {
      return await user.save();
    } catch (e) {
      if (e.code === 11000) {
        throw new BadRequestException('Email already exists');
      }
      throw e;
    }
  }
}
