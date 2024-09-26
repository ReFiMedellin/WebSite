import React from "react";
import { TeamMemberType } from "@/types/members";
import TeamMemberComponent from "./teamSection/teamMembers/TeamMember";

type Props = {
  members: TeamMemberType[][];
  opaque?: boolean;
};

const TeamMembers = ({ members, opaque }: Props) => {
  return (
    <div className="flex flex-col gap-5">
      {members.map((membersRow, index) => (
        <div
          key={index}
          className="flex-row flex flex-wrap justify-center items-center gap-5"
        >
          {membersRow.map((member, index) => (
            <TeamMemberComponent key={index} member={member} />
          ))}
        </div>
      ))}
    </div>
  );
};

export default TeamMembers;
