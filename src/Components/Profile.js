import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import PostItem from "./PostItem";
import { ToastContainer, toast } from "react-toastify";

export default function Profile() {
    const dispatch = useDispatch();
    const postList = useSelector((state) => state.TweetListSlieceReducer.tweetList)
    const[Post,setPost]=useState({});
    const [userFullname, setUserFullname] = useState(
        localStorage.getItem("psnUsername"));
        const token=localStorage.getItem("psnToken");
    
    useEffect(()=>{
        document.title="profile"
        console.log(postList);
    
    },[])
    return (
        <div className="ex1">
          <ToastContainer/>
          
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
                  commentList={postItem.comment}
                  code="2"
                />
              );
            })
          ) : (
            <h1>No post yet</h1>
          )}
        </div>
      );
}
