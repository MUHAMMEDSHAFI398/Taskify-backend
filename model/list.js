import mongoose from "mongoose";

const { Schema, model } = mongoose;

const listSchema = new Schema(
    {
        name: { type: String, required: true },
        board: { type: mongoose.Schema.Types.ObjectId, ref: 'Board', required: true },
        cards: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Card' }],
    },
    { timestamps: true }
);

const List = model("List", listSchema);
export default List;