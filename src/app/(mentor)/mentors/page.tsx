"use client"
import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import { FirestoreError} from 'firebase/firestore';
import { Balancer } from 'react-wrap-balancer';
import MentorCard from './components/MentorCard';
import { MentorsData } from '@/types/mentor';
import { fetchMentors } from '../utils/fetchMentors';


const MentorsPage = () => {
  const [mentors, setMentors] = useState<MentorsData[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<FirestoreError>();

  useEffect(() => {
    fetchMentors(setMentors, setError as  Dispatch<SetStateAction<FirestoreError>>, setIsLoading);
  }, []);

  if (isLoading) {
    return <div>Loading mentors...</div>;
  }

  if (error) {
    return <div>Error fetching mentors: {error.message}</div>;
  }

  return (
    <div className="max-w-7xl mx-auto">
      <div className="py-20 px-5">
        <div className="text-center mb-16">
          <h3 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#191817] text-center mb-10 font-gothic">
            FEATURED <span className="underline">MENTORS</span>
          </h3>
          <p className="text-2xl text-[#191817]">
            <Balancer>
              Empower the next generation of professionals by sharing your
              insights, expertise, and stories from your own career journey.
            </Balancer>
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 justify-center max-w-5xl mx-auto">
          {mentors.map((mentor, index) => (
            <MentorCard uid={mentor.uid} mentor={mentor} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MentorsPage;
