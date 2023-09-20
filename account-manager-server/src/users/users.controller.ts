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

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Patch('profile')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'own',
  })
  updateOwnProfile(@Body() updateProfileDto: UpdateProfileDto) {
    return this.usersService.updateById('id', updateProfileDto);
  }

  @Put('profile/password')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'own',
  })
  updateOwnPassword(@Body() updatePasswordDto: UpdatePasswordDto) {
    return this.usersService.changePassword('id', updatePasswordDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'read',
    possession: 'own',
  })
  getOwnProfile() {
    return `This action returns the profile of the current user`;
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
  updatePassword(
    @Param('id') id: string,
    @Body() updatePasswordDto: UpdatePasswordDto,
  ) {
    this.usersService.changePassword(id, updatePasswordDto);
  }

  @Put(':id/roles')
  @UseGuards(JwtAuthGuard, ACGuard)
  @UseRoles({
    resource: 'users',
    action: 'update',
    possession: 'any',
  })
  updateRoles(@Param('id') id: string, @Body() updateRolesDto: UpdateRolesDto) {
    this.usersService.updateRoles(id, updateRolesDto);
  }
}
