import express from "express";
import makeExpressCallback from "helpers/make-express-callback";
import makeQuery from "helpers/make-query";

const router = express.Router();

async function getAllUserController() {
  const users = await makeQuery("select * from users");
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true, data: users }
  };
}

async function addUserContoller({ body }) {
  const { username, password, role, fullname, avatarUrl } = body;
  const query = `
    insert into users 
    (username, password, role, fullname, avatar_url) values ($1, $2, $3, $4, $5)
  `;
  const args = [username, password, role, fullname, avatarUrl];
  await makeQuery(query, args);

  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true }
  };
}

async function updateUserContoller({ body }) {
  const { username, password, role, fullname, avatarUrl, user_id } = body;
  const query = `
    UPDATE users
	  SET username=$1, password=$2, role=$3, avatar_url=$4, fullname=$5
	  WHERE user_id=$6;
  `;
  const args = [username, password, role, avatarUrl, fullname, user_id];
  await makeQuery(query, args);
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true }
  };
}

async function deleteUserContoller({ body }) {
  const { deleteIDs } = body;
  const query = `
    delete from users
    where user_id in (${deleteIDs.join(",")});
  `;
  await makeQuery(query);
  return {
    headers: { "Content-Type": "application/json" },
    statusCode: 200,
    body: { success: true }
  };
}

router.get("/users", makeExpressCallback(getAllUserController));
router.post("/user/add", makeExpressCallback(addUserContoller));
router.post("/user/update", makeExpressCallback(updateUserContoller));
router.post("/user/delete", makeExpressCallback(deleteUserContoller));

export default router;
