import { v2 as cloudinary } from "cloudinary";
import { randomUUID } from "crypto";
import { Readable } from "stream";
import sharp from "sharp";

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

const MAX_CLOUDINARY_BYTES = 9 * 1024 * 1024; // 9MB to stay safely under 10MB limit

async function compressIfNeeded(buffer: Buffer): Promise<Buffer> {
  if (buffer.length <= MAX_CLOUDINARY_BYTES) return buffer;
  // Compress: resize to max 2400px wide and reduce quality
  return sharp(buffer)
    .resize({ width: 2400, height: 2400, fit: "inside", withoutEnlargement: true })
    .jpeg({ quality: 80 })
    .toBuffer();
}

export async function uploadBufferToCloudinary(
  buffer: Buffer,
  originalFilename: string
): Promise<{ secure_url: string; public_id: string }> {
  const public_id = `gallery/${randomUUID()}`;
  const finalBuffer = await compressIfNeeded(buffer);

  return new Promise((resolve, reject) => {
    const uploadStream = cloudinary.uploader.upload_stream(
      { public_id, resource_type: "image" },
      (error, result) => {
        if (error || !result) return reject(error || new Error("Upload failed"));
        resolve({ secure_url: result.secure_url, public_id: result.public_id });
      }
    );
    const readable = new Readable();
    readable.push(finalBuffer);
    readable.push(null);
    readable.pipe(uploadStream);
  });
}
