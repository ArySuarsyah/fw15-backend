const errorHandler = (err, res) => {
  if (
    err.message.includes(
      'duplicate key value violates unique constraint "users_email_key"'
    )
  ) {
    return res.status(409).json({
      success: false,
      message: "Email already exists",
    });
  } 
  return res.status(500).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandler;
