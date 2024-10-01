// 1) THIRD PARTY MODULES
const express = require("express");
const cors = require("cors");
// const cookieParser = require("cookie-parser");

// 2) CUSTOM ROUTES
// const hotelRoute = require("./routes/hotel.routes");
// const roomRoute = require("./routes/room.routes");
// const usersRouter = require("./routes/user.routes");
// const bookingsRouter = require("./routes/booking.routes");
// const reviewsRouter = require("./routes/review.routes");
// const cityRouter = require("./routes/city.routes");

// 3) OTHER CUSTOM MODULES
// const AppError = require("./utils/appError");
// const globalErrorHandler = require("./controllers/error.controller");

const app = express();

// 4) MIDDLEWARES

// 4a) CORS -> it will allow the client to fetch from different domain name.
// getting routes will work for the different domain, but if we want to access posting, updating, deleting, routes means we need to cors.
app.use(cors({ origin: "*", credentials: true }));

// 4b) JSON PARSER
app.use(express.json({ limit: "10mb", extended: false }));

// 4c) COOKIE PARSER
// app.use(cookieParser());
// auth token -> res.cookie -> will be reflect only when the domin is same

// 5) ROUTES
// hotels
// app.use("/api/v1/hotels", hotelRoute); // -> error
// app.use("/api/v1/rooms", roomRoute); // -> skipped
// app.use("/api/v1/users", usersRouter); // -> skipped
// app.use("/api/v1/bookings", bookingsRouter);
// app.use("/api/v1/reviews", reviewsRouter);
// app.use("/api/v1/cities", cityRouter);

// 6) OTHERS THAN SPECIFIED ROUTES
app.all("*", (req, res, next) => {
  next(new AppError(`cannot find ${req.originalUrl} in this server!`, 404));
});

// ->
// 7) HANDLING ERRORS
// app.use(globalErrorHandler);

module.exports = app;
