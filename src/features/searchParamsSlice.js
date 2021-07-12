import { createSlice } from "@reduxjs/toolkit"

export const searchParamsSlice = createSlice({
    name: 'searchParamsData',
    initialState: { searchParams: {} },
    reducers: {
        newSearchParamsAction: (state, action) => {
            console.log(action.payload);
          return {
            searchParams: { ...action.payload },
          }
      }
    }
  });
  
  export const { newSearchParamsAction } = searchParamsSlice.actions;
  
  export default searchParamsSlice.reducer;
