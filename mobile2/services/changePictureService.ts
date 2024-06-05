import axios from "axios";
import { API_URL } from "@/constants";
const urlCover = API_URL + "users/changeCover";
const urlAvatar = API_URL + "users/changeProfile";


let token: any = null;

const setToken = (newToken: string): void => {
  token = `Bearer ${newToken}`;
  
};

const createItem = async (data: FormData,mode:string): Promise<any> => {
    const config = {
      headers: {
        Authorization: token,
        "Content-Type": "multipart/form-data",
      },
    };
    try {
      if (mode === "avatar") {
        const request = await axios.put(urlAvatar, data, config);
        return request.data;
      }
      if (mode === "cover") {
        const request = await axios.put(urlCover, data, config);
        return request.data;
      }
    } catch (error) {
      console.log(error);
    }
  };
  
  
  export default {
    setToken,
    createItem,
  };