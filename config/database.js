import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config()
const  MONGO_URL  = process.env.MONGO_URL;
mongoose.set('strictQuery', true);

async function connect ()  {
  // Connecting to the database
  mongoose
    .connect(MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    })
    .then(() => {
			console.log("Successfully connect to database");
		})
    .catch((error) => {
			console.log("data base connection failed. exiting now...");
			console.log(error);
			process.exit(1);
		});
};

export default connect