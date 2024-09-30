import TeamMembers from "./teamMembers/TeamMembers";
import { pastMembers, currentMembers } from "@/constants/teamMembers";
import { useTranslations } from "next-intl";
import React from "react";

export default function TeamSection() {
  const t = useTranslations("Landing");
  return (
    <div className="flex flex-col items-center justify-center gap-12">
      <h2 className="font-bold text-4xl text-black">{t("team.title")}</h2>
      <div className="w-screen md:w-[80vw] flex flex-col md:flex-row justify-center items-center gap-8">
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <h2 className="font-bold text-2xl text-black">
            {t("team.currentMembersTitle")}
          </h2>
          <TeamMembers members={currentMembers} opaque={false} />
        </div>
        <div className="flex-1 flex flex-col items-center justify-center gap-8">
          <h2 className="font-bold text-2xl text-black">
            {t("team.pastMembersTitle")}
          </h2>
          <TeamMembers members={pastMembers} opaque={true} />
        </div>
      </div>
    </div>
  );
}
