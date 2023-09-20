import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Put,
  UseGuards,
} from '@nestjs/common';
import { ACGuard, UseRoles } from 'nest-access-control';
import { JwtAuthGuard } from '../shared/guards/jwt-auth.guard';
import { UsersService } from './users.service';
import { UpdatePasswordDto } from './dto/update-password.dto';
import { UpdateRolesDto } from './dto/update-roles.dto';
import { UpdateProfileDto } from './dto/update-profile.dto';
import { User } from '../shared/decorators/user.decorator';
import { RequestUser } from '../shared/interfaces/request-user.interface';
import { SetPasswordDto } from './dto/set-password.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('profile')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'own',
  })
  getOwnProfile(@User() user: RequestUser) {
    return this.usersService.findById(user.id);
  }

  @Put('profile/password')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'own',
  })
  updateOwnPassword(
    @User() user: RequestUser,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    return this.usersService.changePassword(user.id, updatePasswordDto);
  }

  @Patch('profile')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'own',
  })
  updateOwnProfile(
    @User() user: RequestUser,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateById(user.id, updateProfileDto);
  }

  @Patch('users/:id')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  updateProfile(
    @Param('id') id: string,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    return this.usersService.updateById(id, updateProfileDto);
  }

  @Get()
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  findAll() {
    return this.usersService.findAll();
  }

  @Get(':id')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'any',
  })
  findOne(@Param('id') id: string) {
    return this.usersService.findById(id);
  }

  @Put(':id/password')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  async updatePassword(
    @Param('id') id: string,
    @Body() setPasswordDto: SetPasswordDto,
  ) {
    await this.usersService.setNewPassword(id, setPasswordDto.newPassword);
  }

  @Put(':id/roles')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  async updateRoles(
    @Param('id') id: string,
    @Body() updateRolesDto: UpdateRolesDto,
  ) {
    await this.usersService.updateRoles(id, updateRolesDto);
  }
}
