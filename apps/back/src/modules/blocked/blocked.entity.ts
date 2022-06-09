import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, OneToMany, JoinTable } from "typeorm"

@Entity("blocked")
export default class Blocked extends BaseEntity {
	@PrimaryGeneratedColumn()
    id: number;

	@Column()
	user_id: number;

	@Column()
	blocked_id: number;

	@CreateDateColumn()
	created_at: Date;

	@UpdateDateColumn()
	updated_at: Date;
}
