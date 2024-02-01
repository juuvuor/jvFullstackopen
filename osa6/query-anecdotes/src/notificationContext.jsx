/* eslint-disable react/prop-types */
import { createContext, useReducer, useContext } from 'react'
const NotificationContext = createContext()

export const useNotificationValue = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[0]
}

export const useNotificationDispatch = () => {
  const notificationAndDispatch = useContext(NotificationContext)
  return notificationAndDispatch[1]
}

const notificationReducer = (state, action) => {
    switch (action.type) {
      case 'SET_NOTIFICATION':
        return action.notification
      case 'CLEAR_NOTIFICATION':
        return null
      default:
        return state
    }
  }



export const NotificationContextProvider = (props) => {
  const [notification, notificationDispatch] = useReducer(notificationReducer, null)

  return (
    <NotificationContext.Provider value={[notification, notificationDispatch] }>
      {props.children}
    </NotificationContext.Provider>
  )
}
 

export default NotificationContext