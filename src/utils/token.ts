// 封装ls存取token

const key = 'pc-key'

const setToken = (token: string): void => {
    return window.localStorage.setItem(key, token)
}

const getToken = (): string | null => {
    return window.localStorage.getItem(key)
}

const removeToken = (): void => {
    return window.localStorage.removeItem(key)
}

export {
    setToken,
    getToken,
    removeToken
}
