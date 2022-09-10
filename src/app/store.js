
import TweetPostSlieceReducer from "../Feature/TweetPostSliece";
import UserInfoSlieceReducer from "../Feature/UserInfoSliece";
import UserPostSlieceReducer from "../Feature/UserPostSliece";
import TweetListSlieceReducer from "../Feature/TweetListSliece";
import { configureStore } from "@reduxjs/toolkit";
import UserInfoSliece from "../Feature/UserInfoSliece";

export const store = configureStore({
    reducer: {
        UserPostSlieceReducer:UserPostSlieceReducer,
        TweetListSlieceReducer:TweetListSlieceReducer,
        TweetPostSlieceReducer:TweetPostSlieceReducer,
        UserInfoSlieceReducer:UserInfoSlieceReducer,
        
    },
    
});