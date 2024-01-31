import { configureStore } from '@reduxjs/toolkit'

import filterReducer from './filterReducer'


import anecdoteReducer from './anecdoteReducer' 
import notificationReducer from './notificationReducer'

const store = configureStore({
    reducer: {
        notification: notificationReducer,
        filter: filterReducer,
        anecdote: anecdoteReducer,
    }
  })

  store.subscribe(()=>{console.log(store.getState())}) 
export default store