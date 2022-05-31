import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./user.entity"

@Entity("channel")
export default class Channel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'int'
	})
	creator_id: number;

	@Column({
		type: 'varchar',
		unique: true
	})
	slug: string;

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
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
