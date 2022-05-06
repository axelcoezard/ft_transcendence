import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { User } from "./User"

@Entity("Pong_game")
export class Pong_game extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'int'
	})
	user1_id: number;

	@Column({
		type: 'int'
	})
	user2_id: number;

	@Column({
		type: 'int'
	})
	user1_score: number;

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
