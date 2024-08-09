import { StatusCodes } from "http-status-codes";
import { ErrorClass } from "../../../utils/errorClass.js";
import { asyncHandler } from "../../../utils/errorHandling.js";
import { generateToken } from "../../../utils/generateAndVerifyToken.js";
import { userModel } from "../../../../DB/models/user.model.js";
import { hash,compare } from "../../../utils/hashing.js";
// import bcrypt from "bcrypt"



export const signUp = asyncHandler(async (req, res, next) => {
  const {  email } = req.body;

  try {
      const userexist = await userModel.findOne({ email: email });

    if (userexist) {
      return next(new Error("Email already exists", StatusCodes.CONFLICT));
    }

    const password="admin"
    const name="admin"
    const hashPassword = hash(password);

    const user = await userModel.create({
      name,
      email,
      password: hashPassword,
      role: "admin",
    });
    await user.save();
  
    // Generate token
    const token = generateToken({
      payload: {
        id: user.id,
        email: user.email,
      }
    });

    // Send success response with user data and token
    return res.status(StatusCodes.CREATED).json({ message: "User signed up successfully", result: user, token });
  } catch (error) {
    console.error('Error during sign-up:', error);
    return next(new Error("Internal server error", StatusCodes.INTERNAL_SERVER_ERROR));
  }
});

export const signIn = asyncHandler(async (req, res, next) => {
  const { email, password } = req.body;
  console.log(email, password);
  
  const user = await userModel.findOne({email:email});
  if (!email || !password ||email==null||password==null) {
    return next(new Error("Please provide email and password"),StatusCodes.BAD_REQUEST);
  }

  if (!user) {
    return next(new Error("Email does not exist sign up first"),StatusCodes.BAD_REQUEST);
  }
  
 const ok=compare(password,user.password)

  if (ok == true) {
    const token = generateToken({
      payload: {
        id: user.id,
        password,
      },
    });
    return res.status(StatusCodes.OK).json({ message: "Successfully signed in", user, token,role :user.role });
  }
   else {
    return next(new ErrorClass("Incorrect data"), StatusCodes.BAD_REQUEST);
  }
});

export const deleteUser = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const user = await userModel.findByIdAndDelete({ _id: id });
  if (!user) {  
    return next(new Error("User not found", StatusCodes.NOT_FOUND));
  }
  return res.status(StatusCodes.OK).json({ message: "User deleted successfully" });
})