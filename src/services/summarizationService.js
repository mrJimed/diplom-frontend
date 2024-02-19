import axios from "axios";

const ROOT_URL = '/summarization'

export async function extractiveSummarization(text, top_n) {
    const { data: summarization } = await axios.post(`${ROOT_URL}/extractive`, {
        text,
        top_n
    })
    return summarization
}

export async function abstractiveSummarization(text) {
    const { data: summarization } = await axios.post(`${ROOT_URL}/abstractive`, text)
    return summarization
}