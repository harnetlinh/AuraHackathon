import mongoose from "mongoose";

const Schema = mongoose.Schema;

const PrizeSchema = new Schema(
    {
        tokenId: {
            type: String,
            required: true
        },
        prizeName: {
            type: String,
            required: false,
        },
        prizeDescription: {
            type: String,
            required: false
        },
        prizeImage: { // web3
            type: String,
            required: false
        },
        prizeCategory: {
            type: String,
            required: false
        },
        prizeDate: { // thời gian sv nhận thưởng
            type: Date,
            required: false,
            default: Date.now
        },
        CID: { //web3
            type: String,
            required: true
        },
        statusID: { // trang thai
            type: Number,
            default: 0
        },
        minter: {
            type: String,
            required: false
        },
        transactionHash: {
            type: String,
            required: false
        },
        height: {
            type: Number,
            required: false
        },
        gasWanted: {
            type: Number,
            required: false
        },
        gasUsed: {
            type: Number,
            required: false
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
        prizeCollection: [PrizeSchema]
    },
    { strict: false },
    { timestamps: true }
);

const Student = mongoose.model("Student", StudentSchema);
export default Student;