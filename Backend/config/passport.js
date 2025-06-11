const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const User = require("../Models/User"); // Your User mongoose model

passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:5000/auth/google/callback",
    },
    async (accessToken, refreshToken, profile, done) => {
      console.log(profile);

      try {
        const email = profile.emails[0].value.toLowerCase();
        let user = await User.findOne({ googleId: profile.id });

        if (!user) {
          // If no user found with googleId, check by email (maybe signed up before)
          user = await User.findOne({ email });

          if (user) {
            // Link Google account to existing user
            user.googleId = profile.id;
          } else {
            // Create new user
            user = new User({
              googleId: profile.id,
              email,
              firstName: profile.name.givenName || "",
              lastName: profile.name.familyName || "",
              role: "user",
              isEmailVerified: true, // Because Google verified email
              preferences: {
                theme: "light",
                notifications: { email: true, push: true },
                language: "en",
              },
            });
          }
          await user.save();
        }

        return done(null, user);
      } catch (err) {
        return done(err, null);
      }
    }
  )
);

// Serialize/deserialize user (optional depending on session usage)
passport.serializeUser((user, done) => done(null, user.id));
passport.deserializeUser(async (id, done) => {
  const user = await User.findById(id);
  done(null, user);
});

module.exports = passport;
