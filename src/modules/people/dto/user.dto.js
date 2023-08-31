import { Validator } from "../../../utils/validator.js";

export default class UserDto extends Validator {
  id = ["string"];
  topics = ["object"];
}
