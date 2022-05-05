import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Messages } from "./Messages";
import { Avatars } from "./Avatars";

@Entity('users')
export class Users extends BaseEntity {

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
	FA_status: boolean;

	@Column({
		type: 'boolean'
	})
	FA_secret: boolean;

	@Column({
		type: 'int'
	})
	ELO_score: number;

	@OneToMany(
		() => Messages,
		messages => messages.users
	)
	messages: Messages[];

	@ManyToOne(
		() => Avatars,
		avatars => avatars.users
	)
	@JoinColumn({
		name: 'avatars'
	})
	users: Users;

	@CreateDateColumn()
	creation: Date;

	@UpdateDateColumn()
	update: Date;

}