import { v2 as cloudinary } from "cloudinary";
import { env } from "~/env";
import { NextResponse } from "next/server";

// Configure Cloudinary
cloudinary.config({
  cloud_name: env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME,
  api_key: env.NEXT_PUBLIC_CLOUDINARY_API_KEY,
  api_secret: env.NEXT_PUBLIC_CLOUDINARY_API_SECRET,
  secure: true,
});

// Function to generate signature
function getSignature() {
  const timestamp = Math.round(new Date().getTime() / 1000);
  const signature = cloudinary.utils.api_sign_request(
    { timestamp, folder: "next" },
    env.NEXT_PUBLIC_CLOUDINARY_API_SECRET
  );
  return { timestamp, signature };
}

// Handle API request
export async function GET() {
  const { timestamp, signature } = getSignature();
  return NextResponse.json({ timestamp, signature });
}
