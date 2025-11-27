"use client";
import { useGetCalls } from "@/hooks/useGetCalls";
import { Call, CallRecording } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import  { useEffect, useState } from "react";
import MeetingCard from "./MeetingCard";
import Loader from "./Loader";
import { toast } from "sonner";

const CallList = ({ type }: { type: "ended" | "upcoming" | "recordings" }) => {
  const [recordings, setrecordings] = useState<CallRecording[]>([]);
  const { endedCalls, upcomingCalls, callrecordings, isLoading } =
    useGetCalls();
  const router = useRouter();

  const getCalls = () => {
    switch (type) {
      case "ended":
        return endedCalls;
      case "recordings":
        return recordings;
      case "upcoming":
        return upcomingCalls;

      default:
        return [];
    }
  };

  const getNoCallsMessage = () => {
    switch (type) {
      case "ended":
        return "No Previous Calls";
      case "recordings":
        return "No Recordings Available";
      case "upcoming":
        return "No Upcoming Calls";

      default:
        return "";
    }
  };

  useEffect(()=>{
    const fetchRecordings = async()=>{
      try {
        const callData = await Promise.all(callrecordings.map((meeting)=> meeting.queryRecordings()))
        const recordings = callData.filter(call => call.recordings.length > 0).flatMap(call => call.recordings);
        setrecordings(recordings);
        
      } catch (error) {
        console.log("Error fetching recordings", error);
        toast.error("Error fetching recordings");
      }
    }

    if(type === "recordings") fetchRecordings();
  },[type,callrecordings])

  const calls = getCalls();
  const noCallsMessage = getNoCallsMessage();

  if(isLoading) return <Loader/>;

  return (
    <div className="grid grid-cols-1 gap-5 xl:grid-cols-2">
      {calls && calls.length > 0 ? (
        calls.map((meeting: Call | CallRecording) => (
          <MeetingCard
            key={(meeting as Call).id}
            icon={
              type === "ended"
                ? "/icons/previous.svg"
                : type === "upcoming"
                ? "/icons/upcoming.svg"
                : "/icons/recording.svg"
            }
            title={
              (meeting as Call).state?.custom?.description?.substring(0, 26) || (meeting as Call)?.filename?.substring(0,20) ||
              "Personal Meeting"
            }
            date={
              meeting.state?.startsAt.toLocaleString() ||
              meeting.start_time.toLocaleString()
            }
            isPreviousMeeting={type === "ended"}
            buttonIcon1={type === "recordings" ? "/icons/play.svg" : undefined}
            handleClick={
              type === "recordings"
                ? () => router.push(meeting.url)
                : () => router.push(`/meeting/${(meeting as Call).id}`)
            }
            link={
              type === "recordings"
                ? meeting.url
                : `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${
                    (meeting as Call).id
                  }`
            }
            buttonText={type === "recordings" ? "Play Recording" : "start"}
          />
        ))
      ) : (
        <h1>{noCallsMessage}</h1>
      )}
    </div>
  );
};

export default CallList;
