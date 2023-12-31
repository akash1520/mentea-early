import React from "react";
import UserViewLeftPanel from "./UserViewLeftPanel";
import { UserData } from "@/types/user";
import UserViewRightPanel from "./UserViewRightPanel";

interface UserViewProps{
  user:UserData;
}

const UserView : React.FC<UserViewProps> = ({user}) => {
  return (
    <div className="bg-[#fefffe]">
      <UserViewLeftPanel
        username={user.username}
        firstName={user.firstName}
        lastName={user.lastName}
        shortHeading={user.shortHeading}
        experience={user.experience}
        socials={user.socials}
        about={user.about}
        languages={user.languages}
        profileImgUrl={user.profileImgUrl}
      />
      {user.mentorId && <UserViewRightPanel mentorId={user.mentorId}/>}
    </div>
  );
};

export default UserView;
