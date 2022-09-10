import React from 'react'
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  
  allusersList:null

};
const token=`Bearer ${localStorage.getItem('psnToken')}`;
export const getAllusers = createAsyncThunk(
    "api/v1/users/getAllusers",
    async (thunkAPI) => {
      const response = await axios({
        method: "get",
        url: `http://localhost:8083/api/v1.0/tweets/users/all`,
        headers: {
          Authorization: token,
        },
        
      });
      console.log(response);
      return response.data.usersList;
    }
  );
  export const UserInfoSliece=createSlice({
    name: "UserInfoSliece",
    initialState,
    reducers: {
      
      
    },
    extraReducers: (builder) => {
      
        builder.addCase(getAllusers.fulfilled, (state, action) => {
          state.allusersList = action.payload;
          console.log(state.allusersList)
        });
    },
  });
  
  export const { getProfileId } = UserInfoSliece.actions;
  export default UserInfoSliece.reducer;
