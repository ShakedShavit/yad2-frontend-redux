import { configureStore } from '@reduxjs/toolkit';
import loginSlice from '../features/loginSlice';

export default configureStore({
    reducer: {
        userDataState: loginSlice
    },
});