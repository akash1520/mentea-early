"use client";
import React, { useMemo } from "react";
import { Balancer } from "react-wrap-balancer";
import MentorCard from "./components/MentorCard";


const MentorsPage = () => {
  const mentors = [
    {
      role: 'WEb',
      languages: [ 'asd' ],
      experience: '29',
      lastName: 'Parmar',
      firstName: 'Akash',
      organization: 'LD',
      mobile: '06353411628',
      profileImgUrl: 'https://firebasestorage.googleapis.com/v0/b/mentea-5816e.appspot.com/o/mentorProfileImages%2Fselftrust.webp?alt=media&token=ed020106-aed4-4465-b661-0e9d1791e0d0',
      socials: [ 'https://github.com/akash1520' ],
      gender: 'male',
      username: 'akashhuyaar',
      shortHeading: 'asdasasdas',
      age: '20',
      about: 'Creator'
    },
    {
      languages: [ 'English', 'Hindi', 'Gujarati' ],
      lastName: 'Memon',
      profileImgUrl: 'https://firebasestorage.googleapis.com/v0/b/mentea-5816e.appspot.com/o/mentorProfileImages%2Fmenteaa.jpg?alt=media&token=a7101694-d40f-4ed6-bc97-7f1fd0d3061e',
      experience: '2',
      username: 'alimemon',
      shortHeading: 'Full Stack Dev || Freelancer || CS Grad',
      age: '20',
      gender: 'male',
      firstName: 'Ali',
      about: 'Enthusiastic software developer with a strong web development background. Committed to innovative solutions for enhanced user experiences. Thrives in teamwork, excels in quality project delivery, and seeks ongoing growth.',
      role: 'Software Engineer',
      socials: [ 'https://twitter.com/aliR_memon' ],
      organization: 'Crest Data Systems',
      mobile: '9999999999'
    },
    {
      experience: '20',
      firstName: 'Akash',
      gender: 'male',
      languages: [ 'Eng', 'Marathi' ],
      mobile: '06353411628',
      lastName: 'Parmar',
      age: '22',
      profileImgUrl: 'https://firebasestorage.googleapis.com/v0/b/mentea-5816e.appspot.com/o/mentorProfileImages%2Fmenteaa.jpg?alt=media&token=667b2d8c-9f07-40cc-a79d-6b006d8e7525',
      shortHeading: 'Web Developer',
      username: 'akashhuyaar',
      organization: 'GSSoC',
      role: 'Mentor',
      about: 'Upcoming SDE @ Mentea',
      socials: [ 'https://akashparmar.me' ]
    }
  ]


  // Now mentors is of type DocumentData[]
  if (mentors.length === 0) {
    return <div>No mentors are available currently</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-20 px-5">
        <div className="text-center mb-16">
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#191817] text-center mb-10 font-gothic">
            FEATURED <span className="underline">MENTORS</span>
          </h3>
          <p className="text-2xl text-[#191817]">
            <Balancer>
              Empower the next generation of professionals by sharing your
              insights, expertise, and stories from your own career journey.
            </Balancer>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
          {mentors.map((mentor:any, index:number) => (
            <MentorCard mentor={mentor} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
