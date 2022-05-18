import { type } from "os";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import {  User } from "../user/user.entity"


@Entity("Message")
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		type => UserEntity,
		(user) => user.messages
	)
	user: UserEntity;

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
