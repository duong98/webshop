import express from "express";
import makeExpressCallback from "helpers/make-express-callback";
import makeQuery from "helpers/make-query";

const router = express.Router();

async function loginController({ body }) {
  const { username, password } = body;
  const query = "select * from users where username = $1";
  const args = [username];
  const rows = await makeQuery(query, args);

  if (rows.length === 0) {
    throw new Error("user not found");
  }

  const user = rows[0];
  if (user.password !== password) {
    throw new Error("wrong password");
  }

  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true, data: user }
  };
}

async function signupController({ body }) {
  const { username, password, role, fullname, avatarUrl } = body;
  const query = `
    insert into users 
    (username, password, role, fullname, avatarUrl) values ($1, $2, $3, $4, $5)
  `;
  const args = [username, password, role, fullname, avatarUrl];
  await makeQuery(query, args);

  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true }
  };
}

router.post("/login", makeExpressCallback(loginController));
router.post("/signup", makeExpressCallback(signupController));

export default router;
