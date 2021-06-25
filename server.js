const express = require("express")
const morgan = require("morgan")
const app = express();
const connectDB = require("./config/database")
const passport = require("passport")
const session = require("express-session")
const MongoStore = require("connect-mongo")(session)
const mainRoutes = require("./routes/main")
const trailRoutes = require("./routes/trails")
const flash = require("express-flash")
const mongoose = require("mongoose")

require("dotenv").config({ path: "./config/.env" })
require("./config/passport")(passport)
connectDB()

app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.set("view engine", "ejs")
app.use(express.static("public"))
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
}
app.use(express.static("views"))
app.use(
  session({
    secret: "I like to Hike",
    resave: false,
    saveUninitialized: false,
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
  })
);
app.use(passport.initialize())
app.use(passport.session())
app.use(flash())
app.use("/", mainRoutes)
app.use("/trails", trailRoutes)
app.listen(process.env.PORT, () =>
  console.log(`Server is running on port ${process.env.PORT}`)
)