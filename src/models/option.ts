import { prisma } from "../config/db";
import { OptionsCreate } from "../validators/optionsValidator";
import { MaxOptionsReachedError } from "../errors/MaxOptionsReachedError";
import { CorrectOptionAlreadyExistsError } from "../errors/CorrectOptionAlreadyExistsError";
import { MissingCorrectOptionError } from "../errors/MissingCorrectOptionError";

export const createOption = async (option: OptionsCreate) => {
  const options = await prisma.option.findMany({
    where: {
      question_id: option.question_id,
    },
  });
  if (options.length >= 4) {
    throw new MaxOptionsReachedError(
      "Já existem 4 alternativas para essa questão.",
    );
  }

  const correctOption = options.find((opt) => opt.is_correct);
  if (option.is_correct && correctOption) {
    throw new CorrectOptionAlreadyExistsError(
      "Esta questão já possui uma alternativa correta.",
    );
  } else if (!option.is_correct && !correctOption) {
    throw new MissingCorrectOptionError(
      "Deve haver uma alternativa correta para essa questão.",
    );
  }

  return prisma.option.create({
    data: {
      option_text: option.option_text,
      is_correct: option.is_correct,
      question_id: option.question_id,
    },
  });
};
