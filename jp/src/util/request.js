import axios from 'axios'

const service = axios.create({
    baseUrl: '',
    timeout: 6000
})

service.interceptors.request.use(
    config => {
        return config
    },
    error => {
        console.log(error);
        return Promise.reject(error)
    }
)

service.interceptors.response.use(
    response => {
        const res = response.data
        return res
    },
    error => {
        return Promise.reject(error)
    }
)

export default service