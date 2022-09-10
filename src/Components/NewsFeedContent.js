import React, { useEffect, useState } from "react";
import axios from "axios"
import { getAllProfilePosts}  from "../Feature/UserPostSliece"
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import { Spinner } from "react-bootstrap";
import Post from "./Post";
import styles from "./styles/postItem.css"


export default function NewsFeedContent() {
    const dispatch = useDispatch();
    const postList = useSelector((state) => state.UserPostSlieceReducer.userList)
    const [userFullname, setUserFullname] = useState(
        localStorage.getItem("psnUsername"));
        const token=localStorage.getItem("psnToken");
    
    useEffect(()=>{
        document.title="NewsfeedContent"
        dispatch(getAllProfilePosts());
        console.log(postList);
        
    },[])
   
  return (
    <div  className="ex1">
        <Post/>
        {postList !== null ? (
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
            />
          );
        })
      ) : (
        <span></span>
      )}
    
    </div>
  );
}
