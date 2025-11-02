require("dotenv").config();
require('isomorphic-fetch');
const cors = require("cors");
const express = require("express");
const rateLimit = require("express-rate-limit");
const helmet = require("helmet");

const userRoutes = require("./routes/userRoutes");
const flagRoutes = require("./routes/flagRoutes");

const app = express();

// Security headers
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100, 
  message: { error: "Too many requests, please try again later" }
});

const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, 
  max: 5, 
  message: { error: "Too many login attempts, please try again later" }
});

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

// Use Limiter
app.use("/users/login", authLimiter);
app.use("/users/password", authLimiter);
app.use(limiter);

app.use("/users", userRoutes);
app.use("/flags", flagRoutes);

app.listen(3000, () => {
  console.log("✅ Server running at http://localhost:3000");
});
