import { configureStore } from '@reduxjs/toolkit';
import apartmentsSlice from '../features/apartmentsSlice';

export default configureStore({
    reducer: {
        ApartmentsDataState: apartmentsSlice
    },
});