import cookie from 'js-cookie';
import jwt from 'jsonwebtoken'

export const getUserToken = () => {
  return cookie.get('checkerToken')
};

export const setUserToken = (token, expire = 3) => {
  return cookie.set('checkerToken', token, {expires: expire})
}

export const clearUserToken = () => {
  return cookie.remove('checkerToken')
}

export const isLogin = () => {
  const token = getUserToken();
  if (token) {
    const {exp} = jwt.decode(token);
    return exp * 1000 >= Date.now();
  }
  return false
}

export const getUserData = () => {
  const token = getUserToken();
  return jwt.decode(token)
}