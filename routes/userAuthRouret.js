const router = require("express").Router();
const passport = require("passport");


function isLoggedIn(req, res, next) {
  req.user ? next() : res.sendStatus(401);
}
//routes
router.get("/login/google",passport.authenticate("google", { scope: ["email", "profile"] }));
router.get("/google/callback",passport.authenticate("google", {
    successRedirect: "http://localhost:3000", //hare we need the route of after login
    failureRedirect: "/auth/google/failure",
  })
);
router.get("/protected", isLoggedIn, (req, res) => {
    if(req.user) res.json(req.user);
    else res.redirect("/auth");
});

router.get("/logout", (req, res) => {
  req.session.destroy((err) => {
    if (err) {
      console.log(err);
    }
    res.redirect("http://localhost:3000");
  });
});

router.get('/data',isLoggedIn,(req,res)=>{
   return res.json(req.user)
})

router.get("/auth/google/failure", (req, res) => {
  res.send("Failed to authenticate..");
});

router.get("/", (req, res) => {
  res.send(req.user ? req.user : "Not logged in,login with Google or facebook");
});

module.exports = router;
