import { createSlice } from '@reduxjs/toolkit';

const slice_arr = createSlice(
    {
        name: "slice_array",
        initialState: {
            data: [],
            Array_size: 10,
            max_Element: 50,
            min_Element: 5,
            speed: 100
        },
        reducers:{
            setData: (state, action) => {state.data = [...action.payload]},
            setArray_size: (state, action) => {state.Array_size = action.payload},
            setmax_Element: (state, action) => {state.max_Element = action.payload},
            setmin_Element: (state, action) => {state.min_Element = action.payload},
            setSpeed: (state, action) => {state.speed = action.payload}
        }
    }
);

export const {setData, setArray_size, setmax_Element, setmin_Element, setSpeed} = slice_arr.actions;
export default slice_arr.reducer;