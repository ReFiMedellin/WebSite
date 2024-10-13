import { useTranslations } from "next-intl";
import SeedingImage from "@/assets/images/seeding.webp";
import BordeBottom from "@/assets/images/Borde-ReFi.png";
import Image from "next/image";
import Link from "next/link";
import LOGO from "@/assets/images/Logo Transparent-Man.png";
import React from "react";

export default function HomeMainView() {
  const t = useTranslations("Landing");

  return (
    <section id="homeMainView" className="flex py-20 flex-row relative first-bg justify-center items-center h-screen bg-[#1B2731] w-full">
      <div className="relative h-full lg:w-5/6  flex flex-row justify-center items-center">
        <Image
          src={SeedingImage}
          alt="seeding-image"
          className="w-full lg:w-3/4 xl:w-1/2 absolute -top-20 -left-1/4 opacity-10 rounded-full"
        />
        <div className="flex justify-center items-center w-full h-full">
          <div className="z-10 text-white w-5/6 flex flex-col gap-5">
            <h1 className="font-bold text-4xl md:text-6xl">
              {t("home.title")}
            </h1>
            <p className="text-base">
              {t("home.description.part1")}{" "}
              <Link
                className="text-blue-400 font-bold cursor-pointer"
                href={"https://www.refidao.com/"}
                target="_blank"
              >
                ReFiDAO{" "}
              </Link>
              {t("home.description.part2")}
              <br /> <br />
              {t("home.description.part3")}
            </p>
            <div className="flex flex-row gap-2">
              <Link
                href={"https://t.me/reficolombia"}
                target="_blank"
                className="text-center px-4 py-2 w-full rounded-md bg-[#4571E1] text-white font-bold text-base md:text-lg"
              >
                {t("home.button1")}
              </Link>
              <Link
                href={"https://giveth.io/project/refi-medellin"}
                target="_blank"
                className="text-center px-4 py-2 w-full rounded-md bg-[#4571E1] text-white font-bold text-base md:text-lg"
              >
                {t("home.button2")}
              </Link>
            </div>
          </div>
        </div>
        <div>
          <Image
            className="hidden lg:block w-full h-full"
            height={300}
            src={LOGO}
            alt="Medellin"
          />
        </div>
      </div>
      <Image
        className="absolute bottom-0 w-[100vw] left-0"
        src={BordeBottom}
        alt="Medellin"
      />
    </section>
  );
}
