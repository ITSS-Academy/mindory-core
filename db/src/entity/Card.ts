import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Flashcard } from './Flashcard';

@Entity()
export class Card {
  constructor(term: string, definition: string, flashcard: Flashcard) {
    this.term = term;
    this.definition = definition;
    this.flashcard = flashcard;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  term: string;

  @Column()
  definition: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Flashcard, (flashcard) => flashcard.id, {
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'flashcardId' })
  flashcard: Flashcard;
}
