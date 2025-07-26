import { configureStore } from '@reduxjs/toolkit';
import slice_arr_reducer from './slice_arr';

const stores = configureStore({
    reducer:{
        slice_arr: slice_arr_reducer,
    }
})

export default stores;