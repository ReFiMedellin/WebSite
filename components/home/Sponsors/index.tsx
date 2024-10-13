import { useTranslations } from "next-intl";
import GlodollarLogo from "@/assets/images/Glodollar.png";
import Image from "next/image";
import React from "react";

export default function Sponsors() {
  const t = useTranslations("Landing");

  return (
    <section
      id="Sponsors"
      className="px-4 py-12 w-full bg-[#1B2731] flex flex-col justify-center items-center gap-10"
    >
      <h2 className="font-bold w-full text-center text-white text-4xl sm:text-5xl">
        {t("partners.title")}
      </h2>
      <div className="flex items-center gap-5">
        <div className=" text-white flex flex-col gap-4 justify-center items-center">
          <Image src={GlodollarLogo} alt="Glodollar Logo" />
          <p className="w-full text-center">
            Refi Medellín is the first local node from RefiDAO to swap part of
            their treasury for Glo Dollars. <br />
            We are committed to hold at least 30% of our treasury in Glo
            Dollars.
          </p>
        </div>
      </div>
    </section>
  );
}
