import { prisma } from "../config/db";
import { MascotItemsCreate } from "../validators/mascotItemsValidator";
import { MascotNotFoundError } from "../errors/MascotNotFoundError";

export const getAllMascotItems = async () => {
  return prisma.mascotItems.findMany();
};

export const getMascotItemsAcquiredByUserId = async (user_id: string) => {
  return prisma.mascotHasMascotItems.findMany({
    where: { Mascot: { user_id } },
    include: {
      MascotItems: true,
    },
  });
};

export const getMascotItemById = async (mascot_items_id: number) => {
  return prisma.mascotItems.findUnique({
    where: { mascot_items_id },
  });
};

export const createMascotItem = async (mascotItem: MascotItemsCreate) => {
  return prisma.mascotItems.create({
    data: {
      item_name: mascotItem.item_name,
      item_image_url: mascotItem.item_image_url,
      isEquipped: false,
    },
  });
};

export const buyMascotItem = async (
  user_id: string,
  mascot_items_id: number,
) => {
  return prisma.$transaction(async (prisma) => {
    const mascot = await prisma.mascot.findUnique({
      where: { user_id },
    });
    if (!mascot) {
      throw new MascotNotFoundError("Mascot not found");
    }

    return prisma.mascotHasMascotItems.create({
      data: {
        mascot_items_id,
        mascot_id: mascot.mascot_id,
        acquired_at: new Date(),
      },
      include: {
        MascotItems: true,
      },
    });
  });
};

export const equipMascotItem = async (
  mascot_items_id: number,
  mascot_image_url: string,
  mascot_id: number,
) => {
  return prisma.$transaction([
    prisma.mascotItems.update({
      where: { mascot_items_id },
      data: {
        isEquipped: true,
      },
    }),
    prisma.mascot.update({
      where: { mascot_id },
      data: {
        mascot_image_url: mascot_image_url,
      },
    }),
  ]);
};
