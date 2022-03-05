import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  firstName: string;

  @Column({
    type: 'text',
  })
  lastName: string;

  @Column({ nullable: true, type: 'text' })
  secondLastName: string;

  @Column({
    type: 'date',
  })
  birthDate: Date;

  @Column({
    type: 'text',
  })
  password: string;

  @Column({
    type: 'text',
    unique: true,
  })
  email: string;
}
