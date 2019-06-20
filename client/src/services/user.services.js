import axios from "axios";

export async function getAll() {
  try {
    const response = await axios.get("http://localhost:4000/api/users");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function add(submit) {
  try {
    await axios.post("http://localhost:4000/api/user/add", submit);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function update(submit) {
  try {
    await axios.post("http://localhost:4000/api/user/update", submit);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteUser(submit) {
  try {
    await axios.post("http://localhost:4000/api/user/delete", submit);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
