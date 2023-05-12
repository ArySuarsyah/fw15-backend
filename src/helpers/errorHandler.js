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

  if (err.message.includes(`invalid input syntax for type boolean:`)) {
    return res.status(400).json({
      succes: false,
      message: "Error: Invalid gender value",
    });
  }

  if (err.message.includes("invalid input syntax for type date:")) {
    return res.status(400).json({
      succes: false,
      message: "Error: Invalid birthdate value",
    });
  }

  if (err.message.includes("user not found!")) {
    return res.status(400).json({
      succes: false,
      message: "Error: User not found",
    });
  }

  if (err.message.includes("Forgot_Failed")) {
    return res.status(400).json({
      succes: false,
      message: "Error: Request Failed",
    });
  }

    if (err.message.includes("no_forgot_request")) {
      return res.status(400).json({
        succes: false,
        message: "Error: Request not found",
      });
    }

  if (err.message ==  "reservation not found!") {
      return res.status(400).json({
        succes: false,
        message: "Error: Reservation not found",
      });
  }

  if (err.message == "Nothing transaction!") {
    return res.status(500).json({
      succes: false,
      message: "Error: Make a transaction first",
    })
  }


console.log(err);
  return res.status(500).json({
    succes: false,
    message: "Something happend in our backend",
  });
};

module.exports = errorHandler;
