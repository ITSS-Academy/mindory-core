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
import { Card } from './Card';
import { Subjects } from './Subjects';

@Entity()
export class Flashcard {
  constructor(
    title: string,
    description: string,
    isPublic: boolean,
    subjectId: string,
  ) {
    this.title = title;
    this.description = description;
    this.isPublic = isPublic;
    this.subjectId = subjectId;
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  description: string;

  @Column()
  isPublic: boolean;

  @CreateDateColumn({ type: 'timestamptz' })
  createdAt: Date;

  @ManyToOne(() => Profile, (profile) => profile.uid)
  @JoinColumn([
    { name: 'authorUid', referencedColumnName: 'uid' },
    { name: 'authorEmail', referencedColumnName: 'email' },
  ])
  authorId: Profile;

  @OneToMany(() => Card, (card) => card.flashcardId)
  cards: Card[];

  @ManyToOne(() => Subjects, (subject) => subject.uid)
  @JoinColumn({ name: 'subjectId' })
  subjectId: string;
}
