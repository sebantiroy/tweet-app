import React, { useState ,useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { getAllusers } from "../Feature/UserInfoSliece";
import UserAccountItem from "./UserAccountItem";
import SearchBar from "./SearchBar";

function AllAccounts() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [allAccounts,setAllAccounts]=useState("");
  const storeAccounts = useSelector(
    (state) => state.UserInfoSlieceReducer.allusersList
  );
console.log(storeAccounts);
 
  useEffect(() => {
    
    dispatch(getAllusers());
    dispatch(getAllusers());
    if (localStorage.getItem("psnToken") === null) {
      navigate("/unauthorized");
    }
    
    console.log(storeAccounts)
  }, []);

  return (
    <div>
        <h1></h1>
      <SearchBar/>
      {storeAccounts ? (
        storeAccounts.map((followerAccount) => {
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
    </div>
  );
}
export default AllAccounts;
