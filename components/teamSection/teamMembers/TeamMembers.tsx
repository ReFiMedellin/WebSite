import React from "react";
import TeamMemberComponent from "./teamMember/TeamMember";
import { type TeamMemberType } from "@/types/members";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

type Props = {
  members: TeamMemberType[];
};

const TeamMembers = ({ members }: Props) => {
  return (
    <Carousel
      // plugins={[
      //   Autoplay({
      //     delay: 2000,
      //   }),
      // ]}
      className="w-full max-w-sm md:max-w-lg lg:max-w-4xl"
    >
      <CarouselContent>
        {members.map((member, index) => (
          <CarouselItem key={index} className="md:basis-1/2 lg:basis-1/3">
            <div className="flex items-center justify-center py-2">
              <TeamMemberComponent member={member} />
            </div>
          </CarouselItem>
        ))}
      </CarouselContent>
      <CarouselPrevious className="hidden sm:inline-flex" />
      <CarouselNext className="hidden sm:inline-flex" />
    </Carousel>
  );
};

export default TeamMembers;
