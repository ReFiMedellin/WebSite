import Image from "next/image";
import LogoWoman from "@/assets/images/Logo Transparent-Woman.png";
import React from "react";
import Link from "next/link";
import { useTranslations } from "next-intl";

export default function AboutUs() {
  const t = useTranslations("Landing");
  return (
    <section
      id="aboutUS"
      className="min-h-screen relative py-20 flex justify-center items-center bg-slate-900 w-full"
    >
      <div className="h-full w-5/6 flex flex-row justify-center gap-10 items-center">
        <Image
          className="hidden lg:block"
          src={LogoWoman}
          alt="refi logo"
          height={480}
        />
        <div className="text-white flex gap-5  flex-col justify-center items-center h-full  w-full">
          <h2 className="text-4xl font-bold">{t("aboutUs.title")}</h2>
          <p>
            {t("aboutUs.description.part1")}{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://www.refidao.com/"}
              target="_blank"
            >
              ReFiDAO{" "}
            </Link>{" "}
            {t("aboutUs.description.part2")}{" "}
            <span className="font-bold">ReFi Medellín</span>,
            {t("aboutUs.description.part3")}{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://linktr.ee/juanjgiraldoc"}
              target="_blank"
            >
              Juan Giraldo
            </Link>
            ,{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://twitter.com/TerezaBizkova"}
              target="_blank"
            >
              Tereza Bizkova
            </Link>
            ,{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://twitter.com/alejandro99so"}
              target="_blank"
            >
              Alejandro Soto
            </Link>
            ,{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://twitter.com/ximemonclou"}
              target="_blank"
            >
              Ximena Monclou
            </Link>
            ,{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://twitter.com/0xflypeztic"}
              target="_blank"
            >
              0xflypeztic
            </Link>
            ,{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://twitter.com/cryptochimba"}
              target="_blank"
            >
              Cryptochimba
            </Link>
            ,{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://dgguardians.com/"}
              target="_blank"
            >
              Green Digital Guardians
            </Link>
            ,{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://inkom.io/"}
              target="_blank"
            >
              Inkom.io
            </Link>{" "}
            y{" "}
            <Link
              className="text-blue-400 font-bold cursor-pointer"
              href={"https://dotlabs.academy/"}
              target="_blank"
            >
              Dotlabs()
            </Link>
            !
            <br />
            <br />
            {t("aboutUs.description.part4")}
            <br />
            <br />
            {t("aboutUs.description.part5")}
            <br />
            <br />
            {t("aboutUs.description.part6")}
          </p>
          <Link
            href={"#proyectos"}
            className="w-full text-center bg-[#4571E1] rounded-md text-white font-bold  text-lg px-12 py-2"
          >
            {t("aboutUs.button")}
          </Link>
        </div>
      </div>
    </section>
  );
}
