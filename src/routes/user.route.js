import express from "express";
import { userController } from "../controllers/user.controller.js";
// import { checkAuth } from "../middlewares/auth.middleware.js";

const userRouter = express.Router();

//userRouter.route("/").get(userController.read);

userRouter.route("/:id").get( userController.getOne);

userRouter.route("/:id").put( userController.updateOne);
userRouter.route("/:id").delete(userController.deleteOne);

userRouter.route("/:id/change-password").patch(userController.changePassword);
//userRouter.route("/:id/change-picture")patch(userController.changePicture);
//userRouter.route("/:id/reactivate")patch(userController.reactivated);
//userRouter.route("/:id/logout")patch(userController.logout);

export { userRouter };
