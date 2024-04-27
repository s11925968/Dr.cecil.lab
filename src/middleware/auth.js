import jwt from "jsonwebtoken";
import userModel from "../../DB/model/user.model.js";
export const roles = {
    User: "User",
    Admin: "Admin",
    Superadmin: "Superadmin",
  };
export const auth = (accsessRules = []) => {
  return async (req, res, next) => {
    const { authorization } = req.headers;
    if (!authorization.startsWith(process.env.BEARERKEY)) {
      return res.status(400).json({ message: "authorization invalid" });
    }
    const token = authorization.split(process.env.BEARERKEY)[1];
    const decoded = jwt.verify(token, process.env.LOGIN_SECRET);
    if (!decoded) {
      return res.status(400).json({ message: "authorization invalid" });
    }
    const user = await userModel.findById(decoded.id).select("userName role");
    if (!user) {
      return res.status(404).json({ message: "not registered user" });
    }

    if (!accsessRules.includes(user.role)) {
      return res.status(403).json({ message: "not auth user" });
    }
    req.user = user;
    next();
  };
};
