// 对localstorage进行封装 保存token到本地存储localstorage
const TOKEN_STR = 'token'

// 获取token对象
export const getTokenStr = () => {
  if (sessionStorage.getItem(TOKEN_STR) !== null) {
    return JSON.parse()
  }
}

/**
 * 保存token到本地localstorage
 */
export const setTokenStr = (tokenObj) => {
  // 把tokenObj这个对象，保存到localstorage中
  if (tokenObj !== '' && tokenObj !== null) {
    sessionStorage.setItem(TOKEN_STR, JSON.stringify(tokenObj))
  }
}

/**
 * 删除token
 */
export const delTokenStr = () => {
  sessionStorage.removeItem(TOKEN_STR)
}
