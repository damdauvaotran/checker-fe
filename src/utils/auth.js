import cookie from 'js-cookie';
import jwt from 'jsonwebtoken'

export const getUserToken = () => {
  return cookie.get('checkerToken')
};

export const setUserToken = (token, expire = 3) => {
  return cookie.set('checkerToken', token, {expires: expire})
}

export const clearUserToken = ()=>{
  return cookie.remove('checkerToken')
}

export const isLogin = () => {
  return !!getUserToken()
}

export const getUserData = () => {
  const token = getUserToken();
  const data = jwt.decode(token);
  console.log(data)
}