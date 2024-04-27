import userModel from "../../../../DB/model/user.model.js";
import { comparePass, hashText } from "../../../services/HashAndCompare.js";



export const profile = async (req, res) => {
  const { id } = req.params;
  const user = await userModel.findById(id);

  return res.status(200).json({ message: "success", user });
};

export const changePassword = async (req, res) => {
  const { id } = req.params;
  const { password, newPassword, confirmPassword } = req.body;

  const user = await userModel.findById(id);

  const match = comparePass(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Wrong Password" });
  }

  if (confirmPassword != newPassword) {
    return res.status(400).json({ message: "two passwords not match" });
  }

  const hashPass = hashText(newPassword);
  const updatedPass = await userModel.findByIdAndUpdate(
    id,
    { password: hashPass },
    { new: true }
  );

  return res.status(201).json({ message: "success", updatedPass });
};

export const changeEmail = async (req, res) => {
  const { id } = req.params;
  const { password, newEmail } = req.body;

  const user = await userModel.findById(id);

  const match = comparePass(password, user.password);
  if (!match) {
    return res.status(400).json({ message: "Wrong Password" });
  }

  const userE = await userModel.findOne({ email: newEmail });
  if (userE) {
    return res.status(409).json({ message: "Email already Exist" });
  }

  const updatedEmail = await userModel.findByIdAndUpdate(
    id,
    { email: newEmail },
    { new: true }
  );

  return res.status(201).json({ message: "success", updatedEmail });
};
export const changeInfo = async (req, res) => {
  try {
    const user = await userModel.findById(req.params.id);
    if (!user) {
      return res.status(404).json({ message: `invalid user ${req.params.id}` });
    }
    if (req.body.name) {
      user.userName = req.body.name;
    }
    if (req.body.age) {
      user.age = req.body.age;
    }

    await user.save();
    return res.status(200).json({ message: "success", user });
  } catch (error) {
    return res.status(500).json({ message: "error", error: error.stack });
  }
};
