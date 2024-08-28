import * as OptionRepo from "../models/option";
import { OptionsCreate } from "../validators/optionsValidator";

export const createOption = async (option: OptionsCreate) => {
  return OptionRepo.createOption(option);
};
