export interface Slot {
  id:string;
  startTime: {
    seconds: number;
    nanoseconds: number;
  };
  endTime: {
    seconds: number;
    nanoseconds: number;
  };
}

export interface Session {
  title: string;
  price: number;
  duration: number;
  slots: Slot[];
}
