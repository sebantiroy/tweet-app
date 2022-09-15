import React from 'react'
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import base_url from '../Components/bootApi';

const initialState = {
  tweetList:null,

};
const token=`Bearer ${localStorage.getItem('psnToken')}`;
export const getTweets = createAsyncThunk(
    "api/v1/users/getAllProfilePosts",
    async (userName,thunkAPI) => {
      const response = await axios({
        method: "get",
        url: `${base_url}/${userName}`,
        headers: {
          Authorization: token,
        },
        
      });
      console.log(response);
      return response.data.tweets;
    }
  );
  export const TweetListSliece=createSlice({
    name: "TweetListSliece",
    initialState,
    reducers: {
      
      
    },
    extraReducers: (builder) => {
      
        builder.addCase(getTweets.fulfilled, (state, action) => {
          state.tweetList = action.payload;
          console.log(state.tweetList)
        });
    },
  });
  
  export const { getProfileId } = TweetListSliece.actions;
  export default TweetListSliece.reducer;