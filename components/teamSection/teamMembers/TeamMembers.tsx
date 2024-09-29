import React from "react";
import TeamMemberComponent from "./teamMember/TeamMember";
import {type TeamMemberType } from "@/types/members";

type Props = {
  members: TeamMemberType[][];
  opaque: boolean;
};

const TeamMembers = ({ members, opaque }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {members.map((membersRow, index) => (
        <div
          key={index}
          className="flex justify-center items-center flex-wrap gap-5"
        >
          {membersRow.map((member, index) => (
            <TeamMemberComponent key={index} member={member} opaque={opaque} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
