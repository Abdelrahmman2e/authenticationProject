const { check } = require("express-validator");
const validatorMW = require("../../middleware/validatorMW"); // adjust path if needed

exports.signUpValidator = [
  check("username").notEmpty().withMessage("Username is required..!!"),
  check("email")
    .notEmpty()
    .withMessage("Email is required..!!")
    .isEmail()
    .withMessage("Invalid email format..!!"),
  check("password").notEmpty().withMessage("Password is required..!!"),
  check("passwordConfirm")
    .notEmpty()
    .withMessage("Password confirm is required..!!")
    .custom((val, { req }) => {
      if (val !== req.body.password) {
        throw new Error("Passwords do not match..!!");
      }
      return true;
    }),

  validatorMW,
];

exports.loginValidator = [
  check("email").isEmail().withMessage("Valid email is required"),
  check("password").notEmpty().withMessage("Password is required"),
  validatorMW,
];
