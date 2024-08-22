import { Module } from '@nestjs/common';
import { FlashcardController } from './flashcard.controller';
import { FlashcardService } from './flashcard.service';

@Module({
  providers: [FlashcardService],
  controllers: [FlashcardController],
})
export class FlashcardModule {}
