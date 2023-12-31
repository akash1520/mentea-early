import React from "react";
import SessionCard from "./sessions/SessionCard";


const UserViewRightPanel = ({ mentorId }: { mentorId: string }) => {
  const sessions = [{
    title: "placeholder_title", // Replace with actual title
    price: 120,
    duration: 30,
    mentorId: "3e1AATp8OWSZh2H8CXZJUlLxBos2",
    slots: [
      {
        startTime: new Date("2023-12-25T18:30:32+05:30"),
        endTime: new Date("2023-12-26T18:31:09+05:30"),
        place: "" // Assuming "place" is a string
      }
    ]
  }]

  return (
    <div className="w-full md:w-[30%] mt-8">
      <h3 className="text-3xl font-bold font-gothic tracking-wider mb-2">
        Sessions
      </h3>
      {sessions.length > 0 ? (
        <div className="flex flex-col gap-4 w-full">
          {sessions.map((session, index) => (
            <SessionCard key={index} {...session} />
          ))}
        </div>
      ) : (
        <span className="text-xl font-semibold">No sessions are available currently</span>
      )}
    </div>
  );
};

export default UserViewRightPanel;
