import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm"

@Entity("avatar")
export default class Avatar extends BaseEntity {
	@PrimaryGeneratedColumn()
    id: number;

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
