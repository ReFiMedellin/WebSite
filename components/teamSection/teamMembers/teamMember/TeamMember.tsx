import Image from "next/image";
import { TeamMemberType } from "@/types/members";
import React from "react";
import Link from "next/link";
import { RxInstagramLogo, RxLinkedinLogo, RxTwitterLogo } from "react-icons/rx";
import { FaTelegramPlane } from "react-icons/fa";

type Props = {
  member: TeamMemberType;
};
export default function TeamMemberComponent({ member }: Props) {
  return (
    <div
      className={`w-60 h-full relative p-4 flex flex-col gap-12 md:gap-8 rounded-xl overflow-hidden ${
        member.isPastMember ? "opacity-70 filter grayscale" : ""
      }`}
    >
      <Image
        src={member.imageSrc}
        alt="Refi member"
        className="-z-10 w-4/5 absolute top-1/2 -translate-y-1/2 -right-12 md:w-4/5 md:-top-1/2 md:-right-1/4 rounded-full opacity-40"
      />
      <div>
        <h1 className="font-bold">{member.name}</h1>
        <p className="font-medium text-sm text-slate-500">{member.role}</p>
      </div>
      <div className="flex gap-1">
        <Link
          target="_blank"
          href={member.socialLinks.twitter ? member.socialLinks.twitter : ""}
        >
          <RxTwitterLogo />
        </Link>
        <Link
          target="_blank"
          href={
            member.socialLinks.instagram ? member.socialLinks.instagram : ""
          }
        >
          <RxInstagramLogo />
        </Link>
        <Link
          target="_blank"
          href={member.socialLinks.telegram ? member.socialLinks.telegram : ""}
        >
          <FaTelegramPlane />
        </Link>
        <Link
          target="_blank"
          href={member.socialLinks.linkedin ? member.socialLinks.linkedin : ""}
        >
          <RxLinkedinLogo />
        </Link>
      </div>
    </div>
  );
}
