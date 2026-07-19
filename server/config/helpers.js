
import { unlink } from "fs/promises";
import path from "path";
import { DeleteObjectCommand } from "@aws-sdk/client-s3";
import { s3 } from "./s3.js";

const isProduction = process.env.NODE_ENV === "production";

export const getFileUrl = (file) => {
  if (isProduction) {
    return file.location;
  }

  return `${process.env.APP_URL}/${file.filename}`;
};

export const deleteFile = async (url) => {
  try {
    if (isProduction) {
      const key = url.split("/").pop();

      await s3.send(
        new DeleteObjectCommand({
          Bucket: process.env.AWS_BUCKET,
          Key: key,
        })
      );

      return true;
    }

    const filename = path.basename(url);

    await unlink(path.resolve("./uploads", filename));

    return true;
  } catch (err) {
    console.error(err);
    return false;
  }
};
