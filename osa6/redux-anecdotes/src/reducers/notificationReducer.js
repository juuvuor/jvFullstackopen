import { createSlice } from '@reduxjs/toolkit'


const notificationSlice = createSlice({
    name: 'notification',
    initialState: null,
    reducers: {
        notificationShow(state, action) {
            return action.payload
        },
        notificationHide(state, action) {
            return null
        }
    }
})

export const setNotification = (message, time) => {
    return async dispatch => {
      dispatch(notificationShow(message));
      setTimeout(() => {
        dispatch(notificationHide());
      }, time * 1000);
    }
  }

export const { notificationShow , notificationHide } = notificationSlice.actions
export default notificationSlice.reducer