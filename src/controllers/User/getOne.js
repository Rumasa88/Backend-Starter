import { User } from "../../model/user.model.js";
import { ApiResponse } from "../../utils/ApiResponse.js";

const getOne = async (req, res) => {
  try {
    const id= req.user._id;
    // const { id } = req.params;

    if (!id) {
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
    //res.status(200).send(
//doubt
//    new ApiResponse(
//         404,
//         null,
//         "User with the provided ID does not exist."
//       )
//     ) 
    

    if (exists.deleted) {
      return res
        .status(400)
        .send(
          new ApiResponse(
            400,
            null,
            "Account with the provided details seems to be deactivated."
          )
        );
    }

    // const filteredUser = {
    //   _id: exists._id,
    //   firstName: exists.firstName,
    //   lastName: exists.lastName,
    //   email: exists.email,
    //   phone: exists.phone,
    // };

    res
      .status(200)
      .send(
        new ApiResponse(200, filteredUser, "User details fetched successfully.")
      );
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(new ApiResponse(500, error, "Failed to fetch user details."));
  }
};

export { getOne};
