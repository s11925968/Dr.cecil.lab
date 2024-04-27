import { roles } from "../../middleware/auth.js";

export const endPoint = {
  getAll: [roles.User, roles.Admin, roles.Superadmin],
};
