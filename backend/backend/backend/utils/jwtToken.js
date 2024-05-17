//Creating Token and Saving Cookie

const sendToken = (user, statusCode, res) => {
  console.log("1");
  const token = user.getJWTToken();

  console.log("2");
  //options for Cookie
  const options = {
    Expires: new Date(
      Date.now() * process.env.COOKIE_EXPIRE * 24 * 60 * 60 * 1000
    ),
    httpOnly: true,
  };
  console.log("3");
  console.log("token", token);
  res.status(statusCode).cookie("token", token, options).json({
    success: true,
    user,
    token,
  });
};

module.exports = sendToken;
