import { changePassword } from "./User/changePassword.js";
import { getOne } from "./User/getOne.js";
import { deleteOne } from "./User/deleteOne.js";
import { updateOne } from "./User/updateOne.js";

const userController = {
  getOne: getOne,
  changePassword: changePassword,
  deleteOne: deleteOne,

  updateOne: updateOne,
};

export { userController };
