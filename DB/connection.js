import mongoose from "mongoose";
const connectDb = async () => {
  return await mongoose
    .connect(process.env.DB)
    .then(() => {
      console.log("connection established");
    })
    .catch((err) => {
      console.log(`error connecting ${err}`);
    });
};
export default connectDb;
