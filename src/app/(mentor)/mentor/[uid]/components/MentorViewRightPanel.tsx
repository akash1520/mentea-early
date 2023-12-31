import React, { useEffect, useState } from "react";
import { collection, doc, getDoc, query, where } from "firebase/firestore";
import { db } from "@/firebase";
import SessionCard from "./sessions/SessionCard";
import { Session } from "@/types/slots";
import { Slot } from "@/types/slots";

const fetchSessionData = async (sessionId: string) => {
  const sessionRef = doc(db, "Sessions", sessionId);
  const sessionSnapshot = await getDoc(sessionRef);

  if (sessionSnapshot.exists()) {
    const data = sessionSnapshot.data()
    // Ensure required properties are present before casting
    if (!data.slots) {
      throw new Error("Missing required 'slots' property in session data");
    }
    return data as Session; // Safe to cast now
  }

  return null;
};

interface MentorViewRightPanelProps {
  sessionId: string;
}

const MentorViewRightPanel: React.FC<MentorViewRightPanelProps> = ({ sessionId }) => {
  const [session, setSession] = useState<Session | null>(null);

  useEffect(() => {
    async function fetchSession() {
      try {
        const res = await fetchSessionData(sessionId);
        setSession(res);
      } catch (error) {
        // Handle errors appropriately, e.g., log the error or display a user-friendly message
        console.error("Error fetching session data:", error);
      }
    }

    fetchSession(); // Call the asynchronous function within useEffect
  }, [sessionId]); // Only re-run the effect if sessionId changes


  return (
    <div className="w-full md:w-[30%] mt-8">
      <h3 className="text-3xl font-bold font-gothic tracking-wider mb-2">
        Sessions
      </h3>
      {session ? (
        <div className="flex flex-col gap-4 w-full">
          <SessionCard {...session} />
        </div>
      ) : (
        <span className="text-xl font-semibold">No sessions are available currently</span>
      )}
    </div>
  );
};

export default MentorViewRightPanel;
