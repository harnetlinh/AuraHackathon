import mongoose from "mongoose";

const Schema = mongoose.Schema;

const AvailablePrizeSchema = new Schema(
    {
        prizeName: {
            type: String,
            required: true
        },
        prizeDescription: {
            type: String,
            required: true
        },
        CID: {
            type: String,
            required: true
        },
        statusID: {
            type: Number,
            default: 0
        },
        metadataGatewayURL: {
            type: String,
            required: true
        },
        imageGatewayURL: {
            type: String,
            required: true
        },
        imageURI: {
            type: String,
            required: true
        },
        metadataURI: {
            type: String,
            required: true
        }
    },
    { timestamps: true }
);

const AvailablePrize = mongoose.model("AvailablePrize", AvailablePrizeSchema);
export default AvailablePrize;