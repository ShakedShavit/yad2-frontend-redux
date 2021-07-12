import { createSlice } from "@reduxjs/toolkit"

const getNewApartmentIds = (newApartments) => {
    const newApartmentIds = [];
    newApartments.forEach(apartmentData => newApartmentIds.push(apartmentData.apartment._id));
    return newApartmentIds;
}

export const apartmentsSlice = createSlice({
    name: 'apartmentsDataState',
    initialState: {
        apartments: [],
        apartmentIds: []
    },
    reducers: {
      addApartmentsAction: (state, action) => {
          return {
              apartments: [ ...state.apartments, ...action.payload ],
              apartmentIds: [ ...state.apartmentIds, ...getNewApartmentIds(action.payload) ] 
          }
      },
      newApartmentsAction: (state, action) => {
        return {
            apartments: [ ...action.payload ],
            apartmentIds: [ ...getNewApartmentIds(action.payload) ] 
        }
      },
      sortApartmentsAction: (state, action) => {
        return {
            apartments: [ ...action.payload ],
            apartmentIds: [ ...state.apartmentIds ] 
        }
      }
    }
  })
  
  export const { addApartmentsAction, newApartmentsAction, sortApartmentsAction } = apartmentsSlice.actions;
  
  export default apartmentsSlice.reducer;