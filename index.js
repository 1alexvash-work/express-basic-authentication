const express = require("express");
const basicAuth = require("basic-auth");

const app = express();
const port = 3000;

// Middleware to trigger authentication popup
app.use((req, res, next) => {
  const credentials = basicAuth(req);

  if (
    !credentials ||
    credentials.name !== "username" ||
    credentials.pass !== "password"
  ) {
    res.set("WWW-Authenticate", 'Basic realm="Authorization Required"');
    res.sendStatus(401);
    return;
  }

  next();
});

app.get("/", (req, res) => {
  res.send("Hello, World!");
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
