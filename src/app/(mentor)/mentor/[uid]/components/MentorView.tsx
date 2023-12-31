import React from "react";
import MentorViewRightPanel from "./MentorViewRightPanel";
import MentorViewLeftPanel from "./MentorViewLeftPanel";
import { UserData } from "@/types/user";

type MentorViewProps = {
  mentor: UserData;
};

const MentorView = ({ mentor }: MentorViewProps) => {
  return (
    <div className="bg-[#fefffe]">
      <div className="w-full h-48 bg-gray-100"></div>
      <div className="max-w-7xl mx-auto">
        <div className="px-5 flex gap-8 flex-wrap">
          <MentorViewLeftPanel
            username={mentor.username}
            firstName={mentor.firstName}
            lastName={mentor.lastName}
            shortHeading={mentor.shortHeading}
            experience={mentor.experience}
            socials={mentor.socials}
            about={mentor.about}
            languages={mentor.languages}
            profileImgUrl={mentor.profileImgUrl}/>
          
          {mentor.sessionId && (
            <MentorViewRightPanel sessionId={mentor.sessionId} />
          )}
        </div>
      </div>
    </div>
  );
};

export default MentorView;
