import { Repository } from "typeorm";
import { Pitch } from "../model/Pitch";

export class PitchService {
  private pitchRepository: Repository<Pitch>;

  constructor(playerRepository: Repository<Pitch>) {
    this.pitchRepository = playerRepository;
  }

  async insert(pitch: Pitch): Promise<Pitch> {
    if (!pitch.name) {
      throw { id: 400, msg: "Missing required fields: name" };
    }
    return await this.pitchRepository.save(pitch);
  }

  async list(): Promise<Pitch[]> {
    return await this.pitchRepository.find();
  }

  async findById(id: number): Promise<Pitch> {
    const pitch = await this.pitchRepository.findOneBy({ id: id });
    if (!pitch) {
      throw { id: 404, msg: "Pitch not found" };
    }
    return pitch;
  }

  async delete(id: number): Promise<Pitch> {
    const pitchDelete = await this.pitchRepository.findOneBy({ id: id });
    if (!pitchDelete) {
      throw { id: 404, msg: "Pitch not found" };
    } else {
      await this.pitchRepository.remove(pitchDelete);
      return pitchDelete;
    }
  }
}
