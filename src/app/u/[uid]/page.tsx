"use client"
import React from "react";
import UserView from "./components/UserView";
import { useAuthStore } from "@/store/AuthStore";

const UserPage = () => {
  const {  userData, isLoading, getCurrentUserData, user } = useAuthStore((state) => state);
  getCurrentUserData();
  if(isLoading) {
    return <h1>Loading...!!</h1>
  }
  if(!userData){
    return <h1>Error!!</h1>
  }
  return <UserView user={userData} />;
};

export default UserPage;
