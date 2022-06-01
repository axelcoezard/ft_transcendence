import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, OneToOne } from "typeorm"

@Entity("message")
export default class Message extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	sender_id: number;

	@Column({
		type: 'int',
		default: -1
	})
	channel_id: number;

	@Column({
		type: 'varchar'
	})
	type: string;

	@Column({
		type: "varchar"
	})
	value: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
