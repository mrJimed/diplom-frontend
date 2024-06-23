import axios from "axios";

const ROOT_URL = '/user'

/*
    Сервис для отправки HTTP-запрос к сервису для регистрации/авторизации и выхода из системы.
*/

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

export async function logoutUser() {
    await axios.post(`${ROOT_URL}/logout`)
}