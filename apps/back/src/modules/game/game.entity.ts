import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"

@Entity("game")
export default class Game extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		unique: true
	})
	slug: string;

	@Column({
		type: 'int',
		nullable: true
	})
	user1_id: number;

	@Column({
		type: 'int',
		nullable: true
	})
	user2_id: number;

	@Column({
		type: 'int',
		default: 0
	})
	user1_score: number;

	@Column({
		type: 'int',
		default: 0
	})
	user2_score: number;

	@Column({
		type: 'varchar',
		default: "waiting"
	})
	status: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
