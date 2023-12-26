export interface UserData {
  firstName: string;
  lastName: string;
  username: string;
  age?: string;
  gender?: string;
  role?: string;
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