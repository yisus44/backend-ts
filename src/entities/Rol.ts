import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Rol {
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
