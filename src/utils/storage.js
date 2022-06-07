// 对localstorage进行封装 保存token到本地存储localstorage
const TOKEN_STR = 'token'

// 获取token对象
export const getTokenStr = () => {
  return JSON.parse(localStorage.getItem(TOKEN_STR))
}

/**
 * 保存token到本地localstorage
 */
export const setTokenStr = (tokenObj) => {
  // 把tokenObj这个对象，保存到localstorage中
  localStorage.setItem(TOKEN_STR, JSON.stringify(tokenObj))
}

/**
 * 删除token
 */
export const delTokenStr = () => {
  localStorage.removeItem(TOKEN_STR)
}
