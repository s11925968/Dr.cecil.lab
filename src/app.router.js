import connectDb from "../DB/connection.js";
import AuthRouter from "./module/auth/auth.router.js";

const initApp = async (app, express) => {
    app.use(express.json());
    connectDb();
    app.use("/auth", AuthRouter);

    app.use("/*", (req, res) => {
        return res.json({ message: "Page Not Found" });
      });
};
export default initApp;
