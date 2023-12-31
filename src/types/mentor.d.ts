import { UserData } from "./user";
export interface Slot {
  id: string; // Unique identifier for each slot
  startTime: Date;
  endTime: Date;
  // Additional properties as needed, such as:
  title?: string;
  booked?: boolean;
  user?: User; // If applicable
}


export interface MentorsData extends UserData{
  uid:string; //
}