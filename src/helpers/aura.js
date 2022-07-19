import {
    SigningCosmWasmClient,
    CosmWasmClient,
} from "@cosmjs/cosmwasm-stargate";
import { DirectSecp256k1HdWallet } from "@cosmjs/proto-signing";
import dotenv from "dotenv";
dotenv.config();

const mnemonic = process.env.MNEMONIC;
const rpcEndpoint = process.env.RPC;
const contractAddress = process.env.CONTRACT;

const getWallet = async () => {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(mnemonic, {
        prefix: "aura",
    });
    return wallet;
};

const get1stAccount = async (wallet) => {
    const [firstAccount] = await wallet.getAccounts();
    return firstAccount;
};

const getSigningAuraWasmClient = async (wallet) => {
    const signingClient = await SigningCosmWasmClient.connectWithSigner(
        rpcEndpoint,
        wallet
    );
    return signingClient;
};

const getAuraWasmClient = async () => {
    const client = await CosmWasmClient.connect(rpcEndpoint);
    return client;
};

const MintNFT = async (token_id, owner, token_uri, extension) => {

    let wallet = await getWallet();

    let firstAccount = await get1stAccount(wallet);

    let signingClient = await getSigningAuraWasmClient(wallet);

    const mintMsg = {
        mint: {
            token_id,
            owner,
            token_uri,
            extension,
        },
    };

    const fee = {
        amount: [
            {
                denom: "uaura",
                amount: "160",
            },
        ],
        gas: "152375",
    };

    const result = await signingClient.execute(
        firstAccount.address,
        contractAddress,
        mintMsg,
        fee
    );
    
    return result;
};

const getAllToken = async (address) => {
    /* 	#swagger.tags = ['All Token']
    #swagger.description = 'Get all NFT Token' */

    if (!client) {
        var client = await getAuraWasmClient();
    }

    const allTokenOwner = {
        tokens: {
            owner: String(address),
        },
    };

    const result = await client.queryContractSmart(
        contractAddress,
        allTokenOwner
    );

    if(result.status === "error") {
        return [];
    }

    return result;
};

export { MintNFT, getAllToken };
