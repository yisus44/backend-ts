import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
//LEGACY
@Entity()
export class UserRol {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    type: 'text',
  })
  description: string;

  @Column({
    type: 'boolean',
  })
  isActive: boolean;
}
