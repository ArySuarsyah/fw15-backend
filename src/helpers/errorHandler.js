const errorHandler = (err, res) => {
  if (
    err.message.includes(
      'duplicate key value violates unique constraint "users_email_key"'
    )
  ) {
    return res.status(409).json({
      success: false,
      message: "Error: Email already used!",
    });
  }

  if (err.message == "Empty_field") {
    return res.status(400).json({
      success: false,
      message: "Error: Please insert password or email",
    });
  }

  if (err.message == "Wrong_email") {
    return res.status(400).json({
      success: false,
      message: "Error: Email invaid",
    });
  }

  if (err.message == "secretOrPrivateKey must have a value") {
    return res.status(400).json({
      success: false,
      message: "Error: Secret Key Invalid",
    });
  }

  if (err.message == "wrong_credentials") {
    return res.status(400).json({
      success: false,
      message: "Error: Wrong Email or Password",
    });
  }

  if (err.message == "Unauthorized") {
    return res.status(400).json({
      success: false,
      message: "Error: unauthorized",
    });
  }

  if (err.message.includes("jwt malformed")) {
    return res.status(400).json({
      succes: false,
      message: "Error: token invalid",
    });
  }

  if (err.message.includes("invalid signature")) {
    return res.status(400).json({
      succes: false,
      message: "Error: token signature invalid",
    });
  }

  if (err.message.includes("File too large")) {
    return res.status(400).json({
      succes: false,
      message: "Error: File too large",
    });
  }

  if (err.message == "Password unmatch") {
    return res.status(400).json({
      success: false,
      message: "Error: password and confirm password does not match",
    });
  }

  console.log(err.message);
  return res.status(500).json({
    succes: false,
    message: "Something happend in our backend",
  });
};

module.exports = errorHandler;
