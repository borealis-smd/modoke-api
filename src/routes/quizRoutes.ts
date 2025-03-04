import * as QuizController from "../controllers/quizController";
import { FastifyInstance } from "fastify";
import { verifyTokenMiddleware } from "../middleware/authMiddleware";
import { QuizQuestion } from "../data-structures/QuizQuestionList";

export default function QuizRoutes(
  app: FastifyInstance,
  options: any,
  done: Function
) {
  app.get(
    "/initialize/lesson",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Inicializar um quiz para uma lição",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              currentQuestion: {
                type: "object",
                properties: {
                  question_id: {
                    type: "string",
                    examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                  },
                  question_text: {
                    type: "string",
                    examples: ["Qual a cor do céu?"],
                  },
                  xp: { type: "number", examples: [10] },
                  lesson_id: { type: "number", examples: [1] },
                  Options: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        option_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                        option_text: {
                          type: "string",
                          examples: ["Azul"],
                        },
                        question_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                      },
                    },
                  },
                  userAnswer: {
                    type: "string",
                    nullable: true,
                    examples: [null],
                  },
                },
              },
              progress: {
                type: "object",
                properties: {
                  answered: { type: "number", examples: [0] },
                  total: { type: "number", examples: [10] },
                },
              },
              hasNext: { type: "boolean", examples: [true] },
              currentIndex: { type: "number", examples: [0] },
            },
          },
        },
        tags: ["Quiz"],
        security: [{ bearerAuth: [] }],
      },
    },
    QuizController.initializeQuiz
  );

  app.get(
    "/initialize/unit",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Inicializar um quiz para uma unidade",
        querystring: {
          unit_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              currentQuestion: {
                type: "object",
                properties: {
                  question_id: {
                    type: "string",
                    examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                  },
                  question_text: {
                    type: "string",
                    examples: ["Qual a cor do céu?"],
                  },
                  xp: { type: "number", examples: [10] },
                  lesson_id: { type: "number", examples: [1] },
                  Options: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        option_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                        option_text: {
                          type: "string",
                          examples: ["Azul"],
                        },
                        question_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                      },
                    },
                  },
                  userAnswer: {
                    type: "string",
                    nullable: true,
                    examples: [null],
                  },
                },
              },
              progress: {
                type: "object",
                properties: {
                  answered: { type: "number", examples: [0] },
                  total: { type: "number", examples: [10] },
                },
              },
              hasNext: { type: "boolean", examples: [true] },
              currentIndex: { type: "number", examples: [0] },
            },
          },
        },
        tags: ["Quiz"],
        security: [{ bearerAuth: [] }],
      },
    },
    QuizController.initializeUnitQuiz
  );

  app.get(
    "/initialize/entranceTest",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Inicializar um quiz para o teste de entrada",
        response: {
          200: {
            type: "object",
            properties: {
              currentQuestion: {
                type: "object",
                properties: {
                  question_id: {
                    type: "string",
                    examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                  },
                  question_text: {
                    type: "string",
                    examples: ["Qual a cor do céu?"],
                  },
                  xp: { type: "number", examples: [10] },
                  lesson_id: { type: "number", examples: [1] },
                  Options: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        option_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                        option_text: {
                          type: "string",
                          examples: ["Azul"],
                        },
                        question_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                      },
                    },
                  },
                  userAnswer: {
                    type: "string",
                    nullable: true,
                    examples: [null],
                  },
                },
              },
              progress: {
                type: "object",
                properties: {
                  answered: { type: "number", examples: [0] },
                  total: { type: "number", examples: [10] },
                },
              },
              hasNext: { type: "boolean", examples: [true] },
              currentIndex: { type: "number", examples: [0] },
            },
          },
        },
        tags: ["Quiz"],
        security: [{ bearerAuth: [] }],
      },
    },
    QuizController.initializeEntranceTestQuiz
  );

  app.post(
    "/answer",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Responder uma questão do quiz",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        body: {
          type: "object",
          properties: {
            selected_option_id: {
              type: "string",
              examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              nextQuestion: {
                type: "object",
                nullable: true,
                properties: {
                  question_id: {
                    type: "string",
                    examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                  },
                  question_text: {
                    type: "string",
                    examples: ["Qual a cor do céu?"],
                  },
                  xp: { type: "number", examples: [10] },
                  lesson_id: { type: "number", examples: [1] },
                  Options: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        option_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                        option_text: {
                          type: "string",
                          examples: ["Azul"],
                        },
                        question_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                      },
                    },
                  },
                  userAnswer: {
                    type: "string",
                    nullable: true,
                    examples: [null],
                  },
                },
              },
              progress: {
                type: "object",
                properties: {
                  answered: { type: "number", examples: [1] },
                  total: { type: "number", examples: [10] },
                },
              },
              hasNext: { type: "boolean", examples: [true] },
              isComplete: { type: "boolean", examples: [false] },
              currentIndex: { type: "number", examples: [1] },
            },
          },
        },
        tags: ["Quiz"],
        security: [{ bearerAuth: [] }],
      },
    },
    QuizController.answerQuestion
  );

  app.get(
    "/progress",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Obter progresso do quiz",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              questions: {
                type: "array",
                items: {
                  type: "object",
                  properties: {
                    question_id: {
                      type: "string",
                      examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                    },
                    question_text: {
                      type: "string",
                      examples: ["Qual a cor do céu?"],
                    },
                    xp: { type: "number", examples: [10] },
                    lesson_id: { type: "number", examples: [1] },
                    Options: {
                      type: "array",
                      items: {
                        type: "object",
                        properties: {
                          option_id: {
                            type: "string",
                            examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                          },
                          option_text: {
                            type: "string",
                            examples: ["Azul"],
                          },
                          question_id: {
                            type: "string",
                            examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                          },
                        },
                      },
                    },
                    userAnswer: {
                      type: "string",
                      nullable: true,
                      examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                    },
                  },
                },
              },
              progress: {
                type: "object",
                properties: {
                  answered: { type: "number", examples: [5] },
                  total: { type: "number", examples: [10] },
                },
              },
              isComplete: { type: "boolean", examples: [false] },
              currentIndex: { type: "number", examples: [4] },
            },
          },
        },
        tags: ["Quiz"],
        security: [{ bearerAuth: [] }],
      },
    },
    QuizController.getQuizProgress
  );

  app.post(
    "/navigate",
    {
      preHandler: verifyTokenMiddleware(),
      schema: {
        description: "Navegar entre questões do quiz",
        querystring: {
          lesson_id: { type: "number", examples: [1] },
        },
        body: {
          type: "object",
          properties: {
            direction: {
              type: "string",
              enum: ["next", "previous"],
              examples: ["next"],
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              question: {
                type: "object",
                nullable: true,
                properties: {
                  question_id: {
                    type: "string",
                    examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                  },
                  question_text: {
                    type: "string",
                    examples: ["Qual a cor do céu?"],
                  },
                  xp: { type: "number", examples: [10] },
                  lesson_id: { type: "number", examples: [1] },
                  Options: {
                    type: "array",
                    items: {
                      type: "object",
                      properties: {
                        option_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                        option_text: {
                          type: "string",
                          examples: ["Azul"],
                        },
                        question_id: {
                          type: "string",
                          examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                        },
                      },
                    },
                  },
                  userAnswer: {
                    type: "string",
                    nullable: true,
                    examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                  },
                },
              },
              progress: {
                type: "object",
                properties: {
                  answered: { type: "number", examples: [5] },
                  total: { type: "number", examples: [10] },
                },
              },
              hasNext: { type: "boolean", examples: [true] },
              isComplete: { type: "boolean", examples: [false] },
              currentIndex: { type: "number", examples: [4] },
            },
          },
        },
        tags: ["Quiz"],
        security: [{ bearerAuth: [] }],
      },
    },
    QuizController.navigateQuiz
  );

  done();
}
