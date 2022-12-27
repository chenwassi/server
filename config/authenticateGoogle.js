let GoogleStrategy = require("passport-google-oauth20").Strategy;
const UserModels = require("../models/userModels");
const GOOGLE_CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
const GOOGLE_CLIENT_SECRET = process.env.GOOGLE_CLIENT_SECRET;
const passport = require("passport");


module.exports=(passport)=>{
passport.use(
  new GoogleStrategy(
    {
      clientID: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8080/auth/google/callback",
      scope: ["email", "profile"],
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);
      try {
        const ifUserExiest = await UserModels.findOne({
          google_id: profile.id,
        });
        if (ifUserExiest) {
          return done(null, ifUserExiest);
        } else {
          let newUser = new UserModels({
            google_id: profile.id,
            username: profile.displayName,
            name: {
              firstName: profile.name.givenName,
              lastName: profile.name.familyName,
            },
            email: profile.emails[0].value,
            img: profile.photos[0].value,
          });  
          await newUser.save();
          return done(null, newUser);
        }
      } catch (err) {
        throw err;
      }
    }
  )
)}

passport.serializeUser((user, callback) => {
  console.log(user,'serializeUser');
  callback(null, user);
});

passport.deserializeUser((user, callback) => {
  callback(null, user);
});
