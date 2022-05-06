import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, ManyToOne, JoinColumn } from "typeorm"
import { Message } from "./Message";
import { Avatar } from "./Avatar";

@Entity("User")
export class User extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({
		type: 'varchar'
	})
    username: string;

	@Column({
		type: 'varchar'
	})
	email: string;

	@Column({
		type: 'int'
	})
	avatar_id: number;

	@Column({
		type: 'int'
	})
	rank: number;

	@Column({
		type: 'varchar'
	})
	status: string;

	@Column({
		type: 'boolean'
	})
	"2FA_status": boolean;

	@Column({
		type: 'boolean'
	})
	"2FA_secret": boolean;

	@Column({
		type: 'int'
	})
	ELO_score: number;

	@OneToMany(
		() => Message,
		messages => messages.users
	)
	messages: Message[];

	@ManyToOne(
		() => Avatar,
		avatars => avatars.users
	)
	@JoinColumn({
		name: 'avatars'
	})
	users: User[];

	@CreateDateColumn()
	creation: Date;

	@UpdateDateColumn()
	update: Date;

}
