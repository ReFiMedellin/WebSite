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
      className={`relative h-76 md:h-[17rem] w-64 md:w-52 pt-5 overflow-y-hidden rounded-md shadow-lg flex flex-col gap-2 bg-slate-200 group hover:bg-slate-300 ${
        member.isPastMember ? "opacity-60 filter brightness-90" : ""
      }`}
    >
      <div className="px-5 text-center">
        <h1 className="text-start w-full font-bold text-sm">{member.name}</h1>
        <p className="w-full text-start font-light text-sm text-slate-700">
          {member.role}
        </p>
      </div>
      <Image
        src={member.imageSrc}
        alt="Refi member"
        className="w-full max-h-full rounded-b-md"
      />
      <div className="bg-slate-200 absolute bottom-0 left-0 w-full h-12 rounded-b-md opacity-0 group-hover:opacity-100 transition-opacity duration-300">
        <div className="flex text-sm h-full flex-row justify-center items-center gap-5">
          <Link
            className="logo_teammember"
            target="_blank"
            href={member.socialLinks.twitter ? member.socialLinks.twitter : ""}
          >
            <RxTwitterLogo />
          </Link>
          <Link
            className="logo_teammember"
            target="_blank"
            href={
              member.socialLinks.instagram ? member.socialLinks.instagram : ""
            }
          >
            <RxInstagramLogo />
          </Link>
          <Link
            className="logo_teammember"
            target="_blank"
            href={
              member.socialLinks.telegram ? member.socialLinks.telegram : ""
            }
          >
            <FaTelegramPlane />
          </Link>
          <Link
            className="logo_teammember"
            target="_blank"
            href={
              member.socialLinks.linkedin ? member.socialLinks.linkedin : ""
            }
          >
            <RxLinkedinLogo />
          </Link>
        </div>
      </div>
    </div>
  );
}
