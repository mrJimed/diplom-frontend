import axios from "axios";

const ROOT_URL = '/annotation'

/*
    Сервис для отправки HTTP-запрос к сервису для получения аннотация аудиофайла.
*/

export async function extractiveSummarization(file, topN, isSendEmail, toEmail) {
    const { data: summarization } = await axios.post(`${ROOT_URL}/extractive`, {
        file,
        topN,
        isSendEmail,
        toEmail
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return summarization
}

export async function abstractiveSummarization(file, isSendEmail, toEmail, maxLength, minLength) {
    const { data: summarization } = await axios.post(`${ROOT_URL}/abstractive`, {
        file,
        isSendEmail,
        toEmail,
        maxLength,
        minLength
    }, {
        headers: {
            'Content-Type': 'multipart/form-data'
        }
    })
    return summarization
}