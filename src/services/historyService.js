import axios from "axios";

const ROOT_URL = '/history'

export async function getHistory() {
    const { data: history } = await axios.get(`${ROOT_URL}`)
    return history
}

export async function getHistoryInfo(id){
    const { data: history } = await axios.get(`${ROOT_URL}/${id}`)
    return history
}