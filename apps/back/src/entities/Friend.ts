import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable } from "typeorm"
import { User } from "../user/user.entity"

@Entity("Friend")
export class Friend extends BaseEntity {
	@PrimaryGeneratedColumn({
		type: 'number'
	})
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
}
