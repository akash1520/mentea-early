"use client"
import React from "react";
import MentorView from "./components/MentorView";

interface MentorPageProps {
  params: {
    username: string;
  };
}
const MentorPage = ({ params }: MentorPageProps) => {
  const { username } = params;
  const mentor = {
    id:"12312",
    about: "Creator",
    age: "20",
    experience: 29,
    firstName: "Akash",
    gender: "male",
    languages: ["asd"],
    lastName: "Parmar",
    mobile: "06353411628",
    organization: "LD",
    profileImgUrl: "https://firebasestorage.googleapis.com/v0/b/mentea-5816e.appspot.com/o/mentorProfileImages%2Fselftrust.webp?alt=media&token=ed020106-aed4-4465-b661-0e9d1791e0d0",
    role: "WEb",
    shortHeading: "asdasasdas",
    socials: ["https://github.com/akash1520"],
    username: "akashhuyaar"
  };
  
  return <MentorView mentor={mentor} />;
};

export default MentorPage;
