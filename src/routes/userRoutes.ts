import * as UserController from "../controllers/userController";
import { FastifyInstance } from "fastify";

export default function UserRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.post(
    "/",
    {
      schema: {
        description: "Cadastrar um novo usuário",
        body: {
          type: "object",
          properties: {
            user: {
              type: "object",
              required: ["first_name", "last_name", "level_id"],
              properties: {
                first_name: { type: "string", examples: ["John"] },
                last_name: { type: "string", examples: ["Doe"] },
                avatar_url: {
                  type: "string",
                  examples: ["https://www.example.com/avatar.jpg"],
                },
                level_id: { type: "number", examples: [1] },
              },
            },
            login: {
              type: "object",
              properties: {
                email: { type: "string", examples: ["jhon.doe@gmail.com"] },
                password: { type: "string", examples: ["Jhon@123"] },
              },
            },
          },
        },
        response: {
          200: {
            type: "array",
            items: {
              type: "object",
              properties: {
                // user_id: {
                //   type: "string",
                //   examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
                // },
                first_name: { type: "string", examples: ["John"] },
                last_name: { type: "string", examples: ["Doe"] },
                xp: { type: "number", examples: [0] },
                level_id: { type: "number", examples: [1] },
                created_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
                updated_at: {
                  type: "string",
                  examples: ["2024-08-04 16:21:21.921"],
                },
              },
            },
          },
        },
        tags: ["User"],
      },
    },
    UserController.registerUser,
  );

  app.post(
    "/login",
    {
      schema: {
        description: "Realizar login",
        body: {
          type: "object",
          required: ["email", "password"],
          properties: {
            email: { type: "string", examples: ["john.doe@gmail.com"] },
            password: { type: "string", examples: ["Jhon@123"] },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              token: {
                type: "string",
                examples: [
                  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyX2lkIjoiMGZmM2I4NmYtYTdkZS00NTE5LTllNTktMTAxZGI4YzNhOGYzIiwiaWF0IjoxNjI5NzA3NjQ3LCJleHAiOjE2Mjk3MTExMDd9.6L9r0H7F8G5Pw4l7d0J4Zd7X0z0kF0R4Z0n0e0W4",
                ],
              },
            },
          },
        },
        tags: ["User"],
      },
    },
    UserController.logIn,
  );

  app.get(
    ":email",
    {
      schema: {
        description: "Buscar usuário por email",
        querystring: {
          email: { type: "string", examples: ["john.doe@example.com"] },
        },
        response: {
          200: {
            type: "object",
            properties: {
              // user_id: {
              //   type: "string",
              //   examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              // },
              first_name: { type: "string", examples: ["John"] },
              last_name: { type: "string", examples: ["Doe"] },
              xp: { type: "number", examples: [0] },
              level_id: { type: "number", examples: [1] },
              created_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
              updated_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
            },
          },
        },
        tags: ["User"],
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    UserController.getUserByEmail,
  );

  app.put(
    ":user_id",
    {
      schema: {
        description: "Atualizar informações de um usuário",
        querystring: {
          user_id: {
            type: "string",
            examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
          },
        },
        body: {
          type: "object",
          properties: {
            user: {
              type: "object",
              anyOf: [
                { required: ["first_name"] },
                { required: ["last_name"] },
                { required: ["level_id"] },
              ],
              properties: {
                first_name: { type: "string", examples: ["John"] },
                last_name: { type: "string", examples: ["Doe"] },
                level_id: { type: "number", examples: [1] },
              },
            },
          },
        },
        response: {
          200: {
            type: "object",
            properties: {
              // user_id: {
              //   type: "string",
              //   examples: ["0ff3b86f-a7de-4519-9e59-101db8c3a8f3"],
              // },
              first_name: { type: "string", examples: ["John"] },
              last_name: { type: "string", examples: ["Doe"] },
              xp: { type: "number", examples: [0] },
              level_id: { type: "number", examples: [1] },
              created_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
              updated_at: {
                type: "string",
                examples: ["2024-08-04 16:21:21.921"],
              },
            },
          },
        },
        tags: ["User"],
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    UserController.updateUser,
  );

  app.put(
    "/password",
    {
      schema: {
        description: "Atualizar senha do usuário",
        body: {
          type: "object",
          required: ["email", "oldPassword", "newPassword"],
          properties: {
            email: { type: "string", examples: ["john.doe@example.com"] },
            oldPassword: { type: "string", examples: ["Jhon@123"] },
            newPassword: { type: "string", examples: ["Jhon@1234"] },
          },
        },
        response: {
          204: {
            type: "null",
          },
        },
        tags: ["User"],
        security: [
          {
            bearerAuth: [],
          },
        ],
      },
    },
    UserController.updatePassword,
  );

  done();
}
