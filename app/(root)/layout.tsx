import StreamVideoProvider from "@/providers/StreamClientProvider";
import { Metadata } from "next";
import { ReactNode } from "react";
export const metadata: Metadata = {
  title: "Sassy Talks",
  description: " Video Conferencing App",
  icons: {
    icon: "/icons/logo.svg",
  },
};
const layout = ({ children }: { children: ReactNode }) => {
  return (
    <main>
      <StreamVideoProvider>{children}</StreamVideoProvider>
    </main>
  );
};

export default layout;
