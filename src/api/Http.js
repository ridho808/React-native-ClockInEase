import { API_URL } from "@utils/Cons";
import axios from "axios";


export default ServerAPI = (token) =>{ 
    const instances = axios.create({
    baseURL: API_URL,
    timeout: 10000,
    headers: {
        "Content-Type": "application/json",
        },
    });
    if(token){
        instances.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    }
    return instances
}