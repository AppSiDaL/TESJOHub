import axios from "axios";
import { API_URL } from "@/constants";

interface LoginData{
    username: string;
    password: string;
}
 const createLogin = async (data: LoginData) => {
  try {
    return {token: "1234567890"}

    console.log(data)
    const response = await axios.post(`${API_URL}/login`, data);
    
    //return response.data;
  } catch (error) {
    throw error;
  }
};
export {createLogin}