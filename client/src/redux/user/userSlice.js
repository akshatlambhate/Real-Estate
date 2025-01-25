import { createSlice } from "@reduxjs/toolkit";

const initialState= {
    currentUser: null,
    error: null,
    loading: false,
};

const userSlice = createSlice({
    name:'user',
    initialState,
    reducers:{
        signInStart: (state)=>{
            state.loading =true;
        },
        signInSuccess:(state,action) =>{
            state.currentUser=action.payload;
            state.loading=false;
            state.error=null;
        },
        
        signInFailure:(state,action) =>{
            state.error=action.payload;
            state.loading=false;
        },

        updateUserStart:(state) =>{
        state.loading= true;
       },
        updateUserSuccess:(state,action) =>{
        state.loading= false;
        state.currentUser=action.payload;
        state.error= null;
       },
        updateUserFailure:(state,action) =>{
        state.loading= false;
        state.error= action.payload;

       },
       deleteUserStart:(state) =>{
        state.loading= true;
    

       },
       deleteUserSuccess:(state,action) =>{
        state.currentUser= null;
        state.loading= false;
        state.error= action.payload;

       },
        deleteUserFailure:(state,action) =>{
        state.loading= false;
        state.error= action.payload;

       },
       logOutUserStart:(state) =>{
        state.loading= true;
    

       },
     logOutUserSuccess:(state,action) =>{
        state.currentUser= null;
        state.loading= false;
        state.error= action.payload;

       },
        logOUtUserFailure:(state,action) =>{
        state.loading= false;
        state.error= action.payload;

       },

        
    }
})
const Reducer=userSlice.reducer;
export const {signInStart, signInSuccess,signInFailure, updateUserFailure,updateUserStart,updateUserSuccess ,deleteUserFailure,deleteUserStart,deleteUserSuccess, logOUtUserFailure,logOutUserStart ,logOutUserSuccess} = userSlice.actions;

export default Reducer;