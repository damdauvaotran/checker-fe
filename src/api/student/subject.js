import {getAuthRequest, postAuthRequest} from '../common'

export const studentGetAllowedSubject = () => getAuthRequest({
  url: '/student/subjects'
});

export const studentGetRegisteredSubject  = (id)=> postAuthRequest({
  url: `/student/subjects/registered`
});

