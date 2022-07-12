import mongoose from "../../config/mongo";

const PrizeSchema = new mongoose.Schema(
    {
        prizeName: {
            type: String,
            required: true
        },
        prizeDescription: {
            type: String,
            required: false
        },
        prizeImage: {
            type: String,
            required: false
        },
        prizeCategory: {
            type: String,
            required: false
        },
        prizeDate: {
            type: Date,
            required: false,
            default: Date.now
        },
        CID: {
            type: String,
            required: true
        },
        statusID: {
            type: Number,
            required: true,
            default: 0
        }
    }, 
    { strict: false },
    { timestamps: true });

const StudentSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true
        },
        email: {
            type: String,
            required: true
        },
        studentCode:{
            type: String,
            required: true
        },
        studentLogin: {
            type: String,
            required: true
        },
        nftAddress:{
            type: String,
            required: true
        },
        prizeCollection: {
            type: PrizeSchema,
            required: false
        }
    },
    { strict: false },
    { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;