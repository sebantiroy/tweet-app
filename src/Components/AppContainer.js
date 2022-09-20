import React from "react";
import {BrowserRouter, Routes, Route} from "react-router-dom";

import HomePage from "./HomePage";
import NotFoundPage from "./NotFoundPage";
import NewsFeed from "./NewsFeed";
import NewsFeedContent from "./NewsFeedContent";
import Profile from "./Profile";
import MyProfile from "./MyProfile";
import AllAccounts from "./AllAccounts";
import UnauthorizedPage from "./UnauthorizedPage";
import Login from "./Login";
import Registration from "./Registration";
import SignIn from "./SignIn";
import SearchBar from "./SearchBar";
function AppContainer() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login/>}/>
        <Route path="login" element={<Login />} />
        <Route path="/registration" element={<Registration />} />
        <Route path="/newsfeed" element={<NewsFeed />}>
          <Route path="" element={<NewsFeedContent />} />
          <Route path="profile" element={<Profile />} />
          <Route path="myprofile" element={<MyProfile />} />
          <Route path="allaccounts" element={<AllAccounts />} />
          <Route path="searchbar"  element={<SearchBar/>}/>
        </Route>
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<NotFoundPage />} />        
      </Routes>
    </BrowserRouter>
  );
}

export default AppContainer;