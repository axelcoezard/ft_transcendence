import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"
import { Users } from "./Users"

@Entity(Channels)
export class channels extends BaseEntity {
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