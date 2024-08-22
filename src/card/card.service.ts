import { Injectable } from '@nestjs/common';
import { AppDataSource } from '../../db/src/data-source';
import { Card } from '../../db/src/entity/Card';

@Injectable()
export class CardService {
  async create(cards: { card: Card }[]) {
    for (const cardDto of cards) {
      await AppDataSource.manager.save(cardDto.card);
    }
  }
}
