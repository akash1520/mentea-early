export interface UserData {
  firstName: string;
  lastName: string;
  shortHeading?: string;
  experience?: string;
  about?: string;
  username: string;
  age?: string;
  mentorId?: string;
  sessionId?: string;
  gender?: string;
  role?: string;
  profileImgUrl?: string;
  socials?: string[];
  mobile?: string;
  organization?: string;
  languages?: string[];
}

export interface signupUser {
  firstName: string;
  lastName: string;
  username: string;
  age: string;
  gender: string;
  email: string;
  password: string;
  confirmPassword: string;
}