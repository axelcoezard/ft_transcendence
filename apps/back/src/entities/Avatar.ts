import { title } from "process";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { User } from "./user.entity"

@Entity("Avatar")
export class Avatar extends BaseEntity {
	@PrimaryGeneratedColumn()
    id: number;

	@OneToMany(
		() => User,
		users => users.avatar_id
	)
	users: User[];

	@Column({
		type: "varchar"
	})
	title: string;

	@Column({
		type: "varchar"
	})
	uri: typeof title;

	@CreateDateColumn()
	creation: Date;

	@UpdateDateColumn()
	updated: Date;
}
