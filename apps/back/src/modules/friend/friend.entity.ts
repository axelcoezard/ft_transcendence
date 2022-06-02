import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable } from "typeorm"
import User from "../user/user.entity"

@Entity("friend")
export default class Friend extends BaseEntity {
	@PrimaryGeneratedColumn()
    id: number;

	@JoinTable({
		name: 'friends',
		joinColumn: {
			name: 'user1_id',
			referencedColumnName: 'id',
		},
		inverseJoinColumn: {
			name: 'users2_id',
			referencedColumnName: 'id',
		},
	})
	users: User[]

	@Column({
		type: 'varchar'
	})
	status: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
