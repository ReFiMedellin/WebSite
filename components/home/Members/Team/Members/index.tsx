import React from "react";
import MemberCard from "../../MemberCard";
import { type TeamMemberType } from "@/types/members";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

type Props = {
  members: TeamMemberType[];
};

const TeamMembers = ({ members }: Props) => {
  return (
    <Carousel
      plugins={[
        Autoplay({
          delay: 2000,
        }),
      ]}
      className="w-full max-w-sm md:max-w-lg lg:max-w-4xl xl: xl:max-w-5xl 2xl:max-w-6xl"
    >
      <CarouselContent>
        {members.map((member, index) => (
          <CarouselItem
            key={index}
            className="h-full md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
          >
            <div className="h-full flex items-center justify-center py-2">
              <MemberCard member={member} />
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
