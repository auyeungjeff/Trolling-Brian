// netlify/functions/getImage.js
import fs from "fs";
import path from "path";

const validPasswords = [
  process.env.SEC_PASS_GREYMON,
  process.env.COUNTDOWN_UNLOCK_PASSWORD
];

export async function handler(event) {
  const { password } = event.queryStringParameters;
  
  if (!validPasswords.includes(password)) {
  return {
    statusCode: 403,
    body: "Forbidden"
  };
}

  const imagePath = path.join(process.cwd(), "protected", "Greymon1.jpg");

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
    console.error("Error reading image:", err);
    return {
      statusCode: 500,
      body: "Error reading image"
    };
  }
}









