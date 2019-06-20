import axios from "axios";

export async function getAll() {
  try {
    const response = await axios.get("http://localhost:4000/api/products");
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getById(id) {
  try {
    const response = await axios.get(`http://localhost:4000/api/product/${id}`);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return [];
  }
}

export async function getBestSeller() {
  try {
    const response = await axios.get(
      `http://localhost:4000/api/product/bestSeller`
    );
    console.log(response);
    return response.data.data;
  } catch (error) {
    console.log(error);
    return {};
  }
}

export async function add(submit) {
  try {
    await axios.post("http://localhost:4000/api/product/add", submit);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function update(submit) {
  try {
    await axios.post("http://localhost:4000/api/product/update", submit);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}

export async function deleteProduct(submit) {
  try {
    await axios.post("http://localhost:4000/api/product/delete", submit);
    return true;
  } catch (error) {
    console.log(error);
    return false;
  }
}
