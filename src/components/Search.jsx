import React, { useState, lazy, Suspense } from "react";
import { IoIosSearch } from "react-icons/io";
import { useFirestore } from "../config/Build/firestore";
import { useAuthContext } from "../config/AuthContext";
import {useDispatch} from 'react-redux'
import { searchUsers } from "../redux/userSlice";

const Users = lazy(() => import("./Users"));

const Search = () => {
  const dispatch = useDispatch()

  return (
    <div className="search">
      <div className="searchForm">
        <input
          type="text"
          placeholder="search friends here..."
          onChange={(e)=> dispatch(searchUsers(e.target.value))}
        />
        <span>
          <IoIosSearch />
        </span>
      </div>
      <Suspense fallback={<div>Loading...</div>}>
        <Users />
      </Suspense>
    </div>
  );
};

export default Search;
