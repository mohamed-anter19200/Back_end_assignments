import mongoose, { model, Schema } from "mongoose";

const userSchema = new Schema({
    userName: {
        type: String,
        required: true,
        maxlength: 30,
        minlength: 2,
        trim: true
    },

    email: {
        type: String,
        required: true,
        unique: true,
        trim: true
    },

    password: {
        type: String,
        required: function () {
            return this.provider === 'local';
        }
    },

    provider: {
        type: String,
        enum: ['google', 'facebook', 'local'],
        default: 'local'
    },

    isVerified: {
        type: Boolean,
        default: false
    },

    isDeleted: {
        type: Boolean,
        default: false
    },

    profilePicPath: {
        type: String,
        required: false
    }
}, {
    timestamps: true
});

export const User = model('User', userSchema);