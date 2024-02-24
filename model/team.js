import mongoose from "mongoose";

const { Schema, model } = mongoose;

const teamSchema = new Schema(
    {
        namusere: { type: String, required: true },
        members: [{ type: mongoose.Schema.Types.ObjectId, ref: 'User' }],
    },
    { timestamps: true }
);

const Team = model("Team", teamSchema);
export default Team;
