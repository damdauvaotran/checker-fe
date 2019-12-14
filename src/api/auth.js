import {getRequest, postRequest} from './common'

export const login = () => {
  getRequest({
    url: '/auth/login'
  })
}

export const register = () => {
  getRequest({
    url: '/auth/register'
  })
}