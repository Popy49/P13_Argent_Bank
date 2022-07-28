import { createSlice } from '@reduxjs/toolkit'
// import { selectFreelances } from '../utils/selector'

// Le state initial de la feature freelances
const initialState = {
  userIsLogin: false,
  saveUser: false,
  firstName: null,
  lastName: null,
}

export function fetchOrUpdateFreelance(token) {
  return async (dispatch, getState) => {
    try {
      // on utilise fetch pour faire la requête
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
        }
      ).then((data) => data.json())
      dispatch(actions.getUserNames(response))
    } catch (error) {
      console.log('dada')
      // dispatch(freelancesRejected(error))
    }
  }
}

export function updateUserNames(token, firstName, lastName) {
  // firstName?firstName:
  return async (dispatch, getState) => {
    try {
      // on utilise fetch pour faire la requête
      const response = await fetch(
        'http://localhost:3001/api/v1/user/profile',
        {
          method: 'PUT',
          headers: {
            'Content-Type': 'application/json',
            Authorization: 'Bearer ' + token,
          },
          body: JSON.stringify({
            firstName,
            lastName,
          }),
        }
      ).then((data) => data.json())
      dispatch(actions.getUserNames(response))
    } catch (error) {
      console.log(error)
      // dispatch(freelancesRejected(error))
    }
  }
}

const { actions, reducer } = createSlice({
  name: 'login',
  initialState,
  reducers: {
    // Action & reducer
    login: (state) => {
      state.userIsLogin = true
    },

    saveUser: (state) => {
      state.saveUser = !state.saveUser
    },

    reset: () => initialState,

    getUserNames: (draft, action) => {
      if (action.payload.status === 200) {
        draft.firstName =
          action.payload.body.firstName.charAt(0).toUpperCase() +
          action.payload.body.firstName.slice(1)
        draft.lastName =
          action.payload.body.lastName.charAt(0).toUpperCase() +
          action.payload.body.lastName.slice(1)
      }
    },
  },
})
export const { login, saveUser, getToken, reset, getUserNames } = actions

export default reducer
