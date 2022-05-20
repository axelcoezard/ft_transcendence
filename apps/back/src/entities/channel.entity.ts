import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "./user.entity"

@Entity("Channel")
export class Channel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;
	//creator
	@Column({
		type: 'varchar'
	})
	title: string;

	@Column({
		type: 'varchar'
	})
	description: string;

	@Column({
		type: 'varchar'
	})
	password: string;

	@Column({
		type: "varchar"
	})
	status: string;

	@CreateDateColumn()
	creation: Date;

	@UpdateDateColumn()
	update: Date;
}
