import * as GoogleAuthController from "../controllers/googleAuthController";
import { FastifyInstance } from "fastify";

export default function GoogleAuthRoutes(
  app: FastifyInstance,
  options: any,
  done: Function,
) {
  app.post(
    "/login",
    {
      schema: {
        description: "Realizar login com Google",
        body: {
          type: "object",
          required: ["email"],
          properties: {
            email: { type: "string", examples: ["john.doe@gmail.com"] },
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
        tags: ["Google Auth"],
      },
    },
    GoogleAuthController.login,
  );

  app.post(
    "/register",
    {
      schema: {
        description: "Cadastrar-se com Google",
        body: {
          type: "object",
          properties: {
            user: {
              type: "object",
              required: ["first_name", "level_id"],
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
                is_google_user: { type: "boolean", examples: [false] },
              },
            },
          },
        },
        response: {
          201: {
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
        tags: ["Google Auth"],
      },
    },
    GoogleAuthController.register,
  );

  done();
}
