import {
  Body,
  Controller,
  Get,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { SubjectsService } from './subjects.service';
import { SubjectsDTO } from '../models/subjects.dto';
import { Subjects } from '../../db/src/entity/Subjects';

@Controller('subjects')
export class SubjectsController {
  constructor(private subjectsService: SubjectsService) {}

  @Post()
  async createSubject(@Body() subjectDto: SubjectsDTO) {
    try {
      let subject: SubjectsDTO = {
        subjects: new Subjects(subjectDto.subjects.name),
      };
      await this.subjectsService.create(subject);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get()
  async getAllSubjects() {
    try {
      return await this.subjectsService.getAllSubjects();
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }

  @Get(':id')
  async getSubjectById(id: string) {
    try {
      return await this.subjectsService.getSubjectById(id);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
