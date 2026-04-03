import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

export interface CloudinaryUploadParams {
  signature: string;
  timestamp: number;
  api_key: string;
  cloud_name: string;
  folder: string;
  public_id: string;
}

export function getCloudinaryUploadParams(filename: string): CloudinaryUploadParams {
  const timestamp = Math.round(Date.now() / 1000);
  const folder = "gallery";
  const ext = filename.split(".").pop() || "jpg";
  const public_id = `${folder}/${randomUUID()}`;

  const signature = cloudinary.utils.api_sign_request(
    { timestamp, public_id },
    process.env.CLOUDINARY_API_SECRET!
  );

  return {
    signature,
    timestamp,
    api_key: process.env.CLOUDINARY_API_KEY!,
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME!,
    folder,
    public_id,
  };
}

export async function deleteCloudinaryImage(publicId: string): Promise<void> {
  await cloudinary.uploader.destroy(publicId);
}
