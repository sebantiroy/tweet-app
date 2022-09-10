import React from 'react'
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

const initialState = {
  userList: null,
  usersInfoList:null

};
const token=`Bearer ${localStorage.getItem('psnToken')}`;
export const getAllProfilePosts = createAsyncThunk(

    "api/v1/users/getAllProfilePosts",
    async (thunkAPI) => {
      const response = await axios({
        method: "get",
        url: `http://localhost:8083/api/v1.0/tweets/all`,
        headers: {
          Authorization: token,
        },
        
      });
      console.log(response);
      return response.data.tweets;
    }
  );
  export const getUsers = createAsyncThunk(
    "api/v1/users/getAllusers",
    async (name,thunkAPI) => {
      const response = await axios({
        method: "get",
        url: `http://localhost:8083/api/v1.0/tweets/user/search/${name}`,
        headers: {
          Authorization: token,
        },
        
      });
      console.log(response);
      return response.data.usersList;
    }
  );
  
  

export const UserPostSliece=createSlice({
    name: "UserPostSliece",
    initialState,
    reducers: {
      
      
    },
    extraReducers: (builder) => {
      builder.addCase(getAllProfilePosts.fulfilled, (state, action) => {
        state.userList = action.payload;
        console.log(state.userList)
      });
      builder.addCase(getUsers.fulfilled, (state, action) => {
        state.usersInfoList = action.payload;
        console.log(state.usersInfoList)
      });
      
    
      
      
    
    },
  });
  
  export const { getProfileId } = UserPostSliece.actions;
  export default UserPostSliece.reducer;
