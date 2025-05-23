import { Repository } from "typeorm";
import { Player } from "../model/Player";

export class PlayerService {
  private playerRepository: Repository<Player>;

  constructor(playerRepository: Repository<Player>) {
    this.playerRepository = playerRepository;
  }

  async insert(player: Player): Promise<Player> {
    if (!player.name || !player.email) {
      throw { id: 400, msg: "Missing required fields: name and email" };
    }
    return await this.playerRepository.save(player);
  }

  async list(): Promise<Player[]> {
    return await this.playerRepository.find();
  }

  async findById(id: number): Promise<Player> {
    const player = await this.playerRepository.findOneBy({ id: id });
    if (!player) {
      throw { id: 404, msg: "Player not found" };
    }
    return player;
  }

  async update(id: number, player: Partial<Player>): Promise<Player> {
    if (!player.name || !player.email) {
      throw { id: 400, msg: "Missing required fields: name or email" };
    }

    const playerAlt = await this.playerRepository.findOneBy({ id: id });

    if (!playerAlt) {
      throw { id: 404, msg: "Player not found" };
    } else {
      playerAlt.name = player.name;
      playerAlt.email = player.email;
      return await this.playerRepository.save(playerAlt);
    }
  }

  async delete(id: number): Promise<Player> {
    const playerDelete = await this.playerRepository.findOneBy({ id: id });
    if (!playerDelete) {
      throw { id: 404, msg: "Player not found" };
    } else {
      await this.playerRepository.remove(playerDelete);
      return playerDelete;
    }
  }
}
