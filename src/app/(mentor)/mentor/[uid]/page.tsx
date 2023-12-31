"use client"
import React, { useEffect, useState } from "react";
import MentorView from "./components/MentorView";
import { useAuthStore } from "@/store/AuthStore";
import { useParams } from "next/navigation";
import { fetchMentor } from "../../utils/fetchMentors";
import { UserData } from "@/types/user";



const MentorPage = () => {
  const params = useParams();
  const [mentor, setMentor]=useState<UserData|null>(null);

  useEffect(()=>{
    const fetchMentorData = async () => {
      const mentorData = await fetchMentor(params.uid as string);
      setMentor(mentorData);
    };

    fetchMentorData();
},[params.uid]);
  
  if(mentor){
    return <MentorView mentor={mentor} />
  }
  else return <h1>Error loading the mentor data!</h1>
};

export default MentorPage;
