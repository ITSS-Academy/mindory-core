import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { FlashcardService } from './flashcard.service';
import { DecodedIdToken } from 'firebase-admin/lib/auth';
import { FlashcardDTO } from '../models/flashcard.dto';
import { Flashcard } from '../../db/src/entity/Flashcard';

@Controller('flashcard')
export class FlashcardController {
  constructor(private flashcardService: FlashcardService) {}

  @Post()
  async createFlashcard(@Req() req: any, @Body() flashcardDto: FlashcardDTO) {
    try {
      let authData = req.user as DecodedIdToken;
      let flashcard: FlashcardDTO = {
        flashcard: new Flashcard(
          flashcardDto.flashcard.title,
          flashcardDto.flashcard.description,
          flashcardDto.flashcard.isPublic,
          flashcardDto.flashcard.subject,
        ),
      };

      await this.flashcardService.create(flashcard, authData.uid);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('all')
  async getFlashcard(@Req() req: any) {
    try {
      let authData = req.user as DecodedIdToken;
      return await this.flashcardService.getByAuthorId(authData.uid);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get('/subject')
  async getFlashcardBySubjectId(@Req() req: any, @Query('id') id: string) {
    try {
      return await this.flashcardService.getBySubjectId(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getFlashcardById(@Req() req: any, @Query('id') id: any) {
    try {
      return await this.flashcardService.getById(id);
    } catch (error) {
      throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
