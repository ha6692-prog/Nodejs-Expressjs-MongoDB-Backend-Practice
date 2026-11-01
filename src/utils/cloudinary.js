import { v2 as cloudinary } from "cloudinary";
import fs from "node:fs/promises";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

const uploadOnCloudinary = async (localFilePath, resourceType = "auto") => {
  if (!localFilePath) {
    return null;
  }

  try {
    const response = await cloudinary.uploader.upload(localFilePath, {
      resource_type: resourceType,
    });

    console.log("Cloudinary upload successful:", response.public_id);

    return {
      secure_url: response.secure_url,
      public_id: response.public_id,
      resource_type: response.resource_type,
      duration: response.duration,
    };
  } finally {
    try {
      await fs.unlink(localFilePath);
    } catch (error) {
      if (error.code !== "ENOENT") {
        console.error("Temporary file cleanup failed:", error);
      }
    }
  }
};

export { uploadOnCloudinary };
