import React, { useEffect, useState } from "react";
import axios from "axios"
import { getProfilePosts }  from "../Feature/TweetPostSliece";
import TweetPostSliece from "../Feature/TweetPostSliece";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import { ToastContainer, toast } from "react-toastify";


export default function MyProfile() {
    const dispatch = useDispatch();
    const postList = useSelector((state) => state.TweetPostSlieceReducer.postList)
    const[Post,setPost]=useState({});
    const [userFullname, setUserFullname] = useState(
        localStorage.getItem("psnUsername"));
        const token=localStorage.getItem("psnToken");
    
    useEffect(()=>{
        document.title="myprofile"
        dispatch(getProfilePosts());
        console.log(postList);
        console.log(getProfilePosts());
    },[])


  return (
    <div className="ex1">
      <ToastContainer/>
      <h1>My Post</h1>
      {postList!=null ? (
        postList.map((postItem) => {
          return (
            <PostItem
            key={postItem.id}
            postId={postItem.id}
            firstName={postItem.firstName}
            lastName={postItem.lastName}
            username={postItem.username}
            content={postItem.tweetMessage}
            postDate={postItem.ctearedAt}
            loveList={postItem.like}
            commentList={postItem.comment}
            code="3"
            />
          );
        })
      ) : (
        <span>No post yet</span>
      )}
    </div>
  );
}
