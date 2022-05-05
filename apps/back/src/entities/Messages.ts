import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Users } from "./Users"

@Entity('messages')
export class Messages extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@ManyToOne(
		() => Users,
		users => users.messages
	)
	@JoinColumn({
		name: 'username'
	})
	users: Users;
	//recipient_id

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