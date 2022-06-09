import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn } from "typeorm"

@Entity("user_in_channel")
export default class UserInChannel extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column({
		type: 'int'
	})
	user_id: number;

	@Column({
		type: 'int'
	})
	channel_id: number;

	@Column({
		type: 'varchar',
		nullable: false,
		default: 'member'
	})
	rank: string;

	@Column({
		type: "varchar",
		nullable: true,
		default: "active"
	})
	status: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
