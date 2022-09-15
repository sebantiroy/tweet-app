import React, { useRef, useState } from "react";
import { Button, Form } from "react-bootstrap";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import "react-toastify/dist/ReactToastify.css";
import { getAllProfilePosts}  from "../Feature/UserPostSliece"
import { Hashicon } from "@emeraldpay/hashicon-react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import base_url from "./bootApi";
export default function Post() {
  const dispatch = useDispatch();
    let navigate = useNavigate();
    const[Postlist,setPostlist]=useState({});
    const [userFullname, setUserFullname] = useState(
        localStorage.getItem("psnUsername"));
        const [userId, setUserId] = useState(localStorage.getItem("psnUserId"));
        const [postContent, setPostContent] = useState("");
        const [postContentCount, setPostContentCount] = useState(0);
        const [disablePostButton, setDisablePostButton] = useState(true);
        const[Post,setPost]=useState({});
        const token=localStorage.getItem("psnToken");
        const postList = useSelector((state) => state.UserPostSlieceReducer.userList)
        axios.defaults.headers.common={
            "Authorization" : `Bearer ${token}`
        }
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
          function handleContentChange(e) {
            setPostContent(e.target.value);
            setPost({...Post,tweetString:e.target.value})
            setPostContentCount(e.target.value.length);
            if (postContentCount === 0 || postContentCount > 200) {
              setDisablePostButton(true);
            } else {
              setDisablePostButton(false);
            }
          }
          const createPost=(inputContent)=> {
    
              axios.post(`${base_url}/${userFullname}/add`,inputContent
              ).then(
                  (response)=>
                  {
                    showSuccessMessage("Posted successfully!");
                    console.log(response);
                    setPostContent("");
                    setPostContentCount(0);
                    setDisablePostButton(true);
                    dispatch(getAllProfilePosts());

                  },
                  (error)=>
                  {
                    showFailMessage("Post failed. Please try again later!");
                    console.log(error);
                    navigate("/newsfeed");
                  }
                  
              );
                };
                
        
          
          async function handleCreatePost(e) {
            e.preventDefault();
            console.log(`Bearer ${token}`);
            console.log(Post);
            createPost(Post);
            //window.location.reload(false);
          //   setTimeout(function(){
          //       window.location.reload(1);
          //    }, 5000);
        
          
         
          }

  return (
    <div>
  {/* <h1>PostCompose component</h1> */}
  <div className="border rounded-3 border-success p-3 shadow">
    <ToastContainer />
    <Form className="d-flex flex-column">
      <Form.Group className="mb-3">
        <Form.Label>
          <div className="d-flex align-items-center mb-1">
            <div className="mx-3">
            <Hashicon value={userId} size={60} />
            </div>
            <div className="fs-4 fw-bold">{userFullname}</div>
          </div>
        </Form.Label>
        <Form.Control
          as="textarea"
          row={4}
          value={postContent}
              onChange={handleContentChange}
              style={{ resize: "none", height: "7rem" }}
        />
      </Form.Group>
      

      <div className="d-flex justify-content-end align-items-center">
            <span>Characters: {postContentCount}/200</span>
            <Button
              onClick={handleCreatePost}
              variant="success"
              disabled={disablePostButton}
              className="col-2 mx-3"
            >
              Post
            </Button>
      </div>
    </Form>
    
    ) : (
      <span></span>
    )
  </div>
</div>
  )
}
