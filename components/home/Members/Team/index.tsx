import TeamMembers from "./Members";
import { pastMembers, currentMembers } from "@/constants/teamMembers";
import { useTranslations } from "next-intl";
import React from "react";

export default function Team() {
  const t = useTranslations("Landing");
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <h2 className="font-bold text-2xl sm:text-4xl text-black">
        {t("team.title")}
      </h2>
      <div className="w-screen flex flex-col md:flex-row justify-center items-center gap-8">
        <TeamMembers
          members={[
            ...currentMembers.map((member) => {
              return { ...member, isPastMember: false };
            }),
            ...pastMembers.map((member) => {
              return { ...member, isPastMember: true };
            }),
          ]}
        />
      </div>
    </div>
  );
}
