import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const deleteOne = async (req, res) => {
  try {
    const id = req.user._id;
    const { firstName, lastName, email, phone, address, password } = req.body;

    if (!firstName || !lastName || !email || !phone || !address || !password) {
      return res
        .status(400)
        .send(new ApiResponse(400, null, "Required fields missing."));
    }

    const exists = User.findById(id).select(
      "-password -__v-refreshToken-deleted"
    );

    if (!exists) {
      return res
        .status(404)
        .send(
          new ApiResponse(
            404,
            null,
            "User with the provided ID does not exist."
          )
        );
    }

    if (exists.deleted) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "Account with the provided details seems to be deleted."
          )
        );
    }

    exists.deleted = true;
    await exists.save();

    res
      .status(200)
      .send(new ApiResponse(200, null, "Account deleted successfully."));
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to delete user details."));
  }
};

export { deleteOne };
