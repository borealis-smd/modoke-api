import * as LevelRepo from "../models/level";

export const getLevelById = async (level_id: number) => {
  return LevelRepo.getLevelById(level_id);
};

export const getLevels = async () => {
  return LevelRepo.getLevels();
};
