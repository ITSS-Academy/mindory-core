import {
  Body,
  Controller,
  HttpException,
  HttpStatus,
  Post,
} from '@nestjs/common';
import { CardService } from './card.service';
import { Card } from '../../db/src/entity/Card';
import { CardDTO } from '../models/card.dto';

@Controller('card')
export class CardController {
  constructor(private cardService: CardService) {}

  @Post()
  async createCard(@Body() cardDto: CardDTO) {
    try {
      let card: { card: Card }[] = cardDto.card.map((card: any) => {
        return {
          card: new Card(card.term, card.definition, card.flashcardId),
        };
      });
      await this.cardService.create(card);
    } catch (error) {
      return new HttpException(error.message, HttpStatus.BAD_REQUEST);
    }
  }
}
