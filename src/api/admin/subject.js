import {deleteAuthRequest, getAuthRequest, postAuthRequest, putAuthRequest} from '../common'

export const getAllSubject = () => getAuthRequest({
  url: '/admin/subjects'
});

export const getSubjectById = (id) => getAuthRequest({
  url: `/admin/subject/${id}`,
});


export const createSubject = (name, credit) => postAuthRequest({
  url: '/admin/subject',
  data: {
    name, credit
  }
});

export const updateSubject = (id, name, credit) => putAuthRequest({
  url: `/admin/subject/${id}`,
  data: {
    name, credit
  }
});

export const deleteSubject = (id, name, credit) => deleteAuthRequest({
  url: `/admin/subject/${id}`,
});





