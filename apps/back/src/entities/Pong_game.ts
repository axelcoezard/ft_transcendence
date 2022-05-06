import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Users } from "./Users"

@Entity(Pong_game)
export class Pong_game extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

   //user1

   @Column({
	   type: 'int'
   })
   user1_score: number;

   //user2

   @Column({
	   type: 'int'
   })
   user2_score: number;

   @Column({
	   type: 'varchar'
   })
   status: string;

   @CreateDateColumn()
   creattion: Date;

   @UpdateDateColumn()
   update: Date;
} 