import {v2 as cloudinary} from "cloudinary"
import { NextApiRequest, NextApiResponse } from "next";
// import { env } from "~/env.mjs";

export default async function handler(req:NextApiRequest,
res:NextApiResponse){
const {timestamp,signature} = await getSignature();
res.status(200).json({timestamp,signature});
}

const cloudinaryConfig = cloudinary.config({
cloud_name:"dh1bowbbe",
api_key:"692272739484127",
api_secret:"K_uL_rAnk82GEECmZw5zbGSjwUY",
secure:true
})

export async function getSignature(){
const timestamp = Math.round(new Date().getTime()/1000);
const signature = cloudinary.utils.api_sign_request(
    {
        timestamp,folder:"next"},
        cloudinaryConfig.api_secret as string
);
return {timestamp,signature};
}