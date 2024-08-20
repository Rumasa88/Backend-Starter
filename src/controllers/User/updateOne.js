import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const updateOne = async (req, res) => {
  try {
    const id = req.user._id;

    // const { id } = req.params;

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

    exists.firstName = firstName;
    exists.lastName = lastName;
    exists.email = email;
    exists.password = password;
    exists.phone = phone;
    exists.address = address;
    await exists.save();

    res
      .status(200)
      .send(
        new ApiResponse(200, filteredUser, "User details updated successfully.")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to update user details."));
  }
};

export { updateOne };
