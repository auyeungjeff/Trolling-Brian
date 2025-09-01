// netlify/functions/getVideo.js
import fs from "fs";
import path from "path";

exports.handler = async (event) => {

  console.log("getVideo function called");
  
  const { password } = event.queryStringParameters;

  console.log("Password received:", password);

  if (password !== process.env.SECRET_PASSWORD) {
    console.log("Wrong password");
    return { statusCode: 403, body: "Forbidden" };
  }

 const videoPath = path.join(process.cwd(), "protected", "HQJackyFinal.mp4");
  console.log("Looking for video at:", videoPath);

  if (!fs.existsSync(videoPath)) {
    console.error("Video file not found!");
    return { statusCode: 404, body: "Video not found" };
  }

  try {
    const stats = fs.statSync(videoPath);
    console.log("Video size:", stats.size, "bytes");

    // If file is too big, stop early and log
    if (stats.size > 40 * 1024 * 1024) {
      console.error("Video too large for function bundle");
      return { statusCode: 500, body: "Video too large for function" };
    }

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






