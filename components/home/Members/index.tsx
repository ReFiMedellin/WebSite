import React from "react";
import Team from "./Team";
import BordeTop from "@/assets/images/Borde Superior Sección.webp";
import Image from "next/image";
import { Partners } from "./PartnersSection/Partners";

export default function MembersSection() {
  return (
    <section className="py-40 relative flex justify-center bg-[#F1F0FF] items-center w-full">
      <Image
        className="w-screen absolute top-0 "
        src={BordeTop}
        alt="borde superior"
      />
      <div className="flex flex-col gap-20 justify-center items-center">
        <Team />
        <Partners />
      </div>
    </section>
  );
}
