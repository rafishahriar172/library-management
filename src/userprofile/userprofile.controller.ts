/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */
import {
    Controller,
    Get,
    Post,
    Put,
    Delete,
    Param,
    Body,
    Query,
    UseGuards,   
  } from '@nestjs/common';
  import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
  import { UserprofileService } from './userprofile.service';
  import { UserProfileDto } from './dto/userprofile.dto';


@Controller('userprofile')
export class UserprofileController {
    constructor(private readonly userprofileservice: UserprofileService) {}

    @Get()
    async getAllUserProfiles() {
        return await this.userprofileservice.getAllUserProfiles();
    }

    @Get(':id')
    async getUserProfileById(@Param('id') id: string) {
        return await this.userprofileservice.getUserProfileById(id);
    }

    @Post()
    @UseGuards(JwtAuthGuard)
    async createUserProfile(@Body() userProfileDto: UserProfileDto) {
        return await this.userprofileservice.createUserProfile(userProfileDto);
    }

    @Put(':id')
    @UseGuards(JwtAuthGuard)
    async updateUserProfile(@Param('id') id: string, @Body() userProfileDto: UserProfileDto) {
        return await this.userprofileservice.updateUserProfile(id, userProfileDto);
    }

    @Delete(':id')
    @UseGuards(JwtAuthGuard)
    async deleteUserProfile(@Param('id') id: string) {
        return await this.userprofileservice.deleteUserProfile(id);
    }


}
