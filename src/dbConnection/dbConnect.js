import mongoose from "mongoose";

const dbConnect = async () => {
  const dbURL = process.env.MONGODB_URL;
  try {
    await mongoose.connect(dbURL);
    console.log("MongoDb connected");
  } catch (error) {
    console.log(error);
    process.exit(1);
  }
};
export default dbConnect;
