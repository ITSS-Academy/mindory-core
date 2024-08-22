import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
  Req,
} from '@nestjs/common';
import { FolderService } from './folder.service';
import { FolderDTO } from '../models/folder.dto';
import { Folder } from '../../db/src/entity/Folder';
import { DecodedIdToken } from 'firebase-admin/lib/auth';

@Controller('folder')
export class FolderController {
  constructor(private folderService: FolderService) {}

  @Post()
  async createFolder(@Req() req: any, @Body() folderDto: FolderDTO) {
    try {
      let authData = req.user as DecodedIdToken;
      let folder: FolderDTO = {
        folder: new Folder(folderDto.folder.name),
      };

      await this.folderService.create(folder, authData.uid);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getFolder(@Req() req: any) {
    try {
      let authData = req.user as DecodedIdToken;
      return await this.folderService.getByAuthorId(authData.uid);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getFolderById(@Req() req: any, @Body() folderDto: FolderDTO) {
    try {
      return await this.folderService.getById(folderDto.folder.id);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
