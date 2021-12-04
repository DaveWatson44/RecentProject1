import axios from '@/axios'

export function login(userName, password){
    return axios
        .post("/login", { userName: userName, password: password })
}

export function signup(userName, password){
    return axios
        .post("/signup", { userName: userName, password: password })
}

export function getTickets(payload){
    const status = payload.status;
    return axios.post("/tickets", {status: status})
}