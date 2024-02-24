import mongoose from "mongoose";

const { Schema, model } = mongoose;

const projectSchema = new Schema(
    {
        name: { type: String, required: true },
        description: { type: String },
        owner: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
        team: { type: mongoose.Schema.Types.ObjectId, ref: 'Team' },
        lists: [{ type: mongoose.Schema.Types.ObjectId, ref: 'List' }],
    },
    { timestamps: true }
);

const Project = model("Project", projectSchema);
export default Project;