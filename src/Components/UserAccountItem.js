import React, { Component } from 'react'
import { Hashicon } from "@emeraldpay/hashicon-react";
import { Link } from "react-router-dom";
import {getTweets }  from "../Feature/TweetListSliece"
import { useDispatch, useSelector } from "react-redux";



export default function UserAccountItem(props) {
    const dispatch = useDispatch();
    function handleClick(e) {
        dispatch(getTweets(props.userName));
      }
  return (
    
    
    
    <div className="d-flex align-items-center my-5">
      <div> 
        <Hashicon value={props.name} size={60} />
      </div>
      <div className="mx-3 fw-bold">
        <Link
          to="/newsfeed/profile"
          className="text-decoration-none text-dark"
          onClick={handleClick}
          
        >
          {props.name}
        </Link>
      </div>
      </div>
      
  )
}
