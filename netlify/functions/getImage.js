import fs from "fs";
import path from "path";

export async function handler(event) {
  const { password, file } = event.queryStringParameters;

  const validPasswords = [
    process.env.SEC_PASS_GREYMON,
    process.env.COUNTDOWN_UNLOCK_PASSWORD
  ];

  console.log("Received password:", password);
  console.log("Received file request:", file);

  if (!validPasswords.includes(password)) {
    console.error("Password mismatch");
    return {
      statusCode: 403,
      body: "Forbidden"
    };
  }

  // Select which protected image to return
  const selectedFile =
    file === "2" ? "Greymon2.jpg" : "bokay.jpg";

  const imagePath = path.join(__dirname, "protected", selectedFile);

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
    console.error("IMAGE READ ERROR:", err);
    return {
      statusCode: 500,
      body: "Error reading image"
    };
  }
}
