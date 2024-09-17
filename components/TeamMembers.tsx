import React, { useMemo } from "react";
import { FaTelegramPlane } from "react-icons/fa";
import Link from "next/link";
import Image from "next/image";
import { RxInstagramLogo, RxLinkedinLogo, RxTwitterLogo } from "react-icons/rx";
import { currentMembers, pastMembers } from "@/constants/home/teamMembers";

type Props = {
  show: "pastMembers" | "currentMembers";
};

const TeamMembers = ({ show }: Props) => {
  const membersToShow = useMemo(() => {
    switch (show) {
      case "currentMembers":
        return currentMembers;
      case "pastMembers":
        return pastMembers;
      default:
        throw new Error(`members type not valid: ${show}`);
    }
  }, [show]);

  const opaque = useMemo(() => {
    switch (membersToShow) {
      case currentMembers:
        return false;
      case pastMembers:
        return true;
      default:
        throw new Error(`Invalid value of members to show: ${membersToShow}`);
    }
  }, [membersToShow]);

  return (
    <div className="flex flex-col gap-5">
      {membersToShow.map((memberRow, index) => (
        <div key={index} className="flex flex-row justify-center gap-5">
          {memberRow.map((member, index) => (
            <div
              key={index}
              className={`relative h-76 md:h-[17rem] w-64 md:w-52 pt-5 overflow-y-hidden rounded-md shadow-lg flex flex-col gap-2 bg-slate-200 group hover:bg-slate-300 ${
                opaque ? "filter brightness-90 grayscale color opacity-80" : ""
              }`}
            >
              <div className="px-5 text-center">
                <h1 className="text-start w-full font-bold text-sm">
                  {member.name}
                </h1>
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
                    href={
                      member.socialLinks.twitter
                        ? member.socialLinks.twitter
                        : ""
                    }
                  >
                    <RxTwitterLogo />
                  </Link>
                  <Link
                    className="logo_teammember"
                    target="_blank"
                    href={
                      member.socialLinks.instagram
                        ? member.socialLinks.instagram
                        : ""
                    }
                  >
                    <RxInstagramLogo />
                  </Link>
                  <Link
                    className="logo_teammember"
                    target="_blank"
                    href={
                      member.socialLinks.telegram
                        ? member.socialLinks.telegram
                        : ""
                    }
                  >
                    <FaTelegramPlane />
                  </Link>
                  <Link
                    className="logo_teammember"
                    target="_blank"
                    href={
                      member.socialLinks.linkedin
                        ? member.socialLinks.linkedin
                        : ""
                    }
                  >
                    <RxLinkedinLogo />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
