const express = require('express')
const jsonwebtoken = require("jsonwebtoken");
const bodyParser = require('body-parser')
const app = express()
const port = 3000
const JWT_SECRET = 'zVrHJLByC4uqArQDhrNxGngC2wxtOVey6r14HOOx'

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.post("/login", (req, res) => {
  const { username, password } = req.body;

  if (username === "root" && password === "toor") {
    return res.json({
      token: jsonwebtoken.sign({ user: "root" }, JWT_SECRET),
    });
  }

  return res
    .status(401)
    .json({ message: "Invalid credentials" });
});

app.get("/logged", (req, res) => {
  if (!req.headers.authorization) {
    return res.status(401).json({ error: "Missing authorization" });
  }

  const authHeader = req.headers.authorization;
  const token = authHeader.split(" ")[1];

  try {
    const { user } = jsonwebtoken.verify(token, JWT_SECRET)

    return res.status(200).json({
      message: `Logged in as ${user}`,
    });
  } catch (error) {
    return res.status(401).json({ error: "Not Authorized" });
  }
});

app.listen(port, () => {
  console.log(`listening on port ${port}`)
})