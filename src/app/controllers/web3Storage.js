import { makeGatewayURL } from "../../helpers/index.js";
import { Web3Storage, File } from "web3.storage";
import AvailablePrize from "../models/AvailablePrize.js";

const web3Token = process.env.WEB3_STORAGE_TOKEN;
const storage = new Web3Storage({ token: web3Token });

function makeFileObjects(img) {
    // You can create File objects from a Buffer of binary data
    var buffer = Buffer.from(img.data, "base64");

    const files = [
        new File(["contents-of-file-1"], "plain-utf8.txt"),
        new File([buffer], img.name),
    ];
    return files;
}

const uploadImageToWeb3 = async (req, res) => {
    try {
        const { image } = req.files;
        const filesObj = makeFileObjects(image);
        const cid = await storage.put(filesObj);
        const metadataGatewayURL = makeGatewayURL(cid, "metadata.json");
        const imageGatewayURL = makeGatewayURL(cid, image.name);
        const imageURI = `ipfs://${cid}/${image.name}`;
        const metadataURI = `ipfs://${cid}/metadata.json`;

        await AvailablePrize.insertMany([
            {
                prizeName: image.name,
                prizeDescription: "Test",
                CID: cid,
                imageURI,
                metadataURI,
                imageGatewayURL,
                metadataGatewayURL,
            },
        ]);


        res.status(200).json({
            data: [
                {
                    cid,
                    metadataGatewayURL,
                    imageGatewayURL,
                    imageURI,
                    metadataURI,
                },
            ],
            message: "Upload Result",
            status: "success",
        });
        
    } catch (error) {
      res.status(500).json({ status: "error", error: error.message });
    }
};

export { uploadImageToWeb3 };
