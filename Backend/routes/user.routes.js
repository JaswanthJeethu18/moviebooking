module.exports = (app) => {
  const users = require("../controllers/user.controller.js");

  // Create a new User
  app.post("/api/auth/signup", users.signUp);

  // Login a User
  app.post("/api/auth/login", users.login);

  // Logout a User
  app.post("/api/auth/logout/:userId", users.logout);

  // Get coupon code for a User
  app.get("/api/users/:userId/couponCode", users.getCouponCode);

  // Book a show for a User
  app.post("/api/users/:userId/shows/:showId/book", users.bookShow);
};
