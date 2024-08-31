import * as SystemPreferencesRepo from "../models/systemPreferences";
import {
  SystemPreferencesCreate,
  SystemPreferencesUpdate,
} from "../validators/systemPreferencesValidator";

export const getSystemPreferencesByUserId = async (user_id: string) => {
  return SystemPreferencesRepo.getSystemPreferencesByUserId(user_id);
};

export const createSystemPreferences = async (
  preferences: SystemPreferencesCreate,
) => {
  return SystemPreferencesRepo.createSystemPreferences(preferences);
};

export const updateSystemPreferences = async (
  preferences: SystemPreferencesUpdate,
  user_id: string,
) => {
  return SystemPreferencesRepo.updateSystemPreferences(preferences, user_id);
};
