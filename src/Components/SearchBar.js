import React, { useState ,useEffect } from "react";
import { Button, Col, Form, Row } from "react-bootstrap";
import { getUsers } from "../Feature/UserPostSliece";
import { useDispatch, useSelector } from "react-redux";
import UserAccountItem from "./UserAccountItem";
import {
    RiHeartFill,
    RiHeartLine,
    RiMessage2Fill,
    RiShareForwardFill,
    RiSendPlane2Fill,
    RiDeleteBin6Line,
    RiEdit2Fill,
    RiUserSearchFill
  } from "react-icons/ri";

export default function SearchBar() {
  const dispatch = useDispatch();
  const [searchContent, setSearchContent] = useState("");
  const [sendButtonDisable, setSendButtonDisable] = useState(true);
  //console.log(state.UserPostSlieceReducer.usersInfoList);
  const userAccounts = useSelector(
    (state) => state.UserPostSlieceReducer.usersInfoList
  );
  console.log(userAccounts)
  useEffect(() => {

    
    
  }, []);
  
  function handleSearch(e)
  {
    dispatch(getUsers(searchContent));
    setSearchContent("");
    
    localStorage.setItem("flag",2);
    localStorage.setItem("accounts",userAccounts);
  }
  
  function handleSearchContentChange(e) {
    e.preventDefault();

    setSearchContent(e.target.value);

    if (searchContent.length - 1 > 0 && searchContent.length - 1 <= 5) {
      setSendButtonDisable(false);
    } else {
      setSendButtonDisable(true);
    }
  }
  return (
    <div><div className="d-flex align-items-center">
    <Form className="w-100 mx-1">
      <Form.Group>
        <Form.Control
          type="textarea"
          placeholder="Search a user"
          value={searchContent}
          onChange={handleSearchContentChange}
        
        />
      </Form.Group>
    </Form>
    <span className="mx-1"></span>
    <div className="ms-auto">
      <Button
        variant="success"
        className="p-1"
        disabled={sendButtonDisable}
        onClick={handleSearch}
      >
        <RiUserSearchFill className="fs-4" />
      </Button>
    </div>
  </div>
  {/* <div>
  {userAccounts !=null ?(
        userAccounts.map((followerAccount) => {
          return (
            <UserAccountItem
              key={followerAccount.id}
              id={followerAccount.id}
              name={followerAccount.name}
              userName={followerAccount.username}
              
            />
          );
        })
      ) : (
        <span></span>
      )}
  </div> */}

  </div>
  
  )
}
