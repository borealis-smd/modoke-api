import * as UnitRepo from "../models/units";
import { UnitNotFoundError } from "../errors/UnitNotFoundError";
import { UnitsCreate } from "../validators/unitsValidator";

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

export const getUnitsBySeçionId = async (section_id: number) => {
  const units = UnitRepo.getUnitsBySeçionId(section_id);
  if (!units) {
    throw new UnitNotFoundError("Unit not found");
  }
  return units;
};

export const createUnit = async (unit: UnitsCreate) => {
  return UnitRepo.createUnit(unit);
};

export const finishUnit = async (unit_id: number) => {
  return UnitRepo.finishUnit(unit_id);
};
