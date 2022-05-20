import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./user.entity"

@Entity("Channel")
export default class Channel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'int'
	})
	creator_id: number;

	@Column({
		type: 'varchar'
	})
	slug: string;

	@Column({
		type: 'varchar'
	})
	title: string;

	@Column({
		type: 'varchar',
		nullable: true
	})
	description: string;

	@Column({
		type: 'varchar',
		nullable: true
	})
	password: string;

	@Column({
		type: "varchar",
		default: "public"
	})
	status: string;

	@CreateDateColumn()
	creation: Date;

	@UpdateDateColumn()
	update: Date;
}
