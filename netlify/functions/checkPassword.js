// netlify/functions/checkPassword.js

exports.handler = async (event) => {
  try {
    // Parse the password sent from the frontend
    const { password } = JSON.parse(event.body);

    // Secret password stored in Netlify environment variables
    const secretPassword = process.env.SECRET_PASSWORD;
    const secretPassword2 = process.env.SECRET_PASSWORD_ALT;

    // Compare entered password with the secret
    if (password === secretPassword|| password === secretPassword2) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true }),
      };
    } else {
      return {
        statusCode: 401,
        body: JSON.stringify({ success: false }),
      };
    }
  } catch (error) {
    return {
      statusCode: 500,
      body: JSON.stringify({ success: false, error: error.message }),
    };
  }
};
