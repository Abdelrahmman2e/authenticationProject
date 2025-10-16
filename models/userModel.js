const mongoose = require("mongoose");
const bcrypt = require("bcrypt");
const userSchema = new mongoose.Schema({
  username: String,
  email: String,
  password: String,
  passwordConfirm: String,
  googleId: String,
  facebookId: String,
  image: String,
});

userSchema.pre("save", async function (nxt) {
  if (!this.isModified("password")) return nxt();
  this.password = await bcrypt.hash(this.password, 10);
  this.passwordConfirm = undefined;
  nxt();
});

module.exports = mongoose.model("User", userSchema);
