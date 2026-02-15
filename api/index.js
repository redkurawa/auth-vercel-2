require('dotenv').config();

const express = require('express');
const passport = require('passport');
const session = require('express-session');
const GoogleStrategy = require('passport-google-oauth20').Strategy;

const app = express();

// Serve static files from public directory
app.use(express.static('public'));

// Session setup
app.use(
  session({
    secret: process.env.SESSION_SECRET || 'default_secret',
    resave: false,
    saveUninitialized: true,
  })
);

app.use(passport.initialize());
app.use(passport.session());

// Google OAuth strategy
passport.use(
  new GoogleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: `${process.env.BASE_URL}/auth/google/callback`,
    },
    (accessToken, refreshToken, profile, done) => {
      return done(null, profile);
    }
  )
);

passport.serializeUser((user, done) => done(null, user));
passport.deserializeUser((user, done) => done(null, user));

// Toggle Script - for login page (always start with basic)
const toggleScriptLogin = `
  <script>
    let cssEnabled = false;
    const toggleBtn = document.querySelector('.btn-toggle');
    
    function toggleCSS() {
      cssEnabled = !cssEnabled;
      if (cssEnabled) {
        document.body.classList.add('css-enabled');
        toggleBtn.textContent = 'Use Basic';
      } else {
        document.body.classList.remove('css-enabled');
        toggleBtn.textContent = 'Use CSS';
      }
      localStorage.setItem('cssEnabled', cssEnabled);
    }
  </script>
`;

// Toggle Script - for profile page (load saved preference)
const toggleScriptProfile = `
  <script>
    let cssEnabled = false;
    const toggleBtn = document.querySelector('.btn-toggle');
    
    function toggleCSS() {
      cssEnabled = !cssEnabled;
      if (cssEnabled) {
        document.body.classList.add('css-enabled');
        toggleBtn.textContent = 'Use Basic';
      } else {
        document.body.classList.remove('css-enabled');
        toggleBtn.textContent = 'Use CSS';
      }
      localStorage.setItem('cssEnabled', cssEnabled);
    }
    
    // Load saved preference
    if (localStorage.getItem('cssEnabled') === 'true') {
      toggleCSS();
    }
  </script>
`;

// Routes
app.get('/', (req, res) => {
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Login</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <button class="btn-toggle" onclick="toggleCSS()">Use CSS</button>
      <div class="container">
        <div class="login-container">
          <h1 class="login-title">Welcome</h1>
          <p class="login-subtitle">Sign in to continue</p>
          <a href='/auth/google' class="btn btn-primary">
            <span class="google-icon">🔐</span>Login with Google
          </a>
        </div>
      </div>
      ${toggleScriptLogin}
    </body>
    </html>
  `);
});

app.get(
  '/auth/google',
  passport.authenticate('google', { scope: ['profile', 'email'] })
);

app.get(
  '/auth/google/callback',
  passport.authenticate('google', { failureRedirect: '/' }),
  (req, res) => {
    res.redirect('/profile');
  }
);

app.get('/profile', (req, res) => {
  if (!req.user) return res.redirect('/');
  const userName = req.user.displayName;
  res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <title>Profile</title>
      <link rel="stylesheet" href="/styles.css">
    </head>
    <body>
      <button class="btn-toggle" onclick="toggleCSS()">Use CSS</button>
      <div class="container">
        <h1 class="welcome-text">Welcome <span class="user-name">${userName}</span></h1>
        <a href='/logout' class="btn btn-danger">Logout</a>
      </div>
      ${toggleScriptProfile}
    </body>
    </html>
  `);
});

app.get('/logout', (req, res, next) => {
  req.logout((err) => {
    if (err) return next(err);
    // Clear CSS preference on logout
    res.send(`
      <!DOCTYPE html>
      <html>
      <head>
        <script>
          localStorage.removeItem('cssEnabled');
          window.location.href = '/';
        </script>
      </head>
      <body></body>
      </html>
    `);
  });
});

// Export handler untuk Vercel
module.exports = app;

// Jalankan server hanya jika dijalankan langsung (bukan di Vercel)
if (require.main === module) {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server berjalan di http://localhost:${PORT}`);
  });
}
