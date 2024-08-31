import { prisma } from "../config/db";
import {
  SystemPreferencesCreate,
  SystemPreferencesUpdate,
} from "../validators/systemPreferencesValidator";

export const getSystemPreferencesByUserId = async (user_id: string) => {
  return prisma.systemPreferences.findUnique({
    where: { user_id },
  });
};

export const createSystemPreferences = async (
  preferences: SystemPreferencesCreate,
) => {
  return prisma.systemPreferences.create({
    data: {
      font_size: preferences.font_size,
      theme: preferences.theme,
      is_high_contrast: preferences.is_high_contrast,
      sound: preferences.sound,
      user_id: preferences.user_id,
    },
  });
};

export const updateSystemPreferences = async (
  preferences: SystemPreferencesUpdate,
  user_id: string,
) => {
  return prisma.systemPreferences.update({
    where: { user_id: user_id },
    data: preferences,
  });
};
