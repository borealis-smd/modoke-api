import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  // Dados de exemplo para o modelo Level
  const level = await prisma.level.createMany({
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
  const user = await prisma.user.create({
    data: {
      user_id: "0f52361f-ee67-440b-8b61-477732092aaf",
      first_name: "John",
      last_name: "Doe",
      xp: 0,
      coins: 0,
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

  // Dados de exemplo para o modelo Sessions
  const session = await prisma.sessions.create({
    data: {
      session_id: 1,
      session_title: "Session 1",
      session_description: "Description for session 1",
      is_completed: false,
      level_id: 1,
    },
  });

  // Dados de exemplo para o modelo Units
  const unit = await prisma.units.create({
    data: {
      unit_id: 1,
      unit_title: "Unit 1",
      unit_description: "Description for unit 1",
      is_completed: false,
      session_id: 1,
    },
  });

  // Dados de exemplo para o modelo Lessons
  const lesson = await prisma.lessons.create({
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
  const question = await prisma.questions.create({
    data: {
      question_id: 1,
      question_text: "What is 2 + 2?",
      is_entrance_question: false,
      xp: 10,
      lesson_id: 1,
    },
  });

  // Dados de exemplo para o modelo Options
  const option = await prisma.options.create({
    data: {
      option_id: 1,
      option_text: "4",
      is_correct: true,
      question_id: 1,
    },
  });

  // Dados de exemplo para o modelo Attempts
  const attempt = await prisma.attempts.create({
    data: {
      attempt_id: 1,
      user_id: "0f52361f-ee67-440b-8b61-477732092aaf",
      question_id: 1,
      selected_option_id: 1,
      attempted_at: new Date(),
    },
  });

  // Dados de exemplo para o modelo Mascot
  const mascot = await prisma.mascot.create({
    data: {
      mascot_id: 1,
      mascot_image_url: "http://example.com/mascot.png",
      user_id: "0f52361f-ee67-440b-8b61-477732092aaf",
    },
  });

  // Dados de exemplo para o modelo MascotItems
  const mascotItem = await prisma.mascotItems.create({
    data: {
      mascot_items_id: 1,
      item_name: "Hat",
      item_image_url: "http://example.com/hat.png",
      isEquipped: false,
    },
  });

  // Dados de exemplo para o modelo MascotHasMascotItems
  const mascotHasMascotItems = await prisma.mascotHasMascotItems.create({
    data: {
      mascot_has_mascot_items_id: "mascot-item-1",
      mascot_id: 1,
      mascot_items_id: 1,
      acquired_at: new Date(),
    },
  });

  // Dados de exemplo para o modelo Badges
  const badge = await prisma.badges.create({
    data: {
      badge_id: 1,
      badge_name: "First Badge",
      badge_image_url: "http://example.com/badge.png",
      unit_id: 1,
    },
  });

  // Dados de exemplo para o modelo UserHasBadge
  const userHasBadge = await prisma.userHasBadge.create({
    data: {
      user_has_badge_id: "user-badge-1",
      badge_id: 1,
      user_id: "0f52361f-ee67-440b-8b61-477732092aaf",
      acquired_at: new Date(),
    },
  });

  // Dados de exemplo para o modelo Certificates
  const certificate = await prisma.certificates.create({
    data: {
      certificate_id: 1,
      certificate_text: "Certificate of Completion",
      session_id: 1,
    },
  });

  // Dados de exemplo para o modelo UserHasCertificate
  const userHasCertificate = await prisma.userHasCertificate.create({
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
