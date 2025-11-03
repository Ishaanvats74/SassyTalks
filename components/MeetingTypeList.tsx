"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";

const MeetingTypeList = () => {
    const router = useRouter();
  const [meetingState, setMeetingState] = useState<
    "iseScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an intant meeting"
        handleClick={() => setMeetingState("isInstantMeeting")}
        className="bg-orange-500"
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("iseScheduleMeeting")}
        className="bg-purple-600"
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="View Recordings"
        description="Check out your recordings"
        handleClick={() => router.push('/recordings')}
        className="bg-blue-600"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-500"
      />
    </section>
  );
};

export default MeetingTypeList;
