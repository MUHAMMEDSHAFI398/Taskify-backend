import mongoose from "mongoose";

const { Schema, model } = mongoose;

const userSchema = new Schema(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        verified: {type:Boolean, default:false}
    },
    { timestamps: true }
);

const User= model("User", userSchema);
export default User;
