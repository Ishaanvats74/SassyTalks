import { cn } from "@/lib/utils";
import {
  CallControls,
  CallingState,
  CallParticipantsList,
  CallStatsButton,
  PaginatedGridLayout,
  SpeakerLayout,
  useCallStateHooks,
} from "@stream-io/video-react-sdk";
import { useState } from "react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LayoutList, User } from "lucide-react";
import { useSearchParams } from "next/navigation";
import EndCallButton from "./EndCallButton";
import Loader from "./Loader";

type CallLayoutType = "grid" | "speaker-left" | "speaker-right";

const CallLayout = ({ layout }: { layout: CallLayoutType }) => {
  switch (layout) {
    case "grid":
      return <PaginatedGridLayout />;
    case "speaker-left":
      return <SpeakerLayout participantsBarPosition="left" />;
    default:
      return <SpeakerLayout participantsBarPosition="right" />;
  }
};
const MeetingRoom = () => {
  const SearchParams = useSearchParams();
  const isPersonalRoom = !!SearchParams.get("personal");
  const [layout, setlayout] = useState<CallLayoutType>("speaker-left");
  const [ShowParticipants, setShowParticipants] = useState<boolean>(false);

  const {useCallCallingState} = useCallStateHooks();
  const callingState = useCallCallingState();

  if(callingState !== CallingState.JOINED) return  <Loader />

  return (
    <section className="text-white relative h-screen w-full overflow-hidden pt-4">
      <div className="relative flex size-full items-center justify-center">
        <div className="flex size-full max-w-[1000px] items-center">
          <CallLayout layout={layout} />
        </div>
        <div
          className={cn("h-[calc(100vh-86px)] right-0 hidden ml-2", {
            block: ShowParticipants,
          })}
        >
          <CallParticipantsList onClose={() => setShowParticipants(false)} />
        </div>
      </div>
      <div className="fixed bottom-0 flex w-full items-center justify-center gap-5 flex-wrap">
        <CallControls />
        <DropdownMenu>
          <div className="flex items-center">
            <DropdownMenuTrigger className="cursor-pointer rounded-2xl bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
              <LayoutList size={20} className="text-white" />
            </DropdownMenuTrigger>
          </div>
          <DropdownMenuContent className="border-[#161925] bg-[#161925] text-white">
            {["Grid", "Speaker-Left", "Speaker-Right"].map((item, index) => (
              <div key={index}>
                <DropdownMenuItem
                  className="cursor-pointer"
                  onClick={() =>
                    setlayout(item.toLowerCase() as CallLayoutType)
                  }
                >
                  {item}
                </DropdownMenuItem>
                <DropdownMenuSeparator className="bg-[#161925]" />
              </div>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <CallStatsButton />
        <button
          onClick={() => (
            console.log(ShowParticipants), setShowParticipants((prev) => !prev)
          )}
        >
          <div className="cursor-pointer rounded-2xl  bg-[#19232d] px-4 py-2 hover:bg-[#4c535b]">
            <User size={20} className="text-white" />
          </div>
        </button>
        {!isPersonalRoom && (
          <EndCallButton />
        )}
      </div>
    </section>
  );
};

export default MeetingRoom;
