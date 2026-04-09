import mongoose from "mongoose";

const { Schema } = mongoose;

const userSchema = new Schema(
  {
    name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      trim: true,
      unique: true,
      lowercase: true,
    },
    password: {
      type: String,
      required: false,
      minlength: 4,
    },
    googleId: {
      type: String,
      default: null,
    },
  },
  { timestamps: true }
);

const userModel = new mongoose.model("User", userSchema);

export default userModel;
