import { Column, Entity, OneToMany, PrimaryColumn } from 'typeorm';
import { Flashcard } from './Flashcard';
import { Folder } from './Folder';

@Entity()
export class Profile {
  constructor(uid: string, fullName: string, email: string, photoUrl: string) {
    this.uid = uid;
    this.fullName = fullName;
    this.email = email;
    this.photoUrl = photoUrl;
  }

  @PrimaryColumn()
  uid: string;

  @Column()
  fullName: string;

  @PrimaryColumn()
  email: string;

  @Column()
  photoUrl: string;

  @OneToMany(() => Flashcard, (flashcard) => flashcard.authorId)
  flashcards: Flashcard[];

  @OneToMany(() => Folder, (folder) => folder.authorId)
  folders: Folder[];
}
