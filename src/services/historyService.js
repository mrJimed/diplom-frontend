import axios from "axios";

const ROOT_URL = '/history'

export async function addHistory(title, text) {
    await axios.post(`${ROOT_URL}`, {
        title,
        text
    })
}

export async function getHistory() {
    const { data: history } = await axios.get(`${ROOT_URL}`)
    return history
}