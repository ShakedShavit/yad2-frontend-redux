import { createSlice } from "@reduxjs/toolkit"
import { getPublishApartmentFromCookie } from "../cookies/publishApartmentCookies";
const cookiesPublishApartment = getPublishApartmentFromCookie();

export const publishApartmentSlice = createSlice({
    name: 'publishApartmentState',
    initialState: cookiesPublishApartment ||
    {
        apartment: {},
        currPage: 0,
        maxPage: 5
    },
    reducers: {
      goToNextPublishPageAction: (state, action) => {
          return {
            apartment: { ...state.apartment, ...action.payload.newProperties },
            currPage: state.currPage + 1
          }
      },
      returnToPrevPublishPageAction: (state, action) => {
        const prevPage = action.payload.prevPage;
        if (0 > prevPage || prevPage >= state.currPage) return { ...state };
        return {
            apartment: { ...state.apartment, ...action.payload.newProperties },
            currPage: action.payload.prevPage
        }
      },
      resetPublishApartmentAction: (state) => {
        return {
            apartment: {},
            currPage: 0
        }
      }
    }
  })
  
  export const { goToNextPublishPageAction, returnToPrevPublishPageAction, resetPublishApartmentAction } = publishApartmentSlice.actions;
  
  export default publishApartmentSlice.reducer;
