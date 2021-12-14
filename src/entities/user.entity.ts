import {
  BeforeInsert,
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('users')
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column({ unique: true })
  email: string;

  @Column()
  password: string;

  @Column()
  role: string;

  @Column({ default: 'https://i.ibb.co/b2YMFB5/best-linkedin-photos.jpg' })
  profilePictureLink: string;

  @Column({ nullable: true })
  resetToken: string;

  @Column({ default: 0 })
  resolvedReportedIssues: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @BeforeInsert()
  emailToLowerCase() {
    this.email = this.email.toLowerCase();
  }

  //   @OneToMany(() => Picture, (picture) => picture.ownerId)
  //   issues: string[];
}
