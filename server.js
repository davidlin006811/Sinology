const express = require("express");
const path = require("path");
const app = express();

//if (process.env.Node_ENV === "production") {
app.use(express.static(path.join(__dirname, "/dist")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname + "/dist/index.html"));
});
//}
const port = process.env.PORT || 5000;
app.listen(port, () => {
  console.log("listening port " + port);
});
