import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { User } from "../user/user.entity"

@Entity("Channel")
export class Channel extends BaseEntity {
	//id
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
