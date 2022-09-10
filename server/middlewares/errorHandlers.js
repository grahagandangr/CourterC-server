function errorHandlers(error, req, res, next) {
  if (
    error.name === "SequelizeValidationError" ||
    error.name === "SequelizeUniqueConstraintError"
  ) {
    res.status(400).json(error.errors.map((e) => e.message));
  } else if (error.name === "Password is required") {
    res.status(400).json({ message: "Password is required" });
  } else if (error.name === "Email/Password is required") {
    res.status(401).json({
      message: "Email / Password is required",
    });
  } else if (error.name === "NoToken") {
    res.status(401).json({
      message: "Please login",
    });
  } else if (error.name === "Invalid_email/password") {
    res.status(401).json({
      message: "Invalid Email/Password",
    });
  } else if (error.name === "JsonWebTokenError") {
    res.status(403).json({
      message: "You don't have an access",
    });
  } else if (error.name === "SequelizeForeignKeyConstraintError") {
    res.status(404).json({
      message: "Product is Not Found",
    });
  } else if (error.name === "NotFound") {
    res.status(404).json({
      message: "Item / Category is Not Found",
    });
  } else {
    res.status(500).json({
      message: "Internal Server error",
    });
  }
}

module.exports = errorHandlers;
