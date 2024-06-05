import axios from "axios";
import { API_URL } from "@/constants";
import { Post } from "@/types";
const url = API_URL + "likes";

let token: any = null;

const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};

const createItem = async (id: String): Promise<any> => {
  const config = {
    headers: { Authorization: token },
  };
  const data = {
    post: id,
  };
  const request = await axios.post(url, data, config);
  return request.data;
};

export default {
  setToken,
  createItem,
};
