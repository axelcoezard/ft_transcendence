import { type } from "os";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm"
import {  User } from "./user.entity"


@Entity("Message")
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		type => User,
		(user) => user.messages
	)
	sender_id: User;

	@Column({

	})
	recipient_table: string;

	@Column({
		type: 'int'
	})
	recipient_id: number;

	@Column({
		type: 'varchar'
	})
	type: string;

	@Column({
		type: "varchar"
	})
	value: string;

	@CreateDateColumn()
	creation: Date;

	@UpdateDateColumn()
	update: Date;
}
