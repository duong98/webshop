export default function makeUsersDB({ db }) {
  return Object.freeze({
    findAll,
    findById,
    deleteById
  });

  async function findAll() {
    const query = "SELECT * FROM users";
    const response = await db.query(query);
    return response.rows;
  }

  async function findById(id) {
    const query = "SELECT * FROM users WHERE userid = $1";
    const response = await db.query(query, [id]);
    return response.rows;
  }

  async function deleteById(id) {
    const query = "DELETE FROM users WHERE userid = $1";
    const response = await db.query(query, [id]);
    return response.rows;
  }
}
