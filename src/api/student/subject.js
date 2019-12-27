import {getAuthRequest, postAuthRequest} from '../common'

export const studentGetAllowedSubject = () => getAuthRequest({
  url: '/student/subjects'
});

export const studentGetRegisteredSubject  = ()=> getAuthRequest({
  url: `/student/subjects/registered`
});

