import { makeAutoObservable } from 'mobx'
import { request } from '../utils'
class ChannelStore {
  channelList = []
  constructor() {
    makeAutoObservable(this)
  }
  // article publish 哪里调用这个函数呢？
  loadChannelList = async () => {

  }
}

export default ChannelStore
