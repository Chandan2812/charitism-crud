const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
    minlength: 3,
    maxlength: 50,
    validate: {
      validator: (value) => /^[a-zA-Z0-9]+$/.test(value),
      message: "Invalid username format. Use only letters and numbers.",
    },
  },
  password: {
    type: String,
    required: true,
    minlength: 6,
    validate: {
      validator: (value) => /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/.test(value),
      message: "Invalid password format. Must contain at least one lowercase letter, one uppercase letter, one digit, and one special character.",
    },
  },
});

const UserModel = mongoose.model("User",userSchema)

module.exports={UserModel}