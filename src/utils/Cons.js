import { API_BASE } from "@env"
export const API_URL = API_BASE

export const isValidEmail = (email) => {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
};

export const Delay = (ms) =>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            resolve()
        },ms)
    })
}