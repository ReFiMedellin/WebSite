import React from "react";
import GDG from "@/assets/images/PFP-Green Digital Guardians.webp";
import DotLabs from "@/assets/images/PFP-Dotlabs.webp";
import { useTranslations } from "next-intl";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "./ui/carousel";
import TeamMemberComponent from "./teamSection/teamMembers/teamMember/TeamMember";
import Autoplay from "embla-carousel-autoplay";

const Partners = () => {
  const t = useTranslations("Landing");
  const partners = [
    {
      name: "Green Digital Guardians",
      role: "Partner",
      imageSrc: GDG,
      socialLinks: {
        twitter: "https://twitter.com/dg_guardians",
        instagram: "https://www.instagram.com/dg_guardians/",
        telegram: "https://t.me/dg_guardians",
        linkedin: "https://www.linkedin.com/company/dg-guardians/",
      },
    },
    // {
    //   name: 'Inkom.io',
    //   role: 'Treasury',
    //   imageSrc: Inkom,
    //   socialLinks: {
    //     twitter: 'https://twitter.com/inkom_io',
    //     instagram: 'https://www.instagram.com/inkom.io/',
    //     telegram: 'https://t.me/inkom-io'
    //   }
    // },

    {
      name: "DotLabs()",
      role: "Educational Partner",
      imageSrc: DotLabs,
      socialLinks: {
        twitter: "https://twitter.com/dotlabs__",
        instagram: "https://www.instagram.com/dotlabs__/",
        telegram: "",
        linkedin: "",
      },
    },
  ];

  return (
    <div className="flex flex-col items-center gap-8">
      <h2 className="font-bold text-4xl text-black">{t("team.partners")}</h2>
      <Carousel
        plugins={[
          Autoplay({
            delay: 2000,
          }),
        ]}
        className="w-full max-w-sm md:max-w-lg lg:max-w-4xl xl: xl:max-w-5xl 2xl:max-w-6xl"
      >
        <CarouselContent>
          {partners.map((member, index) => (
            <CarouselItem
              key={index}
              className="md:basis-1/2 lg:basis-1/3 2xl:basis-1/4"
            >
              <div className="flex items-center justify-center py-2">
                <TeamMemberComponent member={member} />
              </div>
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious className="hidden sm:inline-flex" />
        <CarouselNext className="hidden sm:inline-flex" />
      </Carousel>
    </div>
  );
};

export { Partners };
