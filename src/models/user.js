import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: {type: String},
    last_name: {type: String},
    email: { type: String,required: true, unique: true },
    age: {type: Number},
    password: {type: String, required: true},
    role: {type: String, default: 'user'}
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection