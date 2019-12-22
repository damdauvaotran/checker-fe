import cookie from 'js-cookie';

export const getUserToken = () => {
  return cookie.get('')
};

export const setUserToken = (token, expire = 3) => {
  return cookie.set('checkerToken', token, {expires: expire})
}