const router = require("express").Router();
const passport = require("passport");
const { signUp, login } = require("../controller/userController");
const {
  signUpValidator,
  loginValidator,
} = require("../utils/validators/userValidator");

router.post("/login", loginValidator, login);

router.get("/login", (req, res) => {
  res.render("login");
});

router.get("/signup", (req, res) => {
  res.render("signup");
});
router.post("/signup", signUpValidator, signUp);

router.post("/logout", (req, res, nxt) => {
  req.logout(function (err) {
    if (err) {
      return nxt(err);
    }
    res.redirect("/");
  });
});

router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);

router.get(
  "/google/redirect",
  passport.authenticate("google", {
    failureRedirect: "/auth/login",
    successRedirect: "/profile",
  })
);

router.get(
  "/facebook",
  passport.authenticate("facebook", {
    scope: ["email", "public_profile"],
  })
);

router.get(
  "/facebook/redirect",
  passport.authenticate("facebook", {
    failureRedirect: "/auth/login",
    successRedirect: "/profile",
  })
);

module.exports = router;
