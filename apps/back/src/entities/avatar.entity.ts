import { title } from "process";
import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"
import { User } from "./user.entity"

@Entity("avatar")
export class Avatar extends BaseEntity {
	@PrimaryGeneratedColumn()
    id: number;

	@Column({
		type: "varchar",
		nullable: true
	})
	title: string;

	@Column({
		type: "varchar",
		nullable: false
	})
	image: string;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
