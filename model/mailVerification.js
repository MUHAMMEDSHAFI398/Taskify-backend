import mongoose from "mongoose";

const { Schema, model } = mongoose;

const mailVerificationSchema = new Schema(
    {
        userId: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
            required: true,
            unique: true
        },
        link: {
            type: String,
            required: true
        },
        createdAt: {
            type: Date,
            default: Date.now(),
            expires: 3600
        }
    },
);

const MailLink = model("MailLink", mailVerificationSchema);
export default MailLink;