import axios from 'axios'

const defaultEndpoint = 'http://localhost:8000';

const makeRequest = (config) => {
  return axios({
    ...config,
    baseURL: defaultEndpoint,
  })
}

const makeAuthRequest = (config) => {
  return makeRequest({
    ...config,
    headers: {
      authorization: 'asdkfuiahruhiuahiuehr'
    }
  })
};

export const getRequest = (config) => {
  return makeRequest({
      ...config,
      method: 'GET',
    }
  )
};

export const postRequest = (config) => {
  return makeRequest({
      ...config,
      method: 'POST',
    }
  )
};

export const getAuthRequest = (config) => {
  return makeAuthRequest({
      ...config,
      method: 'GET',
    }
  )
};

export const postAuthRequest = (config) => {
  return makeAuthRequest({
      ...config,
      method: 'POST',
    }
  )
};