"use client";
import Image from "next/image";
import React, { useState } from "react";
import HomeCard from "./HomeCard";

const MeetingTypeList = () => {
  const [meetingState, setMeetingState] = useState<
    "iseScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();
  return (
    <section className="grid grid-cols-1 gap-5 md:grid-cols-2 xl:grid-cols-4">
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an intant meeting"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/schedule.svg"
        title="schedule Meeting"
        description="Plan your meeting"
        handleClick={() => setMeetingState("iseScheduleMeeting")}
      />
      <HomeCard
        img="/icons/recordings.svg"
        title="New Meeting"
        description="Start an intant meeting"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
      <HomeCard
        img="/icons/add-meeting.svg"
        title="New Meeting"
        description="Start an intant meeting"
        handleClick={() => setMeetingState("isJoiningMeeting")}
      />
    </section>
  );
};

export default MeetingTypeList;
