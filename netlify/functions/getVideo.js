// netlify/functions/getVideo.js
import fs from "fs";
import path from "path";

export async function handler(event) {
  const { password } = event.queryStringParameters;

  if (password !== process.env.SECRET_PASSWORD) {
    return {
      statusCode: 403,
      body: "Forbidden"
    };
  }

  const videoPath = path.resolve(__dirname, "../../protected/HQJackyFinal.mp4");
  console.log("Looking for video at:", videoPath);

  try {
    const stats = fs.statSync(videoPath);
    console.log("Video size:", stats.size, "bytes");

    const videoBuffer = fs.readFileSync(videoPath);
    console.log("Video read successfully");

    return {
      statusCode: 200,
      headers: { "Content-Type": "video/mp4" },
      body: videoBuffer.toString("base64"),
      isBase64Encoded: true
    };
  } catch (err) {
    console.error("Error reading video:", err);
    return { statusCode: 500, body: "Error reading video" };
  }
}

