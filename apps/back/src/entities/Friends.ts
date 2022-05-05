import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Users } from "./Users"

@Entity('friends')
export class Friends extends BaseEntity {
	@PrimaryGeneratedColumn({
		type: 'number'
	})
	id: number;
	@ManyToMany(
		()=> Friends
	)

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
	users: Users[]

	@Column({
		type: 'varchar'
	})
	status: string;
}