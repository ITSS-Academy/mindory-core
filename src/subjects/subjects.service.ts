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

  async getAllSubjects() {
    const subjects = await AppDataSource.manager.find(Subjects, {
      relations: ['flashcards', 'flashcards.cards', 'flashcards.authorId'],
    });

    return subjects.map((subject) => {
      const flashcardsWithCardCount = subject.flashcards.map((flashcard) => ({
        ...flashcard,
        totalCards: flashcard.cards.length,
      }));
      return {
        ...subject,
        flashcards: flashcardsWithCardCount,
      };
    });
  }
}
