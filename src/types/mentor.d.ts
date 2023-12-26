export interface Mentor {
  firstName: string;
  lastName: string;
  username: string;
  profileImgUrl: string;
  shortHeading: string;
  gender: string;
  age: string;
  about?: string;
  organization: string;
  role: string;
  experience: number;
  languages: string[];
  socials: string[];
}

export interface MentorWithId extends Mentor {
  readonly id: string;
}

export interface Slot {
  id: string; // Unique identifier for each slot
  startTime: Date;
  endTime: Date;
  // Additional properties as needed, such as:
  title?: string;
  booked?: boolean;
  user?: User; // If applicable
}


