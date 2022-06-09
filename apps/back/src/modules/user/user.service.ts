import {Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import AvatarService from '../avatar/avatar.service';

import User from './user.entity';

@Injectable()
export default class UserService {
	constructor(
		@InjectRepository(User)
		public userRepository: Repository<User>,
	) {}

	@Inject(AvatarService)
	public readonly avatars: AvatarService;

	async getUsers(): Promise<User[]> {
		return await this.userRepository.find();
	}

	async getUser(id: number): Promise<User> {
		return await this.userRepository.findOne({id});
	}

	async addUser(user: User): Promise<User> {
		const newUser = this.userRepository.create(user);
		await this.userRepository.save(newUser);
		return newUser;
	}

	async updateUser(id: number, user: any): Promise<User> {
		const newUser = await this.userRepository.preload({
			id,
			...user
		})
		return await this.userRepository.save(newUser);
	}

	async updateUsername(id: number, username: string): Promise<any> {
		if (!username)
			return {error: "Veuillez entrer un pseudo"}
		if (username.length < 5)
			return {error: "Le pseudo doit contenir au moins 5 caractères"}
		if (username.length > 10)
			return {error: "Le pseudo doit contenir au maximum 10 caractères"}
		if (!/^[a-zA-Z]+$/.test(username))
			return {error: "Le pseudo ne peut contenir que des lettres"}

		return await this.userRepository.query(
			`UPDATE "user" SET "username" = $1 WHERE id = $2;`,
			[username, id]
		);
	}

	async getElo(id: number): Promise<User> {
		return await this.userRepository.query(
			`SELECT "ELO_score" FROM "user" WHERE id = $1;`,
			[id]
		);
	}

	async updateElo(id: number, elo: number): Promise<User> {
		return await this.userRepository.query(
			`UPDATE "user" SET "ELO_score" = $1 WHERE id = $2;`,
			[elo, id]
		);
	}

	async updateAvatar(id: number, avatar_id: string): Promise<User> {
		return await this.userRepository.query(
			`UPDATE "user" SET "avatar_id" = $1 WHERE id = $2;`,
			[avatar_id, id]
		);
	}

	async updatePaddleColor(id: number, paddle_color: string): Promise<any> {
		return await this.userRepository.query(
			`UPDATE "user" SET "color_paddle" = $1 WHERE id = $2;`,
			[paddle_color, id]
		);
	}

	async updateBallColor(id: number, ball_color: string): Promise<any> {
		return await this.userRepository.query(
			`UPDATE "user" SET "color_ball" = $1 WHERE id = $2;`,
			[ball_color, id]
		);
	}

	async searchUser(username: string): Promise<any> {
		let res = await this.userRepository.query(
			`SELECT
				"id",
				"username"
			FROM "user"
			WHERE "username" LIKE $1;`,
			[`%${username}%`]
		);
		return res;
	}

	async getRanking(): Promise<any> {
		return await this.userRepository.query(
			`SELECT
				"id",
				"username",
				"ELO_score"
			FROM "user"
			ORDER BY "ELO_score" DESC;`,
		[]);
	}

	async getUserChannels(id: number): Promise<any> {
		return await this.userRepository.query(
			`SELECT
				c.id,
				c.name,
				c.slug,
				c.creator_id,
				c.status,
				c.created_at,
				c.updated_at
			FROM "channel" as c
				INNER JOIN "user_in_channel" as uic ON c.id = uic.channel_id
			WHERE uic.user_id = $1`,
		[id])
	}

	async getFriends(id: number): Promise<any> {
		return await this.userRepository.query(
			`SELECT
				u.id,
				u.username
			FROM friend as f
				INNER JOIN "user" as u ON f.friend_id = u.id
			WHERE f.user_id = $1`,
		[id])
	}

	async addFriend(id: number, friend_id: number | undefined): Promise<any> {
		if (!friend_id)
			return {error: "Veuillez choisir un utilisateur comme ami"}
		if (id === friend_id)
			return {error: "Vous ne pouvez pas vous ajouter vous-même comme ami"}
		return await this.userRepository.query(
			`INSERT INTO "friend" ("user_id", "friend_id") VALUES ($1, $2);`,
		[id, friend_id])
	}

	async removeFriend(id: number, friend_id: number | undefined): Promise<any> {
		if (!friend_id)
			return {error: "Veuillez choisir un utilisateur comme ami"}
		return await this.userRepository.query(
			`DELETE FROM "friend" WHERE "user_id" = $1 AND "friend_id" = $2;`,
		[id, friend_id])
	}

	async getBlockeds(id: number): Promise<any> {
		return await this.userRepository.query(
			`SELECT
				u.id,
				u.username
			FROM blocked as b
				INNER JOIN "user" as u ON b.blocked_id = u.id
			WHERE b.user_id = $1`,
		[id])
	}

	async addBlocked(id: number, blocked_id: number | undefined): Promise<any> {
		if (!blocked_id)
			return {error: "Veuillez choisir un utilisateur a bloquer"}
		if (id === blocked_id)
			return {error: "Vous ne pouvez pas vous bloquer vous-même"}
		return await this.userRepository.query(
			`INSERT INTO "blocked" ("user_id", "blocked_id") VALUES ($1, $2);`,
		[id, blocked_id])
	}

	async removeBlocked(id: number, blocked_id: number | undefined): Promise<any> {
		if (!blocked_id)
			return {error: "Veuillez choisir un utilisateur a debloquer"}
		return await this.userRepository.query(
			`DELETE FROM "blocked" WHERE "user_id" = $1 AND "blocked_id" = $2;`,
		[id, blocked_id])
	}

	async getUserStats(id: number): Promise<any>
	{
		let nb_games = parseInt((await this.userRepository.query(
			`SELECT COUNT(*) as "nb_games" FROM(SELECT id FROM game WHERE user1_id = $1 OR user2_id = $1) as g;`,
			[id]
		))[0].nb_games);

		let nb_wins = parseInt((await this.userRepository.query(
			`SELECT
				COUNT(*) as "nb_wins"
			FROM
				((SELECT id FROM game as g1 WHERE g1.user1_id = $1 AND g1.user1_score > g1.user2_score)
				UNION
				(SELECT id FROM game as g2 WHERE g2.user2_id = $1 AND g2.user2_score > g2.user1_score)) as wins;`,
			[id]
		))[0].nb_wins);

		return {
			nb_games,
			nb_wins,
			nb_loses: nb_games - nb_wins
		}
	}

	async setStatus(id: number, status: string): Promise<any> {
		return await this.userRepository.query(
			`UPDATE "user" SET "status" = $1 WHERE id = $2;`,
			[status, id]
		);
	}
}
