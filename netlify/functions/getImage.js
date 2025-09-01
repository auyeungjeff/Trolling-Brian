// netlify/functions/getImage.js
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

  const imagePath = path.join(process.cwd(), "protected", "myimage.jpg");

  try {
    const imageBuffer = fs.readFileSync(imagePath);

    return {
      statusCode: 200,
      headers: {
        "Content-Type": "image/jpeg"
      },
      body: imageBuffer.toString("base64"),
      isBase64Encoded: true
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: "Error reading image"
    };
  }
}
