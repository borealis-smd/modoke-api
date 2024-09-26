import * as UnitRepo from "../models/units";
import { UnitNotFoundError } from "../errors/UnitNotFoundError";
import { UnitsCreate } from "../validators/unitsValidator";
import { UnitAlreadyInProgressError } from "../errors/UnitAlreadyInProgressError";

export const getUnits = async () => {
  return UnitRepo.getUnits();
};

export const getUnitById = async (unit_id: number) => {
  const unit = UnitRepo.getUnitById(unit_id);
  if (!unit) {
    throw new UnitNotFoundError("Unit not found");
  }
  return unit;
};

export const getUnitsBySectionId = async (
  section_id: number,
  user_id: string,
) => {
  const units = UnitRepo.getUnitsBySectionId(section_id, user_id);
  if (!units) {
    throw new UnitNotFoundError("Unit not found");
  }
  return units;
};

export const getInProgressUnitByUserId = async (user_id: string) => {
  return UnitRepo.getInProgressUnitByUserId(user_id);
};

export const createUnit = async (unit: UnitsCreate) => {
  return UnitRepo.createUnit(unit);
};

export const startUnit = async (unit_id: number, user_id: string) => {
  const unitInProgress = await UnitRepo.getInProgressUnitByUserId(user_id);
  if (unitInProgress) {
    throw new UnitAlreadyInProgressError(
      "Só é possível ter uma unidade em progresso por vez.",
    );
  }
  return UnitRepo.startUnit(unit_id, user_id);
};

export const unlockUnit = async (cur_unit_id: number, user_id: string) => {
  const unitInProgress = await UnitRepo.getInProgressUnitByUserId(user_id);
  if (unitInProgress) {
    throw new UnitAlreadyInProgressError(
      "Só é possível ter uma unidade em progresso por vez.",
    );
  }
  return UnitRepo.unlockUnit(cur_unit_id, user_id);
};

export const finishUnit = async (unit_id: number, user_id: string) => {
  return UnitRepo.finishUnit(unit_id, user_id);
};
