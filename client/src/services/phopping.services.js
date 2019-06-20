import axios from "axios";

export async function buy(submit) {
  try {
    await axios.post("http://localhost:4000/api/phopping/buy", submit);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
