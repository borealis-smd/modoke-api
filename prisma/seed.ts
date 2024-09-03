import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Dados de exemplo para o modelo Level
  await prisma.level.createMany({
    data: [
      {
        level_id: 1,
        name: "A",
        description: "Beginner level",
      },
      {
        level_id: 2,
        name: "AA",
        description: "Intermediate level",
      },
      {
        level_id: 3,
        name: "AAA",
        description: "Advanced level",
      },
    ],
  });

  // Dados de exemplo para o modelo User
  await prisma.user.create({
    data: {
      user_id: "0f52361f-ee67-440b-8b61-477732092aaf",
      first_name: "John",
      last_name: "Doe",
      avatar_url: "http://example.com/avatar.png",
      xp: 0,
      coins: 0,
      role: "USER",
      level_id: 1,
      Login: {
        create: {
          login_id: "7af39adc-4d00-42c9-bb47-e0e622e05bf7",
          email: "john.doe@example.com",
          password_hash: "hashedpassword",
        },
      },
    },
  });

  // Dados de exemplo para o modelo Seçions
  await prisma.sections.create({
    data: {
      section_id: 1,
      section_title: "Seçion 1",
      section_description: "Description for section 1",
      is_completed: false,
      level_id: 1,
    },
  });

  // Dados de exemplo para o modelo Units
  await prisma.units.create({
    data: {
      unit_id: 1,
      unit_title: "Unit 1",
      unit_description: "Description for unit 1",
      is_completed: false,
      section_id: 1,
    },
  });

  // Dados de exemplo para o modelo Lessons
  await prisma.lessons.create({
    data: {
      lesson_id: 1,
      lesson_title: "Lesson 1",
      lesson_description: "Description for lesson 1",
      lesson_principle: "P",
      is_completed: false,
      unit_id: 1,
    },
  });

  // Dados de exemplo para o modelo Questions
  await prisma.questions.create({
    data: {
      question_id: 1,
      question_text: "What is 2 + 2?",
      is_entrance_question: false,
      xp: 10,
      lesson_id: 1,
    },
  });

  // Dados de exemplo para o modelo Options
  await prisma.options.create({
    data: {
      option_id: 1,
      option_text: "4",
      is_correct: true,
      question_id: 1,
    },
  });

  // Dados de exemplo para o modelo Attempts
  await prisma.attempts.create({
    data: {
      attempt_id: 1,
      user_id: "0f52361f-ee67-440b-8b61-477732092aaf",
      question_id: 1,
      selected_option_id: 1,
      attempted_at: new Date(),
    },
  });

  // Dados de exemplo para o modelo Mascot
  await prisma.mascot.create({
    data: {
      mascot_id: 1,
      mascot_image_url: "http://example.com/mascot.png",
      user_id: "0f52361f-ee67-440b-8b61-477732092aaf",
    },
  });

  // Dados de exemplo para o modelo MascotItems
  await prisma.mascotItems.create({
    data: {
      mascot_items_id: 1,
      item_name: "Hat",
      item_image_url: "http://example.com/hat.png",
      isEquipped: false,
    },
  });

  // Dados de exemplo para o modelo MascotHasMascotItems
  await prisma.mascotHasMascotItems.create({
    data: {
      mascot_has_mascot_items_id: "mascot-item-1",
      mascot_id: 1,
      mascot_items_id: 1,
      acquired_at: new Date(),
    },
  });

  // Dados de exemplo para o modelo Badges
  await prisma.badges.create({
    data: {
      badge_id: 1,
      badge_name: "First Badge",
      badge_image_url: "http://example.com/badge.png",
      unit_id: 1,
    },
  });

  // Dados de exemplo para o modelo UserHasBadge
  await prisma.userHasBadge.create({
    data: {
      user_has_badge_id: "user-badge-1",
      badge_id: 1,
      user_id: "0f52361f-ee67-440b-8b61-477732092aaf",
      acquired_at: new Date(),
    },
  });

  // Dados de exemplo para o modelo Certificates
  await prisma.certificates.create({
    data: {
      certificate_id: 1,
      certificate_text: "Certificate of Completion",
      section_id: 1,
    },
  });

  // Dados de exemplo para o modelo UserHasCertificate
  await prisma.userHasCertificate.create({
    data: {
      user_has_certificate_id: "user-certificate-1",
      user_id: "0f52361f-ee67-440b-8b61-477732092aaf",
      certificate_id: 1,
      acquired_at: new Date(),
    },
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
