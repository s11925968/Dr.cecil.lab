import { data } from "@tensorflow/tfjs";
import mongoose, { Schema, model, Types } from "mongoose";
const userSchema = new Schema(
  {
    userName: {
      type: String,
      required: true,
    },
    country: {
      type: String,
    },
    phoneNumber: {
      type: Number,
    },
    dateOfBirth: {
      type: Date,
      required: true,
    },    
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    confirmEmail: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
      default: "User",
      enum: ["User", "Admin", "Superadmin"],
    },

    sendCode: {
      type: String,
      default: null,
    },

  },
  {
    timestamps: true,
  }
);
const userModel = mongoose.models.User || model("User", userSchema);
export default userModel;
