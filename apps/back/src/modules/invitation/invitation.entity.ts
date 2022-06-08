import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"

@Entity("invitation")
export default class Invitation extends BaseEntity {

	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'varchar',
		unique: true
	})
	slug: string;

	@Column({
		type: 'int',
	})
	game_id: number;

	@Column({
		type: 'varchar'
	})
	game_slug: string;

	@Column({
		type: 'int',
	})
	creator_id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
