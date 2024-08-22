import {
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { ProfileService } from './profile.service';
import { ProfileDTO } from '../models/profile.dto';
import { Profile } from '../../db/src/entity/Profile';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Controller('profile')
export class ProfileController {
  constructor(private profileService: ProfileService) {}

  @Post()
  async createProfile(@Req() req: any) {
    let authData = req.user as DecodedIdToken;
    let profile: ProfileDTO = {
      profile: new Profile(
        authData.uid,
        authData.name,
        authData.email,
        authData.picture,
      ),
    };
    try {
      await this.profileService.create(profile);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getProfile(@Req() req: any) {
    let authData = req.user as DecodedIdToken;
    try {
      return await this.profileService.getById(authData.uid);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.NOT_FOUND);
    }
  }
}
