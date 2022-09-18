import React, { useState ,useEffect } from "react";
import { Hashicon } from "@emeraldpay/hashicon-react";
import TimeAgo from "javascript-time-ago";
import en from "javascript-time-ago/locale/en.json";
import { getAllProfilePosts}  from "../Feature/UserPostSliece"
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import { getProfilePosts }  from "../Feature/TweetPostSliece";
import { getTweets } from "../Feature/TweetListSliece";

import {
  RiHeartFill,
  RiHeartLine,
  RiMessage2Fill,
  RiShareForwardFill,
  RiSendPlane2Fill,
  RiDeleteBin6Line,
  RiEdit2Fill
} from "react-icons/ri";
import { Button, Col, Form, Row } from "react-bootstrap";
import { deletePost,updatePost,lovePost}  from "../Feature/TweetPostSliece"
import styles from "./styles/PostItem.module.css";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import NewsFeedContent from "./NewsFeedContent";
import base_url from "./bootApi";


function PostItem(props) {
 let navigate = useNavigate();
  const dispatch = useDispatch();
  const message = useSelector((state) => state.TweetPostSlieceReducer.deleteMessege)
  const update=useSelector((state) => state.TweetPostSlieceReducer.updateMessege)
  const [loveStatus, setLoveStatus] = useState(false);
  const [commentStatus, setCommentStatus] = useState(false);
  const [commentContent, setCommentContent] = useState("");
  const [editStatus, setEditStatus] = useState(false);
  const [editContent, setEditContent] = useState(props.content);
  const [sendButtonDisable, setSendButtonDisable] = useState(true);
  const token=localStorage.getItem("psnToken");
  const [currentUserId, setCurrentUserId] = useState(
    localStorage.getItem("psnUserId")
  );
  const username=localStorage.getItem('psnUsername')
  const [post,setPost]=useState();
  const [postId, setPostId] = useState(props.postId);
  const [pusername,setPusername]=useState(props.username);
  const[love,setLove]=useState(props.loveList);
  const postList = useSelector((state) => state.UserPostSlieceReducer.userList)
  const [commentRequest,setCommentRequest]=useState("");
 // const [love,setLove]=useState(props.loveList);
 const [cnt,setCnt]=useState(1);
 axios.defaults.headers.common={
  "Authorization" : `Bearer ${token}`
}
    
  useEffect(()=>{
    
    if (props.loveList.includes(username
      )) {
      setLoveStatus(true);
    } else {
      setLoveStatus(false);
    }
    console.log(pusername);
    


},[])
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

  TimeAgo.addLocale(en);
  const timeAgo = new TimeAgo("en-US");
  function updatePostClick(e)
  {
    e.preventDefault();
    console.log(post)
    if(cnt==1)
    {
      dispatch(updatePost({
        postId:postId,
        postContent:post
    }));
    
    }
    
    setEditContent("");
    // setTimeout(function(){
    //     window.location.reload(1);
    //  }, 5000);
    //window.location.reload(false);
    
    if(props.code==="1")
    {
     dispatch(getAllProfilePosts());
     dispatch(getAllProfilePosts());
    }
    
    else{
      dispatch(getProfilePosts())
      dispatch(getProfilePosts())
    }

  }
  function handleDeleteClick(e)
{    e.preventDefault();
     dispatch(deletePost(postId));
     
     //window.location.reload(false)
     if(props.code==="1")
     {
      dispatch(getAllProfilePosts());
      dispatch(getAllProfilePosts());
     }
     else if(props.code==="3")
    {
      dispatch(getProfilePosts())
       dispatch(getProfilePosts())
    }
     else{
       dispatch(getTweets(props.username))
       dispatch(getTweets(props.username))
     }
     
     
  }
  const postComments=(commentRequest)=> {
    
    axios.post(`${base_url}/${username}/reply/${postId}`,commentRequest
    ).then(
        (response)=>
        {
          showSuccessMessage("Posted successfully!");
          console.log(response);
          setCommentContent("");
          setSendButtonDisable(true);
          if(props.code==="1")
          {
           dispatch(getAllProfilePosts());
           dispatch(getAllProfilePosts());
          }
          else if(props.code==="2")
          {
            dispatch(getTweets(props.username))
          }
          else{
            dispatch(getProfilePosts())
            dispatch(getProfilePosts())
          }
     

        },
        (error)=>
        {
          showFailMessage("Post failed. Please try again later!");
          console.log(error);
          
        }
        
    );
      };

  function handleLoveClick(e) {
    dispatch(lovePost(postId))
    if(props.code==="1")
     {
      dispatch(getAllProfilePosts());
      dispatch(getAllProfilePosts());
     }
     else if(props.code==="3")
    {
      dispatch(getProfilePosts())
       dispatch(getProfilePosts())
    }
     else{
       dispatch(getTweets(props.username))
       dispatch(getTweets(props.username))
     }

    if (!props.loveList.includes(username)) {
      setLoveStatus(true);
      
    
    } else {
      setLoveStatus(false);
      
    }
    console.log(love);
    console.log(love)
    
  }
  function sendComment(e)
  {
    e.preventDefault();
    postComments(commentRequest);
    dispatch(getAllProfilePosts);

  }

  function handleShareClick(e) {
    
  }

  function handleCommentButtonClick(e) {
    setCommentStatus(!commentStatus);

  }
  function handleEditButtonClick(e) {
    setEditStatus(!editStatus);
  }

  function handleCommentContentChange(e) {
    e.preventDefault();
    setCommentContent(e.target.value);
    setCommentRequest({...commentRequest,tweetString:e.target.value})

    if (commentContent.length - 1 > 0 && commentContent.length - 1 <= 100) {
      setSendButtonDisable(false);
    } else {
      setSendButtonDisable(true);

    }
  }
  function handleEditContentChange(e) {
    e.preventDefault();

    setEditContent(e.target.value);
    setPost({...post,tweetString:e.target.value})

    if (editContent.length - 1 > 0 && editContent.length - 1 <=200) {
      setSendButtonDisable(false);
    } else {
      setSendButtonDisable(true);
    }
  }

  

  return (
    <div className="border shadow rounded-3 border-primary p-3 mt-3">
      <Row>
        <div className="d-flex align-items-center mb-3">
          <div className="mx-3">
            <Hashicon value={props.firstName + " " + props.lastName} size={50} />
          </div>
          <div className="d-flex flex-column">
          <div className="fw-bold">{props.firstName + " " + props.lastName+" (@"+props.username+")"}</div>
          <div className="text-secondary">{timeAgo.format(new Date(props.postDate).getTime())}</div>
         
          </div>
        </div>
        <div className="mx-3">
          <div>
            <p>{props.content}</p>
          </div>
          <div></div>
          
        </div>

        {/* Sub-functions of a post */}

        <div className="d-flex justify-content-center align-items-center">
          {/* Sub-function love button */}
          <div className="mx-3">
            <span
              className={`${styles.loveButton} mx-1 fs-4`}
              onClick={handleLoveClick}
            >
              {loveStatus ? (
                <RiHeartFill className="text-danger" />
              ) : (
                <RiHeartLine className="text-danger" />
              )}
            </span>
            <span>
              {props.loveList.length > 0 ? props.loveList.length : null}
            </span>
            
          </div>

          {/* Sub-function comment button */}
          <div className="mx-3">
            <span
              className={`${styles.commentButton} mx-1 fs-4`}
              onClick={handleCommentButtonClick}
            >
              <RiMessage2Fill className="text-primary" />
            </span>
            <span>
              {props.commentList.length > 0 ? props.commentList.length : null}
            </span>
            
          </div>

          {/* Sub-function share button */}
          
          <div className="mx-3">
            <span
              className={`${styles.editButton} mx-1 fs-4`}
              onClick={handleEditButtonClick}
            >
              <RiEdit2Fill className="text-success" />
            </span>
            
          </div>
          <div className="mx-3">
            <span
              className={`${styles.deleteButton} mx-1 fs-4`}
              onClick={handleDeleteClick}
            >
              <RiDeleteBin6Line color="red" className="text-success" />
            </span>
            
          </div>
          
          
        </div>
        

        {/* List of comments and comment input box */}
        {commentStatus === true ? (
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <Form className="w-100 mx-1">
                <Form.Group>
                  <Form.Control
                    type="text"
                    placeholder="Write a comment..."
                    value={commentContent}
                    onChange={handleCommentContentChange}
                  />
                </Form.Group>
              </Form>
              <span className="mx-1">{commentContent.length}/100</span>
              <div className="ms-auto">
                <Button
                  variant="success"
                  className="p-1"
                  disabled={sendButtonDisable}
                  onClick={sendComment}
                  
                >
                  <RiSendPlane2Fill className="fs-4" />
                </Button>
              </div>
            </div>{props.commentList.map((commentItem) => (
              <div className="border rounded border-info my-3 px-2 pb-2">
                <div className="d-flex align-items-center my-2">
                  <div className="me-auto mx-1">
                    <Hashicon value={commentItem.firstName+" "+commentItem.lastName} size={30} />{" "}
                    
                  </div>
                  <div className="w-100 mx-1 fw-bold">
                    <span>{commentItem.firstName+" "+commentItem.lastName}
                    
                    </span>
                    
                  </div>
                  
                  
                </div>
                
                <div>{commentItem.tweetMessage}</div>
              </div>
            ))}
          </div>
        ) : (
          <span></span>
        )}
        {editStatus === true && username==pusername ? (
          <div className="mt-3">
            <div className="d-flex align-items-center">
              <Form className="w-100 mx-1">
                <Form.Group>
                  <Form.Control
                    type="textarea"
                    placeholder="Write updated message...."
                    value={editContent}
                    onChange={handleEditContentChange}
                  />
                </Form.Group>
              </Form>
              <span className="mx-1">{editContent.length}/200</span>
              <div className="ms-auto">
                <Button
                  variant="success"
                  className="p-1"
                  disabled={sendButtonDisable}
                  onClick={updatePostClick}
                  
                >
                  <RiSendPlane2Fill className="fs-4" />
                </Button>
              </div>
            </div>
            
          </div>
          
        ) : (
          <span></span>
        )}
      </Row>
    </div>
  );
}

export default PostItem;
