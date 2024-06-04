import axios from "axios";
import { API_URL } from "@/constants";
const url = API_URL + "followers";

let token: any = null;

const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};

const createItem = async (id: String): Promise<any> => {
  const config = {
    headers: { Authorization: token },
  };
  const data = {
    user: id,
  };
  const request = await axios.post(url, data, config);
  return request.data;
};

export default {
  setToken,
  createItem,
};
