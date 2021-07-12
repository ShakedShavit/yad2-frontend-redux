import { createSlice } from "@reduxjs/toolkit"
import { deleteUserFromCookie, getUserFromCookie } from "../cookies/userDataCookies";
const cookiesUserData = getUserFromCookie();

export const loginSlice = createSlice({
    name: 'userDataState',
    initialState: cookiesUserData ||
    {
        user: null,
        token: ''
    },
    reducers: {
      login: (state, action) => {
          return {
              user: action.payload.user,
              token: action.payload.token 
          }
      },
      logout: (state) => {
        deleteUserFromCookie();

        return {
            user: null,
            token: ''
        }
      }
    }
  })
  
  export const { login, logout } = loginSlice.actions;
  
  export default loginSlice.reducer;