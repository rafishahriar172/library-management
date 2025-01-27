/* eslint-disable prettier/prettier */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Injectable,NotFoundException } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { UserProfileDto } from './dto/userprofile.dto';

@Injectable()
export class UserprofileService {
    constructor(
        private readonly prisma: PrismaService,
    ) {}

    async getUserProfileById(id: string) {
        const userprofile = await this.prisma.userProfile.findUnique({ where: { id } });
        if (!userprofile) {
            throw new NotFoundException(`User Profile with ID ${id} not found`);
        }
        return userprofile;
    }

    async createUserProfile(userProfileDto: UserProfileDto) {
        return await this.prisma.userProfile.create({
            data: userProfileDto,
        });
    }

    async updateUserProfile(id: string, userProfileDto: UserProfileDto) {
        const userprofile = await this.prisma.userProfile.findUnique({ where: { id } });
        if (!userprofile) {
            throw new NotFoundException(`User Profile with ID ${id} not found`);
        }
        return await this.prisma.userProfile.update({
            where: { id },
            data: userProfileDto,
        });
    }

    async deleteUserProfile(id: string) {
        const userprofile = await this.prisma.userProfile.findUnique({ where: { id } });
        if (!userprofile) {
            throw new NotFoundException(`User Profile with ID ${id} not found`);
        }
        return await this.prisma.userProfile.delete({ where: { id } });
    }

    async getAllUserProfiles() {
        const userprofiles = await this.prisma.userProfile.findMany();
        const totalCount = await this.prisma.userProfile.count();
        return {
            data: userprofiles,           
            totalCount,
        };
    }
}
