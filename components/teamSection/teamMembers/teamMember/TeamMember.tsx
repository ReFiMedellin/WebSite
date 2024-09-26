import Image from "next/image";
import styles from "./styles.module.css"; // Import your CSS module
import { TeamMemberType } from "@/types/members";
import {
  PiTelegramLogoBold,
  PiInstagramLogoBold,
  PiLinkedinLogoBold,
  PiXBold,
} from "react-icons/pi";
import React from "react";
import Link from "next/link";

type Props = {
  member: TeamMemberType;
  opaque: boolean
};
export default function TeamMemberComponent({ member, opaque }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles["card--article"]}>
        <Image
          src={member.imageSrc}
          alt="Refi member"
          className={`${styles["card--profile"]} w-28 h-28 rounded-full border-white border-2 ${opaque ? 'opacity-50' : '' } ${opaque ? 'filter brightness-75' : ''}`}
          // Combine CSS module class with tailwind classes
        />
        <div className={styles["card--tooltip"]}>
          <div className={styles["card--content"]}>
            <header className="flex justify-between items-center">
              <p className="font-bold">Social</p>
              <div className="flex gap-2 items-center justify-center">
                <Link href={member.socialLinks.instagram} target="_blanck">
                  <PiInstagramLogoBold size={24} className="text-black" />
                </Link>

                <Link href={member.socialLinks.linkedin} target="_blanck">
                  <PiLinkedinLogoBold
                    size={24}
                    className="text-xl text-black"
                  />
                </Link>

                <Link href={member.socialLinks.twitter} target="_blanck">
                  <PiXBold size={24} className="text-black" />
                </Link>

                <Link href={member.socialLinks.telegram} target="_blanck">
                  <PiTelegramLogoBold size={24} className="text-black" />
                </Link>
              </div>
            </header>
            <span className={styles.bar}>&nbsp;</span>
            <div className="flex flex-col items-center justify-between">
              <Image
                src={member.imageSrc}
                alt="Refi member"
                className={`w-16 rounded-full border-white border-2`}
              />
            </div>
            <div className="flex flex-col items-center justify-between">
              <p className="font-bold">{member.name}</p>
              <p className="text-sm font-light text-slate-500">{member.role}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
