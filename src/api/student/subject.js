import {getAuthRequest, postAuthRequest} from '../common'

export const studentGetAllowedSubject = () => getAuthRequest({
  url: '/student/subjects'
});

