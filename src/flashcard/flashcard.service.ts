import { Injectable } from '@nestjs/common';
import { FlashcardDTO } from '../models/flashcard.dto';
import { AppDataSource } from '../../db/src/data-source';
import { Profile } from '../../db/src/entity/Profile';
import { Flashcard } from '../../db/src/entity/Flashcard';
import { Subjects } from '../../db/src/entity/Subjects';

@Injectable()
export class FlashcardService {
  async create(flashcard: FlashcardDTO, authorId: string) {
    let author = await AppDataSource.manager.findOne(Profile, {
      where: { uid: authorId },
    });
    if (!author) {
      throw new Error('Author not found');
    }
    flashcard.flashcard.authorId = author;
    await AppDataSource.manager.save(flashcard.flashcard);
  }

  async getByAuthorId(id: string) {
    let author = await AppDataSource.manager.findOne(Profile, {
      where: { uid: id },
    });
    if (!author) {
      throw new Error('Author not found');
    }
    const flashcards = await AppDataSource.manager.find(Flashcard, {
      where: { authorId: author },
      relations: ['cards'],
      order: { createdAt: 'ASC', cards: { createdAt: 'ASC' } },
    });

    flashcards.forEach((flashcard) => {
      flashcard['totalCards'] = flashcard.cards.length;
    });

    return flashcards;
  }

  async getById(id: string) {
    let flashcard = await AppDataSource.manager.findOne(Flashcard, {
      where: { id: id },
      relations: ['cards'],
      order: { createdAt: 'ASC', cards: { createdAt: 'ASC' } },
    });
    if (!flashcard) {
      throw new Error('Flashcard not found');
    }
    return flashcard;
  }

  async getBySubjectId(id: string) {
    const subject = await AppDataSource.manager.findOne(Subjects, {
      where: { uid: id },
    });
    if (!subject) {
      throw new Error('Subject not found');
    }
    return await AppDataSource.manager.find(Flashcard, {
      where: { subject: subject },
      relations: ['cards', 'subject'],
      order: { createdAt: 'ASC', cards: { createdAt: 'ASC' } },
    });
  }
}
