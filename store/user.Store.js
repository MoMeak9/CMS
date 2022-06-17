import {makeAutoObservable} from 'mobx'
import {removeToken, request, setToken} from '../utils'
import {login} from "../api/user";

class UserStore {
    token = ''
    userInfo = {
        name: ''
    }

    constructor() {
        makeAutoObservable(this)
    }

    getUserInfo = async () => {
        // 调用接口获取数据
        // const res = await request.get('/user/profile')
        // this.userInfo = res.data
    }

    getToken = async ({mobile = '', password = ''}) => {
        console.log(mobile, password)
        // 调用登录接口
        const res = await login({mobile, password})
        // 存入token
        console.log(res)
        this.token = res.data.token
        // 存入ls
        setToken(this.token)
    }

    // 退出登录
    loginOut = () => {
        this.token = ''
        removeToken()
    }

    // 设置token
    setToken = (token) => {
        this.token = token
        setToken(token)
    }
}

export default UserStore
