import {v2 as cloudinary} from "cloudinary"
import type { NextApiRequest, NextApiResponse } from "next";
import { env } from "~/env.mjs";

export default function handler(req:NextApiRequest,
res:NextApiResponse){
const {timestamp,signature} = getSignature();
res.status(200).json({timestamp,signature});
}

const cloudinaryConfig = cloudinary.config({
cloud_name:env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
api_key:env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
api_secret:env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
secure:true
})

export function getSignature(){
const timestamp = Math.round(new Date().getTime()/1000);
const signature = cloudinary.utils.api_sign_request(
    {
        timestamp,folder:"next"},
        cloudinaryConfig.api_secret 
);
return {timestamp,signature};
}
