const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const PORT = process.env.PORT || 5000;

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors());

if (process.env.NODE_ENV === "production") {
  app.use(express.static(path.join(__dirname, "frontend/dist/wish-list")));
}

//ROUTES
app.use("/auth", require("./routes/auth"));
app.use("/lists", require("./routes/lists"));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "frontend/dist/wish-list/index.html"));
})

app.listen(PORT, () => {
  console.log(`server is running on port ${PORT}`)
});
