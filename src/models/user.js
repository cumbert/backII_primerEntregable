import mongoose from "mongoose";

const userCollection = "Users";

const userSchema = new mongoose.Schema({
    first_name: String,
    last_name: String,
    email: { type: String,rwquired: true, unique: true },
    age: Number,
    password: {type: String, required: true},
    role: {type: String, default: 'user'}
});

const firstCollection = mongoose.model(userCollection, userSchema);

export default firstCollection