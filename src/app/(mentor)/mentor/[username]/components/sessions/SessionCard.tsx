import React from "react";
import { Balancer } from "react-wrap-balancer";
import CustomIcon from "@/app/components/CustomIcon";
import Modal from "../Modal";
import SlotSelector from "./SlotSelector";
import { Slot } from "@/types/mentor";

const slots: Slot[] = [
  {
    id: "slot1",
    startTime: new Date("2023-12-27T10:00:00"),
    endTime: new Date("2023-12-27T11:00:00"),
    // Example additional properties:
    title: "Intro Session",
    booked: false,
  },
  {
    id: "slot2",
    startTime: new Date("2023-12-27T11:30:00"),
    endTime: new Date("2023-12-27T12:30:00"),
    title: "Mentorship Meeting",
    booked: true, // Example of a booked slot
    user: { id: "user123", name: "John Doe" }, // Example user association
  },
  {
    id: "slot3",
    startTime: new Date("2023-12-27T14:00:00"),
    endTime: new Date("2023-12-27T15:00:00"),
    title: "Group Discussion",
    booked: false,
  },
  // Add more slots as needed
];


const SessionCard = ({
  title,
  price,
  duration,
}: {
  title: string;
  price: number;
  duration: number;
}) => {
  const [isOpen, setIsOpen] = React.useState(false);
  return (
    <div className="flex flex-col gap-4 rounded-2xl shadow-md p-4 overflow-hidden border-2 border-b-4 border-black mx-auto md:mx-0 text-[#191817] w-full">
     
     <Modal isOpen={isOpen} onClose={()=>setIsOpen(false)}>
        <SlotSelector slots={slots} />
      </Modal>
      <h4 className="text-xl font-semibold">
        <Balancer>{title}</Balancer>
      </h4>
      <div className="flex justify-between">
        <div className="flex gap-4 items-center">
          <div className="flex items-center gap-1">
            <CustomIcon name="VideoCall" fontSize="small" /> 1:1 call
          </div>
          <div className="flex items-center gap-1">
            <CustomIcon name="AccessTime" fontSize="small" /> {duration} min
          </div>
        </div>
        <span className="text-xl font-bold">₹ {price}</span>
      </div>
      <button className="btn justify-center bg-[#feec01]" onClick={()=>setIsOpen(true)}>Book Now</button>
    </div>
  );
};

export default SessionCard;
