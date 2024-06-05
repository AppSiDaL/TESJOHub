import axios from "axios";
import { API_URL } from "@/constants";
import { Post } from "@/types";
const url = API_URL + "comments";

let token: any = null;

const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};

const createItem = async (data:any): Promise<any> => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.post(url, data, config);
  return request.data;
};

export default {
  setToken,
  createItem,
};
