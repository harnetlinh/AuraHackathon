import mongoose from "../../config/mongo";

const Student = mongoose.model("Student", {
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    studentCode: {
        type: String,
        required: true,
        unique: true,
    },
    nftAddress: {
        type: String,
        required: true,
        unique: true,
    },
    prizeCollection: {
        type: Array,
        required: true,
        default: [],
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },

});