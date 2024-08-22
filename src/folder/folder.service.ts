import { Injectable } from '@nestjs/common';
import { FolderDTO } from '../models/folder.dto';
import { AppDataSource } from '../../db/src/data-source';
import { Profile } from '../../db/src/entity/Profile';
import { Folder } from '../../db/src/entity/Folder';

@Injectable()
export class FolderService {
  async create(folder: FolderDTO, authorId: string) {
    let author = await AppDataSource.manager.findOne(Profile, {
      where: { uid: authorId },
    });
    if (!author) {
      throw new Error('Author not found');
    }
    folder.folder.authorId = author;
    await AppDataSource.manager.save(folder.folder);
  }

  async getByAuthorId(id: string) {
    let author = await AppDataSource.manager.findOne(Profile, {
      where: { uid: id },
    });
    if (!author) {
      throw new Error('Author not found');
    }
    return await AppDataSource.manager.find(Folder, {
      where: { authorId: author },
      relations: ['flashcards'],
      order: { createdAt: 'ASC' },
    });
  }

  async getById(id: string) {
    let folder = await AppDataSource.manager.findOne(Folder, {
      where: { id: id },
      relations: ['flashcards'],
      order: { createdAt: 'ASC' },
    });
    if (!folder) {
      throw new Error('Folder not found');
    }
    return folder;
  }
}
