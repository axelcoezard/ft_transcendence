import { title } from "process";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { Users } from "./Users"

	@OneToMany(
		() => Users,
		users => users.avatars
	)
	users: Users[];

	@Column({
		type: "varchar"
	})
	title: string;

	@Column({
		type: "varchar"
	})
	uri: title;

	@CreateDateColumn()
	creation: Date;

	@UpdateDateColumn()
	updated: Date;
}