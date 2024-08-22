import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../db/src/data-source';
import { Profile } from '../../db/src/entity/Profile';
import { ProfileDTO } from '../models/profile.dto';

@Injectable()
export class ProfileService {
  async create(profile: ProfileDTO) {
    // check if email is valid
    let emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(profile.profile.email)) {
      throw new Error('Invalid email');
    }
    // check if profile already exists
    let result = await AppDataSource.manager.findOne(Profile, {
      where: { uid: profile.profile.email },
    });
    if (result) {
      throw new Error('Profile already exists');
    }

    await AppDataSource.manager.save(profile.profile);
  }

  async getById(uid: string) {
    let result = await AppDataSource.manager.findOne(Profile, {
      where: { uid: uid },
      relations: ['flashcards', 'folders'],
    });
    if (!result) {
      throw new Error('Profile not found');
    }

    return result;
  }
}
