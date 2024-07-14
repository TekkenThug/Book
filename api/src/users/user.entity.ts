import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { Roles } from '../data/enums';

@Entity({ name: 'users' })
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column('varchar')
  first_name: string;

  @Column('varchar')
  last_name: string;

  @Column('varchar')
  email: string;

  @Column('varchar')
  password: string;

  @Column({ type: 'boolean', default: false })
  verified_email: boolean;

  @Column({ type: 'enum', enum: Roles, default: Roles.USER })
  role: Roles;
}
