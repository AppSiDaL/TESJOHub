import { io } from "socket.io-client";
import { API_URL } from "@/constants";
const socket = io.connect(`${API_URL}chats` );
export default socket;