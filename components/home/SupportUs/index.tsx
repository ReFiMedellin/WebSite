import Image from "next/image";
import TopBorder from "@/assets/images/Borde Superior Sección.webp";
import BordeBottom from "@/assets/images/Borde-ReFi.png";
import LogoMan from "@/assets/images/Logo Transparent-Man.png";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { PiCopyBold } from "react-icons/pi";

export default function SupportUs() {
  const t = useTranslations("Landing");
  const address = "0xd4AC6c14B4C96F7e66049210F56cb07468028d4e";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };
  return (
    <section className="min-h-screen py-32 relative bg-[#F1F0FF] flex justify-center items-center w-full">
      <Image
        className="w-screen absolute top-0 "
        src={TopBorder}
        alt="borde superior"
      />
      <div className="h-full w-5/6 flex flex-row justify-center gap-10 items-center">
        <div className="text-black flex gap-5  flex-col justify-center items-center h-full  w-full">
          <div className="flex gap-5 break-words flex-col justify-center items-center h-full  w-full">
            <h2 className="text-4xl w-full font-bold">{t("donate.title")}</h2>
            <p className="w-full">
              {t("donate.description.part1")}
              <br />
              <br />
              {t("donate.description.part2")}
              <br />
              <br />
              {t("donate.description.part3")}
              <br />
              <br />
              <span
                onClick={copyToClipboard}
                className="flex flex-row items-center gap-1"
              >
                <span className="font-bold">(Ethereum):</span>
                <span
                  title="Copy to clipboard"
                  className="flex flex-row items-center gap-1 text-[#4571E1] font-semibold cursor-pointer"
                >
                  {address}
                  <PiCopyBold />
                </span>
              </span>
            </p>
          </div>
          <div className="flex z-10 flex-row w-full justify-center items-center gap-2 lg:gap-4">
            <Link
              target="_blank"
              href={"https://giveth.io/project/refi-medellin"}
              className="text-center bg-[#4571E1] text-white rounded-md w-full text-sm font-bold  py-2 font-sm lg:px-8 lg:py-4"
            >
              {t("donate.buttons.option1")}
            </Link>
            <Link
              href={"/donate?network=ethereum"}
              className="text-center bg-[#4571E1] text-white rounded-md w-full  text-sm font-bold  py-2 font-sm lg:px-8 lg:py-4"
            >
              {t("donate.buttons.option2")}
            </Link>
          </div>
        </div>
        <Image
          className="hidden lg:block"
          src={LogoMan}
          alt="refi logo"
          height={380}
        />
        <Image
          className="absolute bottom-0 w-[100vw] left-0"
          src={BordeBottom}
          alt="Medellin"
        />
      </div>
    </section>
  );
}
