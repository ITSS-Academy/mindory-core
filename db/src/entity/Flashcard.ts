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
import { Folder } from './Folder';

@Entity()
export class Flashcard {
  constructor(
    title: string,
    description: string,
    isPublic: boolean,
    subject: Subjects,
    cards: Card[],
  ) {
    this.title = title;
    this.description = description;
    this.isPublic = isPublic;
    this.subject = subject;
    this.cards = cards;
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

  @OneToMany(() => Card, (card) => card.flashcard, {
    cascade: true,
    onDelete: 'CASCADE',
  })
  cards: Card[];

  @ManyToOne(() => Subjects, (subject) => subject.uid)
  @JoinColumn({ name: 'subjectId' })
  subject: Subjects;

  @ManyToOne(() => Folder, (folder) => folder.id, { nullable: true })
  @JoinColumn({ name: 'folderId' })
  folder: Folder;
}
