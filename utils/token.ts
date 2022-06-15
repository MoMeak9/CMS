// 封装ls存取token

const key = 'pc-key'

const setToken = (token: string): void => {
    if (typeof window !== "undefined") {
        return window.localStorage.setItem(key, token)
    }
}

const getToken = (): string | null | undefined => {
    if (typeof window !== "undefined") {
        return window.localStorage.getItem(key)
    }
}

const removeToken = (): void => {
    if (typeof window !== "undefined") {
        return window.localStorage.removeItem(key)

    }
}

export {
    setToken,
    getToken,
    removeToken
}
