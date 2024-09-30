import React from "react";
import Autoplay from "embla-carousel-autoplay"
import TeamMemberComponent from "./teamMember/TeamMember";
import { type TeamMemberType } from "@/types/members";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"


type Props = {
  members: TeamMemberType[];
  opaque: boolean;
};

const TeamMembers = ({ members, opaque }: Props) => {
  return (
    <Carousel className="w-64 md:w-52"
      opts={{
        dragFree: true
      }}
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
    >
      <CarouselContent>
        {members.map((member, index) => (
          <CarouselItem key={index}>
            <TeamMemberComponent member={member} opaque={opaque} />
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden md:inline-flex" />
      <CarouselNext className="hidden md:inline-flex" />
    </Carousel>
  );
};

export default TeamMembers;
