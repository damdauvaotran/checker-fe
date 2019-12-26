import {deleteAuthRequest, getAuthRequest, postAuthRequest, putAuthRequest} from '../common'

export const getAllShift = () => getAuthRequest({
  url: '/admin/shifts'
});

export const getShiftById = (id) => getAuthRequest({
  url: `/admin/shift/${id}`,
});


export const createShift = (roomId, subjectId, date, from, to) => postAuthRequest({
  url: '/admin/shift',
  data: {
    roomId, subjectId, date, from, to,
  }
});

export const updateShift = (id, roomId, subjectId, date, from) => putAuthRequest({
  url: `/admin/shift/${id}`,
  data: {
    roomId, subjectId, date, from,
  }
});

export const deleteShift = (id, name, credit) => deleteAuthRequest({
  url: `/admin/shift/${id}`,
});

export const importShift = (id, name, credit) => deleteAuthRequest({
  url: `/admin/shift/${id}`,
});





