"use client";
import { Button } from "@/components/ui/button";
import { useGetCallById } from "@/hooks/userGetCallById";
import { useUser } from "@clerk/nextjs";
import { useStreamVideoClient } from "@stream-io/video-react-sdk";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

const Table = ({
  title,
  description,
}: {
  title: string;
  description: string;
}) => (
  <div className="flex flex-col items-start gap-2 xl:flex-row">
    <h1 className="text-base font-medium text-sky-50 lg:text-xl xl:min-w-32">
      {title}
    </h1>
    <h1 className="truncate text-sm font-bold max-sm:max-w-[320px] lg:text-xl ">
      {description}
    </h1>
  </div>
);

const PersonalRoom = () => {
  const { user } = useUser();
  const MeetingId = user?.id;
  const meetingLink = `${process.env.NEXT_PUBLIC_BASE_URL}/meeting/${MeetingId}?personal=true`;
  const { call } = useGetCallById(MeetingId!);
  const router = useRouter();
  const client = useStreamVideoClient();

  const startRoom = async () => {
    try {
      if (!client || !user) return;
      const newCall = client.call("default", MeetingId!);

      if (!call) {
        await newCall.getOrCreate({
          data: {
            starts_at: new Date().toISOString(),
          },
        });
      }
      router.push(`/meeting/${MeetingId}?personal=true`);
    } catch (error) {
      console.log("Error starting personal room:", error);
      toast.error("Failed to start personal room");
    }
  };

  return (
    <section className="flex size-full flex-col gap-10 text-white">
      <h1 className="text-3xl font-bold">PersonalRoom</h1>
      <div className="flex w-full flex-col gap-8 xl:max-w-[900px]">
        <Table title="Topic" description={`${user?.username}'s Meeting Room`} />
        <Table title="Meeting Id" description={MeetingId!} />
        <Table title="Invite Link" description={meetingLink} />
      </div>
      <div className="flex gap-5">
        <Button className="bg-blue-600" onClick={startRoom}>
          Start Meeting
        </Button>
        <Button
          className="bg-gray-800"
          onClick={() => {
            navigator.clipboard.writeText(meetingLink);
            toast.success("Link Copied to Clipboard");
          }}
        >
          Copy Link
        </Button>
      </div>
    </section>
  );
};

export default PersonalRoom;
