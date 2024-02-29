import axios from "axios";

const ROOT_URL = '/user'

export async function registrationUser(username, email, password) {
    const { data: user } = await axios.post(`${ROOT_URL}/registration`, {
        username,
        email,
        password
    })
    return user
}

export async function authorizationUser(email, password) {
    const { data: user } = await axios.post(`${ROOT_URL}/authorization`, {
        email,
        password
    })
    return user
}