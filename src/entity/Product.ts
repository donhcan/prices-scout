import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Product {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column({ nullable: true })
  quantity: number;

  @Column({ nullable: true })
  price: number;

  @Column()
  country: string;

  @Column()
  date: Date;
}
