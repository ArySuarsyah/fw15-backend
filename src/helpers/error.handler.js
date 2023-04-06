const errorHandler = (err, res) => {
  if (
    err.message.includes(
      'duplicate key value violates unique constraint "users_email_key"'
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Email already exists",
    });
  } else if (
    err.message.includes(
      'duplicate key value violates unique constraint "name"'
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Genre already exists",
    });
  } else if (err.message.includes('"movieScheduleTimes" does not exist')) {
    return res.status(400).json({
      success: false,
      message: "Collumn does not exist",
    });
  } else if (
    err.message.includes(
      'duplicate key value violates unique constraint "castName"'
    )
  ) {
    return res.status(400).json({
      success: false,
      message: "Cast already exist",
    });
  }
  return res.status(500).json({
    success: false,
    message: err.message,
  });
};

module.exports = errorHandler;
