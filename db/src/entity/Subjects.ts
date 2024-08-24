import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Flashcard } from './Flashcard';

@Entity()
export class Subjects {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryGeneratedColumn('uuid')
  uid: string;

  @Column()
  name: string;

  @OneToMany(() => Flashcard, (flashcard) => flashcard.subject)
  flashcards: Flashcard[];
}
