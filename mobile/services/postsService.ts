import axios from "axios";
import { API_URL } from "@/constants";
import { Post } from "@/types";
const url = API_URL + "posts";

let token: any = null;

const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
};

const getUserPosts = async (): Promise<any> => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.get(`${url}/userPosts`, config);
  return request;
};
const getAllPosts = async (): Promise<any> => {
  const request = await axios.get(url);
  return request;
};

const getAnyUserPosts = async (id: string): Promise<any> => {
  const request = await axios.get(`${url}/userPosts/${id}`);
  return request;

}

const getItem = async (id: string): Promise<any> => {
  const request = await axios.get(`${url}/${id}`);
  return request;
};

const createItem = async (data: FormData): Promise<any> => {
  const config = {
    headers: { 
      Authorization: token,
      'Content-Type': 'multipart/form-data'
    },
  };
  const request = await axios.post(url, data, config);
  return request.data;
};

const removeItem = async (item: Post): Promise<any> => {
  const config = {
    headers: { Authorization: token },
  };
  const response = await axios.delete(`${url}/${item.id}`, config);
  return response.data;
};
const updateItem = async (id: string, pieza: Post): Promise<any> => {
  const config = {
    headers: { Authorization: token },
  };
  const request = await axios.put(`${url}/${id}`, pieza, config);
  return request.data;
};

export default {
  getAnyUserPosts,
  getUserPosts,
  getAllPosts,
  setToken,
  createItem,
  removeItem,
  updateItem,
  getItem,
};
