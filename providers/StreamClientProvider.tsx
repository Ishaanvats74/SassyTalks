"use client";
import { useUser } from "@clerk/nextjs";
import { StreamVideo, StreamVideoClient } from "@stream-io/video-react-sdk";
import { ReactNode, useEffect, useState } from "react";

const apiKey = process.env.NEXT_PUBLIC_STREAM_API_KEY;
// const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJodHRwczovL3Byb250by5nZXRzdHJlYW0uaW8iLCJzdWIiOiJ1c2VyL0dsZWFtaW5nX01haWwiLCJ1c2VyX2lkIjoiR2xlYW1pbmdfTWFpbCIsInZhbGlkaXR5X2luX3NlY29uZHMiOjYwNDgwMCwiaWF0IjoxNzYyMzY1ODMxLCJleHAiOjE3NjI5NzA2MzF9.wJDAlJTk8XI3i4VqM3P4yo85dkwpFVTCfx6FjVto9Ow';
// const userId = 'Gleaming_Mail';
// const callId = 'wDq7nZCKIGC8LZqjnJQm3';

const StreamVideoProvider = ({ children }: { children: ReactNode }) => {
  const [videoClient, setVideoClient] = useState<StreamVideoClient>();
  const {user , isLoaded} = useUser();

  useEffect(()=>{
    if(!user || !isLoaded) return;
    if(!apiKey) throw new Error("Stream API key missing");

    const client = new StreamVideoClient({
      apiKey,
      user:{
        id:user?.id,
        name:user?.username || user?.id,
        image:user?.imageUrl,
      },
      tokenProvider
    })
  },[user,isLoaded]);

  return <StreamVideo client={videoClient}></StreamVideo>;
};

export default StreamVideoProvider;
