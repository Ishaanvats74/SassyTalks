"use client";
import { useState } from "react";
import HomeCard from "./HomeCard";
import { useRouter } from "next/navigation";
import MeetingModal from "./MeetingModal";
import { useUser } from "@clerk/nextjs";
import { Call, useStreamVideoClient } from "@stream-io/video-react-sdk";
import { toast } from "sonner";
import { Textarea } from "./ui/textarea";
import DatePicker from "react-datepicker";

const MeetingTypeList = () => {
  const router = useRouter();
  const { user } = useUser();
  const client = useStreamVideoClient();
  const [values, setvalues] = useState({
    dateTime: new Date(),
    description: "",
    link: "",
  });
  const [callDetails, setcallDetails] = useState<Call>();
  const [meetingState, setMeetingState] = useState<
    "isScheduleMeeting" | "isJoiningMeeting" | "isInstantMeeting" | undefined
  >();

  const createMeeting = async () => {
    if (!client || !user) return;

    try {
      if (!values.dateTime) {
        toast.error("Please select a date");
        return;
      }

      const id = crypto.randomUUID();
      const call = client.call("default", id);
      if (!call) throw new Error("Failed to create call");

      const startAt =
        values.dateTime.toISOString() || new Date(Date.now()).toISOString();
      const description = values.description || "Instant Meeting";

      if (meetingState === "isScheduleMeeting") {
        if (!values.description) {
          toast.error("Please add a description");
          return;
        };
        
      }

      await call.getOrCreate({
        data: {
          starts_at: startAt,
          custom: {
            description,
          },
        },
      });

      setcallDetails(call);
      if (!values.description) {
        router.push(`/meeting/${call.id}`);
      }

      toast.success("Meeting Created");
    } catch (error) {
      console.log(error);
      toast.error("Failed to create meeting ");
    }
  };
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${callDetails?.id}`;
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
        handleClick={() => setMeetingState("isScheduleMeeting")}
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
      {!callDetails ? (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Create Meeting"
          handleClick={createMeeting}
        >
          <div className="flex flex-col gap-2.5 ">
            <label className="text-base text-normal leading-[22px]">
              Add a description
            </label>
            <Textarea
              className="border-none focus-visible:ring-0 focus-visible:ring-offset-0 "
              onChange={(e) => {
                setvalues({ ...values, description: e.target.value });
              }}
            />
          </div>
          <div className="flex w-full gap-2.5 flex-col">
            <label className="text-base text-normal leading-[22px]">
              Select Date & Time
            </label>
            <DatePicker
              selected={values.dateTime}
              onChange={(date) => setvalues({ ...values, dateTime: date! })}
              showTimeSelect
              timeFormat="HH:mm"
              timeIntervals={15}
              timeCaption="time"
              dateFormat="MMMM d, yyyy h:mm aa"
              className="w-full rounded bg-[#161925] p-2 focus:outline-none"
            />
          </div>
        </MeetingModal>
      ) : (
        <MeetingModal
          isOpen={meetingState === "isScheduleMeeting"}
          onClose={() => setMeetingState(undefined)}
          title="Meeting Created Successfully"
          className="text-center"
          handleClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Meeting link copied to clipboard");
          }}
          image="/icons/checked.svg"
          buttonIcon="/icons/copy.svg"
          buttonText="Copy Meeting Link"
        />
      )}
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
