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

  const videoPath = path.join(process.cwd(), "protected", "HQJackyFinal.mp4");

  try {
    const videoBuffer = fs.readFileSync(videoPath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "video/mp4"
      },
      body: videoBuffer.toString("base64"),
      isBase64Encoded: true
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error reading video"
    };
  }
}
