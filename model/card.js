import mongoose from "mongoose";

const { Schema, model } = mongoose;

const cardSchema = new Schema(
    {
        title: { type: String, required: true },
        description: { type: String },
    },
    { timestamps: true }
);

const Card = model("Card", cardSchema);
export default Card;