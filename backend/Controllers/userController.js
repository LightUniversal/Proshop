import asyncHandler from "../middleware/asyncHandler.js";
import User from "../models/userModel.js";
import { genToken } from "../utils/genToke.js";

// authenticate user
const authUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body;
  // check and get the user from the mongodb database
  const user = await User.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    genToken(res, user._id);
    res.status(200).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      profile: user.profile,
      friends: user.friends,
      faculty: user.faculty,
      department: user.department
    });
  } else {
    res.status(401);
    throw new Error("Invalid email or password");
  }
  console.log(req.body);
});

// register user
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password, imageUrl, faculty, department, friends } = req.body;
  console.log(req.body);
  // check user
  const userExist = await User.findOne({ email });

  if (userExist) {
    res.status(400);
    throw new Error("User already exists");
  }
  // create a user
  const user = await User.create({
    name,
    email,
    password,
    profile: imageUrl,
    faculty,
    department,
    friends
  });
  //   if user is created and in the database
  if (user) {
    genToken(res, user._id);
    res.status(201).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      profile: user.profile,
      faculty: user.faculty,
      department: user.department,
      isAdmin: false,
    });
  } else {
    res.status(400);
    throw new Error("Invalid user data");
  }
});

// logout user
const logoutUser = asyncHandler(async (req, res) => {
  // clear the cookie
  res.cookie("jwt", "", {
    httpOnly: true,
    expires: new Date(0),
  });
  res.status(200).json({
    message: "Logout successfully",
  });
});

// get user profile
const getUserProfile = asyncHandler(async (req, res) => {
  // Get the id of the user that is currently logged in
  const user = await User.findById(req.user._id);

  if (user) {
    res.status(200).json({
      _id: user._id,
      email: user.email,
      name: user.name,
      isAdmin: user.isAdmin,
      friends: user.friends,
      faculty: user.faculty,
      department: user.department
    });
  } else {
    res.status(404);
    throw new Error("User not found");
  }
});

// update user profile
const updateUserProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id);
  if (user) {
    // update only the name property of the user
    console.log(req.body);
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.profile = req.body.profile || user.profile;
    // user.profile = req.body.
    if (req.body.password) {
      user.password = req.body.password;
    }

    // save the updated user to the database
    const updatedUser = await user.save();
    console.log(updateUser);
    res.status(200).json({
      _id: updatedUser._id,
      email: updatedUser.email,
      name: updatedUser.name,
      isAdmin: updatedUser.isAdmin,
      profile: updatedUser.profile,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Admin user

// Admin get users
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({});
  res.status(200).json(users);
});

// Admin get user by id
const getUsersById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select("-password");

  if (user) {
    res.status(200).json(user);
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// Delete user
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    if (user.isAdmin) {
      res.status(400);
      throw new Error("Cannot delete admin user");
    } else {
      await User.deleteOne({ _id: user._id });
      res.status(201).json({
        message: "User deleted successfully",
      });
    }
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// update user
const updateUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id);

  if (user) {
    user.name = req.body.name || user.name;
    user.email = req.body.email || user.email;
    user.isAdmin = Boolean(req.body.isAdmin);

    const updatedUser = await user.save(); 
    res.status(200).json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    });
  } else {
    res.status(400);
    throw new Error("User not found");
  }
});

// new updates
const getUserFriends = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params.id;
    const user = await User.findById(id);
    const friends = await user.friends.map((id) => {
      return User.findById(id);
    });

    const formattedFriends = friends.map(
      (_id, name, email, faculty, department, profile) => {
        return {
          _id,
          name,
          email,
          faculty,
          department,
          profile,
        };
      }
    );

    res.status(200).json(formattedFriends);
    
  } catch (error) {
    res.status(404).json({
      message: error.message
    })
  }
});

// Add and remove friend
const addRemoveFriend = asyncHandler(async( req, res) => {

})
export {
  authUser,
  registerUser,
  logoutUser,
  getUserProfile,
  updateUserProfile,
  updateUser,
  getUsers,
  getUsersById,
  deleteUser,
};
