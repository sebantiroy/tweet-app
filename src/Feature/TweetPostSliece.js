import React from 'react'
import axios from "axios";
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ToastContainer, toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import base_url from '../Components/bootApi';

const initialState = {
  profileId: null,
  postList: null,
  profileInfo: null,
  deleteMessege:null,
  updateMessege:null,
  love:null
};
const token=`Bearer ${localStorage.getItem('psnToken')}`;


function showSuccessMessage(inputMessage) {
    toast.success(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
  function showFailMessage(inputMessage) {
    toast.error(inputMessage, {
      position: "bottom-center",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "colored",
    });
  }
export const getProfilePosts = createAsyncThunk(
    "api/v1/users/getProfilePosts",
    async (thunkAPI) => {
      const response = await axios({
        method: "get",
        url: `${base_url}/${localStorage.getItem('psnUsername')}`,
        headers: {
          Authorization: token,
        },
        
      });
      console.log(response);
      return response.data.tweets;
    }
  );
  export const deletePost = createAsyncThunk(
    "api/v1/users/deleteTweet",
    async (postId,thunkAPI) => {
      const response = await axios({
        method: "delete",
        url: `${base_url}/${localStorage.getItem('psnUsername')}/delete/${postId}`,
        headers: {
          Authorization: token,
        },
        
      });
      console.log(response);
      if(response.data.message=="Tweet deleted successfully!")
      {
        showSuccessMessage(response.data.message);
      }
      else showFailMessage(response.data.message);
      return response.data;
    }
  );
  export const updatePost = createAsyncThunk(
    "api/v1/users/updateTweet",
    async ({postId,postContent},thunkAPI) => {
      const response = await axios({
        method: "post",
        url: `${base_url}/${localStorage.getItem('psnUsername')}/update/${postId}`,
        headers: {
          Authorization: token,
        },
        data:postContent
    
        
      });
      console.log(response);
      if(response.status===200)
            showSuccessMessage("updated successfully");
      else 
         showFailMessage("contact admin side")

         
      
      return response.data;
    }
  );
  export const lovePost = createAsyncThunk(
    "api/v1/users/loveTweet",
    async (postId,thunkAPI) => {
      const response = await axios({
        method: "put",
        url: `${base_url}/${localStorage.getItem('psnUsername')}/like/${postId}`,
        headers: {
          Authorization: token,
        },
      
      });
    
      return response.data;
    }
  );


export const TweetPostSliece=createSlice({
    name: "TweetPostSliece",
    initialState,
    reducers: {
      
      
    },
    extraReducers: (builder) => {
      builder.addCase(getProfilePosts.fulfilled, (state, action) => {
        state.postList = action.payload;
        console.log(state.postList)
      });
      builder.addCase(deletePost.fulfilled, (state, action) => {
        state.deleteMessege = action.payload;
        console.log(state.deleteMessege)
      });
      builder.addCase(updatePost.fulfilled, (state, action) => {
        state.updateMessege = action.payload;
        console.log(state.updateMessege)
      });
      builder.addCase(lovePost.fulfilled, (state, action) => {
        state.love = action.payload;
        console.log(state.love)
      });
    },
  });
  
  export const { getProfileId } = TweetPostSliece.actions;
  export default TweetPostSliece.reducer;
