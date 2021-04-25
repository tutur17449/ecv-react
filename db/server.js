const jsonServer = require("json-server");
const auth = require("json-server-auth");
const express = require("express");
const server = express();
const router = jsonServer.router("db.json");
const bcrypt = require("bcryptjs");
const suid = require("short-uuid");
const jwt = require("jsonwebtoken");
const decodeJwt = require("jwt-decode");
const cors = require("cors");

server.disable("x-powered-by");
server.use(cors());
server.use(express.json({ limit: "10mb" }));
server.use(express.urlencoded({ extended: true }));

/************************** DEFINE RULES FOR VISITOR & USER *************************/
/** Ressource owner*/
/** Logged-in-users */
/** Public users */

/* const rules = auth.rewriter({
    "/users*": "/600/users$1",
}) */

/************************** DEFINE AUTH ROUTES *************************/

server.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  const { db } = req.app;
  let user = db.get("users").find({ email: email }).value();
  if (typeof user === "undefined") {
    return res.status(400).send({
      status: 400,
      message: "Can't find user",
    });
  }

  const validPwd = bcrypt.compareSync(password, user.password);
  if (!validPwd) {
    return res.status(400).send({
      status: 400,
      message: "Password not match",
    });
  }

  let token = jwt.sign(
    { id: user.id, email: user.email, role: user.role },
    "jsonwebtokensecret",
    { expiresIn: 86400000 }
  );

  return res.status(200).send({
    status: 200,
    message: "User connected",
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
      token: token,
    },
  });
});

server.post("/api/auth/register", (req, res) => {
  const { email, password } = req.body;
  const { db } = req.app;

  let user = db.get("users").find({ email: email }).value();

  if (typeof user !== "undefined") {
    return res.status(400).send({
      status: 400,
      message: "User already exist",
    });
  }

  let newUser = {
    id: suid.generate(),
    email: email,
    password: password,
    role: "user",
  };

  bcrypt.genSalt(10, function (err, salt) {
    if (err) {
      return res.status(500).send({
        status: 500,
        message: "Can't create user",
      });
    }
    bcrypt.hash(password, salt, function (err, hash) {
      if (err) {
        return res.status(500).send({
          status: 500,
          message: "Can't create user",
        });
      }

      newUser.password = hash;

      db.get("users").push(newUser).write();
      return res.status(201).send({
        status: 201,
        message: "User create",
        data: newUser,
      });
    });
  });
});

server.get("/api/auth/checkToken", (req, res) => {
  const token = req.header("Authorization")
    ? req.header("Authorization").replace("Bearer ", "")
    : null;
  if (!token) {
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });
  }

  const decodeToken = decodeJwt(token);

  if (Date.now() >= decodeToken.exp * 1000) {
    return res.status(400).send({
      status: 400,
      message: "Token expire",
    });
  }

  const { db } = req.app;
  let user = db.get("users").find({ id: decodeToken.id }).value();

  if (!user) {
    return res.status(401).send({
      status: 401,
      message: "Unauthorized",
    });
  }

  return res.status(200).send({
    status: 200,
    message: "User check",
    data: {
      id: user.id,
      email: user.email,
      role: user.role,
    },
  });
});

// /!\ Bind the router db to the app
server.db = router.db;
//server.use(rules)
server.use("/api", auth);
server.use("/api", router);
server.listen(4321, () => {
  console.log("Server running on port 4321");
});
