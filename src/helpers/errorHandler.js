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
  } else if (err.message == "Empty_field") {
    return res.status(400).json({
      success: false,
      message: "Please insert password or email",
    });
  } else if (err.message == "Wrong_email") {
    return res.status(400).json({
      success: false,
      message: "Error: Email invaid",
    });
  }
  return res.status(500).json({
    succes: false,
    message: "Something happend in our backend",
    error: err.message,
  });
};

module.exports = errorHandler;
