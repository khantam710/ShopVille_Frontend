import axios from "axios";

const BASE_URL = "https://shopville-server.onrender.com/shopville/"
const TOKEN = localStorage.getItem('access_token');
// console.log(TOKEN)
export const publicRequest = axios.create({
    baseURL: BASE_URL,
});

export const userRequest= axios.create({
    baseURL: BASE_URL,
    headers:{access_token: `Bearer ${TOKEN}`}
});