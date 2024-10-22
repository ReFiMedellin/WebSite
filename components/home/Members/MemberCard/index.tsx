import Image from "next/image";
import { TeamMemberType } from "@/types/members";
import React from "react";
import Link from "next/link";
import {
  PiTelegramLogoBold,
  PiLinkedinLogoBold,
  PiInstagramLogoBold,
  PiXBold,
} from "react-icons/pi";

type Props = {
  member: TeamMemberType;
};
export default function MemberCard({ member }: Props) {
  return (
    <div
      className={`w-[80vw] md:w-[40vw] h-full relative p-4 flex flex-col gap-12 md:gap-8 rounded-xl shadow-md overflow-hidden ${
        member.isPastMember ? "opacity-70 filter grayscale" : ""
      }`}
    >
      <Image
        src={member.imageSrc}
        alt="Refi member"
        className="-z-10 w-4/5 md:w-3/5 absolute top-1/2 -translate-y-1/2 -right-12 md:-right-10 rounded-full opacity-80"
      />
      <div className="max-w-[60%]">
        <h1 className="font-bold sm:text-lg">{member.name}</h1>
        <p className="font-medium text-sm text-slate-500">{member.role}</p>
      </div>
      <div className="flex gap-1">
        <Link
          target="_blank"
          href={member.socialLinks.twitter ? member.socialLinks.twitter : ""}
        >
          <PiXBold className="text-xl text-teal-950"/>
        </Link>
        <Link
          target="_blank"
          href={
            member.socialLinks.instagram ? member.socialLinks.instagram : ""
          }
        >
          <PiInstagramLogoBold className="text-xl text-teal-950"/>
        </Link>
        <Link
          target="_blank"
          href={member.socialLinks.telegram ? member.socialLinks.telegram : ""}
        >
          <PiTelegramLogoBold className="text-xl text-teal-950"/>
        </Link>
        <Link
          target="_blank"
          href={member.socialLinks.linkedin ? member.socialLinks.linkedin : ""}
        >
          <PiLinkedinLogoBold className="text-xl text-teal-950"/>
        </Link>
      </div>
    </div>
  );
}
