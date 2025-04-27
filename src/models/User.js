import { Schema, model } from "mongoose";

const userSchema = new Schema({
    id: {
        type: String,
        unique: true
    },
    name: String,
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now()
    }
});

export default model("User", userSchema);
