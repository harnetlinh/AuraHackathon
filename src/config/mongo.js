import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connect = async () => {
    await mongoose.connect(`mongodb://${process.env.USERNAME_DB}:${process.env.PASSWORD_DB}@localhost:27017/${process.env.DB_NAME}?authSource=admin&retryWrites=true&w=majority`, {
        useNewUrlParser: true,
        useUnifiedTopology: true
    }).then(() => console.log("MongoDB Connected")).catch(err => console.log(err));  
} 

export default connect;
