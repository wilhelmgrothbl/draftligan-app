// /netlify/functions/test.js

exports.handler = async (event, context) => {
    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Backend is working!" }),
    };
  };
  