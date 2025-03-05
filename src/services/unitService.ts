import * as UnitRepo from "../models/units";
import { UnitNotFoundError } from "../errors/UnitNotFoundError";
import { UnitsCreate } from "../validators/unitsValidator";
import { UnitAlreadyInProgressError } from "../errors/UnitAlreadyInProgressError";
import { UnitLinkedList } from "../data-structures/UnitLinkedList";

// Cache for storing unit linked lists
const sectionUnitsCache = new Map<number, UnitLinkedList>();

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

export const getUnitsBySectionId = async (section_id: number) => {
  // Check cache first
  if (!sectionUnitsCache.has(section_id)) {
    const units = await UnitRepo.getUnitsBySectionId(section_id);
    
    // Create new linked list and populate it
    const unitList = new UnitLinkedList();
    units.forEach((unit) => unitList.append(unit));
    sectionUnitsCache.set(section_id, unitList);
  }

  return sectionUnitsCache.get(section_id)!.toArray();
};

export const getInProgressUnitByUserId = async (user_id: string) => {
  return UnitRepo.getInProgressUnitByUserId(user_id);
};

export const createUnit = async (unit: UnitsCreate) => {
  const newUnit = await UnitRepo.createUnit(unit);

  // Update cache if it exists for the related section
  if (sectionUnitsCache.has(unit.section_id)) {
    sectionUnitsCache.get(unit.section_id)!.append(newUnit);
  }

  return newUnit;
};

export const unlockUnit = async (unit_id: number, user_id: string) => {
  const unitInProgress = await UnitRepo.getInProgressUnitByUserId(user_id);
  if (unitInProgress) {
    throw new UnitAlreadyInProgressError(
      "Só é possível ter uma unidade em progresso por vez.",
    );
  }
  return UnitRepo.unlockUnit(unit_id, user_id);
};

export const finishUnit = async (unit_id: number, user_id: string) => {
  return UnitRepo.finishUnit(unit_id, user_id);
};
