import axios from "axios";

const API = axios.create({
  baseURL: "https://jsonplaceholder.typicode.com",
});

export const getPosts = async () => {
  try {
    const res = await API.get("/posts");
    return res.data;
  } catch (error) {
    throw error;
  }
}