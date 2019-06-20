import axios from "axios";

export async function getAll() {
  try {
    const response = await axios.get("http://localhost:4000/api/orders");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}
