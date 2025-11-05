'use client';
import React, { ReactNode } from "react";
import {
  Dialog,
  DialogContent,
} from "@/components/ui/dialog";
import Image from "next/image";
import { cn } from "@/lib/utils";
import { Button } from "./ui/button";
import { DialogTitle } from "@radix-ui/react-dialog";

interface MeetingModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  className?: string;
  children?: ReactNode;
  buttonText: string;
  handleClick?: () => void;
  image?: string;
  buttonIcon?: string;
}

const MeetingModal = ({
  isOpen,
  children,
  onClose,
  title,
  buttonText,
  buttonIcon,
  image,
  handleClick,
}: MeetingModalProps) => {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogTitle></DialogTitle>
      <DialogContent className="flex w-full max-w-[520px] flex-col gap-6 border-none bg-black px-6 py-9 text-white">
        <div className="flex flex-col gap-6">
            {image && (
                <div className="flex justify-center">
                    <Image src={image} alt="image" width={72} height={72}/>
                </div>
            )}
            <h1 className={cn('text-3xl font-bold leading-[42px]')}>{title}</h1>
            {children}
            <Button className="bg-blue-600 focus-visible:ring-0 focus-visible:ring-offset-0" onClick={handleClick}> 
                {buttonIcon && (
                    <Image src={buttonIcon} alt="button icon" width={13} height={13}/>
                )} &nbsp;
                {buttonText || 'schedule Meeting'}
            </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default MeetingModal;
