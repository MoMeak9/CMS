// 先把所有的工具函数导出的模块在这里导入
// 然后再统一导出
import request from './http'
import {
  setToken,
  getToken,
  removeToken
} from './token'

// import { history } from './history'

export {
  request,
  setToken,
  getToken,
  removeToken,
  // history
}

// import {http} from '@/utils'
