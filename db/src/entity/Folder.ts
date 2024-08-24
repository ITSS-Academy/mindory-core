import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { Profile } from './Profile';
import { Flashcard } from './Flashcard';

@Entity()
export class Folder {
  constructor(name: string) {
    this.name = name;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Profile, (profile) => profile.uid)
  @JoinColumn([
    { name: 'authorUid', referencedColumnName: 'uid' },
    { name: 'authorEmail', referencedColumnName: 'email' },
  ])
  authorId: Profile;

  @OneToMany(() => Flashcard, (flashcard) => flashcard.folder)
  flashcards: Flashcard[];
}
