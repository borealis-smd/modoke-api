import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";

const s3Client = new S3Client({
  region: process.env.AWS_REGION || "",
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID || "",
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY || "",
  },
});

export const uploadToS3 = async (file: Buffer, fileName: string) => {
  const key = `uploads/${fileName}-${new Date().toISOString()}`;
  try {
    await s3Client.send(
      new PutObjectCommand({
        Bucket: process.env.AWS_BUCKET_NAME || "",
        Key: key,
        Body: file,
        ContentType: "image/" + fileName.split(".").pop(),
      }),
    );
  } catch (e) {
    console.error(e);
    throw new Error("Erro ao fazer upload do arquivo.");
  }
  return `https://${process.env.AWS_BUCKET_NAME}.s3.${process.env.AWS_REGION}.amazonaws.com/${key}`;
};
