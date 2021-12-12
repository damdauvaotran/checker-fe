import {getRequest, postRequest} from './common'

export const login = ({username, password}) => {
  return postRequest({
    url: '/auth/login',
    data: {
      username,
      password
    },
  })
};

export const register = () => {
  return postRequest({
    url: '/auth/register'
  })
};
