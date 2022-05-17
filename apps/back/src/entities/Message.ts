import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "../user/user.entity"

@Entity("Message")
export class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	/*@ManyToOne(
		() => User,
		users => users.messages
	)

	@JoinColumn({
		name: 'username'
	})
	users: User[];
	//recipient_id*/

	//recipient_table
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
