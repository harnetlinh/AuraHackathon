import express from 'express';
const router = express.Router();
import { makeGatewayURL } from '../../helpers/index.js';
import { Web3Storage, File } from 'web3.storage';

const web3Token = process.env.WEB3_STORAGE_TOKEN;
const storage = new Web3Storage({ token: web3Token });

function makeFileObjects(img) {
  // You can create File objects from a Buffer of binary data
  var buffer = Buffer.from(img.data, 'base64');

  const files = [
    new File(['contents-of-file-1'], 'plain-utf8.txt'),
    new File([buffer], img.name)
  ]
  return files
}

const uploadImageToWeb3 = async (req, res) => {
  // res.status(200).json({data: req});
  const imageFile = req.files.image;
  console.log(imageFile);
  try {
    const filesObj = makeFileObjects(imageFile);
    const cid = await storage.put(filesObj);
    console.log('Content added with CID:', cid);
    const metadataGatewayURL = makeGatewayURL(cid, 'metadata.json');
    const imageGatewayURL = makeGatewayURL(cid, imageFile.name);
    const imageURI = `ipfs://${cid}/${imageFile.name}`;
    const metadataURI = `ipfs://${cid}/metadata.json`;

    res.status(200).json({
      data: [{ cid, metadataGatewayURL, imageGatewayURL, imageURI, metadataURI }],
      message: 'Upload Result'
    });
  } catch (err) {
    res.status(500).json({
      data: [err.message],
      message: 'Error'
    });
  }
}

export { uploadImageToWeb3 };