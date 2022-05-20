import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { User } from "./user.entity"

@Entity("pong_game")
export class PongGame extends BaseEntity {

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
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
