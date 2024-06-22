// set and remove user credentails to the local storage
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    userinfo: localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : null
};

// create slice
const authSlice = new createSlice({
    name:"auth",
    initialState,
    reducers: {
        setCredentials: (state, action) => {
            state.userinfo = action.payload;
            localStorage.setItem('userinfo', JSON.stringify(action.payload));
        } ,
        logout: (state, action) => {
            state.userinfo = null;
            localStorage.removeItem("userinfo");
        },
        register: (state, action) => {
            state.userinfo = action.payload;

        }
    }
});


export const { setCredentials, logout, register } = authSlice.actions;
export default authSlice.reducer;