import { prisma } from "../config/db";
import { MascotCreate } from "../validators/mascotValidator";

export const getMascotByUserId = async (user_id: string) => {
  return prisma.mascot.findUnique({
    where: { user_id },
  });
};

export const createMascot = async (mascot: MascotCreate) => {
  return prisma.mascot.create({
    data: {
      mascot_image_url: mascot.mascot_image_url,
      user_id: mascot.user_id,
    },
  });
};
