"use client";
import React, { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";

const MeetingTypeList = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description:'',
    link:''
  })
  const [callDetails, setcallDetails] = useState<Call>()

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");

      const startAt = values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || 'Instant Meeting';
      await call.getOrCreate({
        data:{
            starts_at:startAt,
            custom:{
                description
            }
        }
      })
      setcallDetails(call);
      if(!values.description){
        router.push(`/meeting/${call.id}`);
      };
    } catch (error) {
      console.log(error);
    }

  };
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
        handleClick={() => router.push("/recordings")}
        className="bg-blue-600"
      />
      <HomeCard
        img="/icons/join-meeting.svg"
        title="join Meeting"
        description="via invitation link"
        handleClick={() => setMeetingState("isJoiningMeeting")}
        className="bg-yellow-500"
      />
      <MeetingModal
        isOpen={meetingState === "isInstantMeeting"}
        onClose={() => setMeetingState(undefined)}
        title="Start an Instant Meeting"
        className="text-center"
        buttonText="Start Meeting"
        handleClick={createMeeting}
      />
    </section>
  );
};

export default MeetingTypeList;
