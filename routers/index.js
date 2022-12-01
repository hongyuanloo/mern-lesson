// Routers are responsible to document APIs.

const express = require("express");
const app = express();
const { router: comedianRouter } = require("./comedian-router");
const { router: showRouter } = require("./show-router");
const { router: accountRouter } = require("./account-router");
const { assign, unassign } = require("../controllers/show-controller");
const { generatePayroll } = require("../services/payroll-service");
const httpStatus = require("http-status");
const passport = require("passport");
const session = require("express-session");

require("../config/passport")(passport);

//Middleware
app.use(express.json());
app.use(session({ secret: "WDI-GENERAL-ASSEMBLY-EXPRESS" }));
app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", accountRouter);

//Endpoints
app.use("/comedians", comedianRouter);
app.use("/shows", showRouter);

app.use(express.static("public"));

app.post("/assign/:showId/:comedianId", assign);
app.delete("/assign/:showId/:comedianId", unassign);
app.post("/generatepayroll/:month/:year", async (req, res) => {
  const month = parseInt(req.params.month);
  const year = parseInt(req.params.year);
  await generatePayroll(month, year);
  res.sendStatus(httpStatus.OK);
});

app.listen(3000, () => {
  console.log("listening to port 3000");
});
