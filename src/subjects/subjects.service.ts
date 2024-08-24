import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../db/src/data-source';
import { SubjectsDTO } from '../models/subjects.dto';
import { Subjects } from '../../db/src/entity/Subjects';

@Injectable()
export class SubjectsService {
  async create(subject: SubjectsDTO) {
    let subjectExists = await AppDataSource.manager.findOne(Subjects, {
      where: { name: subject.subject.name },
    });
    if (subjectExists) {
      throw new Error('Subject already exists');
    }
    await AppDataSource.manager.save(subject.subject);
  }

  async getSubjectById(id: string) {
    return await AppDataSource.manager.find(Subjects, {
      where: { uid: id },
      relations: ['quizzes'],
    });
  }

  async getAllSubjects() {
    return await AppDataSource.manager.find(Subjects);
  }
}
