import { createSlice } from '@reduxjs/toolkit'

// Initial state
const initialState = {
  userIsLogin: false,
  saveUser: false,
  firstName: null,
  lastName: null,
}

/**
 * Fetch usernames and add it to the store
 * @params string of the token
 * @return void
 * @author JP
 * @version 1.0
 */
export function fetchUserNames(token) {
  return async (dispatch, getState) => {
    try {
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
    } catch (error) {}
  }
}

/**
 * Put new usernames and add it to the store
 * @params string of the token
 * @params string of the new firstname (default last one)
 * @params string of the lastname (defult last one)
 * @return void
 * @author JP
 * @version 1.0
 */
export function updateUserNames(token, firstName, lastName) {
  return async (dispatch, getState) => {
    try {
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
    } catch (error) {}
  }
}

/**
 * ACTIONS AND REDUCER of User
 */

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
