import * as SystemPreferencesService from "../services/systemPreferencesService";
import { FastifyReply, FastifyRequest } from "fastify";
import { extractUserId } from "../utils/extractUserId";
import { handleError } from "../utils/errorHandler";
import {
  SystemPreferencesCreateSchema,
  SystemPreferencesUpdateSchema,
} from "../validators/systemPreferencesValidator";

export const getSystemPreferencesByUserId = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const user_id = extractUserId(request, reply);

    const preferences =
      await SystemPreferencesService.getSystemPreferencesByUserId(user_id);

    reply.code(200).send(preferences);
  } catch (error) {
    handleError(error, reply);
  }
};

export const createSystemPreferences = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const preferences = SystemPreferencesCreateSchema.omit({
      user_id: true,
    }).parse(request.body);

    const user_id = extractUserId(request, reply);

    const createdPreferences =
      await SystemPreferencesService.createSystemPreferences({
        ...preferences,
        user_id,
      });

    reply.code(201).send(createdPreferences);
  } catch (error) {
    handleError(error, reply);
  }
};

export const updateSystemPreferences = async (
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  try {
    const preferences = SystemPreferencesUpdateSchema.parse(request.body);

    const user_id = extractUserId(request, reply);

    const updatedPreferences =
      await SystemPreferencesService.updateSystemPreferences(
        preferences,
        user_id,
      );

    reply.code(200).send(updatedPreferences);
  } catch (error) {
    handleError(error, reply);
  }
};
