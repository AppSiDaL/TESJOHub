import { io } from "socket.io-client";
import { API_URL } from "@/constants";
const socket = io.connect('http://localhost:3000/');
export default socket;