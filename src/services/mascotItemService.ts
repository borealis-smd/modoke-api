import * as MascotItemRepo from "../models/mascotItem";
import { MascotItemsCreate } from "../validators/mascotItemsValidator";

export const getAllMascotItems = async () => {
  return MascotItemRepo.getAllMascotItems();
};

export const getMascotItemsAcquiredByUserId = async (user_id: string) => {
  return MascotItemRepo.getMascotItemsAcquiredByUserId(user_id);
};

export const getMascotItemById = async (mascot_items_id: number) => {
  return MascotItemRepo.getMascotItemById(mascot_items_id);
};

export const createMascotItem = async (mascotItem: MascotItemsCreate) => {
  return MascotItemRepo.createMascotItem(mascotItem);
};

export const buyMascotItem = async (
  user_id: string,
  mascot_items_id: number,
) => {
  return MascotItemRepo.buyMascotItem(user_id, mascot_items_id);
};

export const equipMascotItem = async (
  mascot_items_id: number,
  mascot_image_url: string,
  mascot_id: number,
) => {
  return MascotItemRepo.equipMascotItem(mascot_items_id, mascot_image_url, mascot_id);
};
