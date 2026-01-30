
require("dotenv").config();

const express = require("express");
const cors = require("cors");

const app = express();
app.use(express.json());

const PORT = process.env.PORT;
const APP_NAME = process.env.APP_NAME;

app.use(cors());

app.get("/", (req, res) => {
    res.json({ Page: "First page" });
});

app.get("/health", (req, res) => {
    res.json({ status: "ok" });
});

app.get("/stats", auth, (req, res) => {
    res.json({
        users: 120,
        cpu: "35%",
        memory: "1.2GB",
        uptime: "3 days",
        region: "none",
        serverName: "Maxc",
        age: 19
    });
});



const jwt = require("jsonwebtoken");
app.post("/login", (req, res) => {
  const { username, password } = req.body;


  if (username !== "admin" || password !== "1234") {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  const user = { username };

  const token = jwt.sign(
    user,
    process.env.JWT_SECRET,
    { expiresIn: "1h" }
  );

  res.json({ token });
});


function auth(req, res, next) {
    const header = req.headers.authorization;

    if (!header) {
        return res.status(401).json({ message: "No token" });
    }

    const token = header.split(" ")[1];
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded;
        next();
    } catch {
        res.status(403).json({ message: "invalid token" });
    }
}



if (process.env.NODE_ENV === "production") {
    console.log("Running in production mode");
}

app.listen(PORT, () => {
    console.log(`${APP_NAME} running on port ${PORT}`);
});


