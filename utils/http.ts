// 封装axios
// 实例化  请求拦截器 响应拦截器
import {message} from "antd";
import axios, {AxiosRequestConfig} from 'axios'
import {getToken} from './token'

const request = axios.create({
    baseURL: process.env.NODE_ENV === "development"
        ? "http://localhost:9000"
        : "https://dev.lwmc.net",
    timeout: 5000
})
// 添加请求拦截器
request.interceptors.request.use((config: AxiosRequestConfig) => {
    // if not login add token
    const token = getToken()
    if (token && config.headers) {
        config.headers.Authorization = `Bearer ${token}`
    }
    return config
}, (error) => {
    return Promise.reject(error)
})

// 添加响应拦截器
request.interceptors.response.use((response) => {
    // 2xx 范围内的状态码都会触发该函数。
    // 对响应数据做点什么
    return response.data
}, (error) => {
    // 超出 2xx 范围的状态码都会触发该函数。
    if (error.response.status !== 200) {
        message.error(error.response.data.message)
    }
    // 对响应错误做点什么
    return Promise.reject(error)
})

export default request;
