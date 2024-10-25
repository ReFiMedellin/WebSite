import { useTranslations } from "next-intl";
import {
  PiTelegramLogoBold,
  PiInstagramLogoBold,
  PiXBold,
  PiCopyBold,
} from "react-icons/pi";
import { RxLinkedinLogo, RxNotionLogo } from "react-icons/rx";
import { FaWhatsapp, FaYoutube } from "react-icons/fa";
import Link from "next/link";
import React from "react";

export default function Footer() {
  const t = useTranslations("Landing");
  const address = "0xd4AC6c14B4C96F7e66049210F56cb07468028d4e";

  const copyToClipboard = () => {
    navigator.clipboard.writeText(address);
  };
  return (
    <footer className="bg-slate-200 w-full ">
      <div className="flex px-4 py-10 lg:px-14 flex-row justify-between items-center gap-20">
        <div className="flex flex-col justify-center gap-5 items-start w-full lg:w-1/2">
          <h2 className="text-4xl font-bold">{t("footer.title")}</h2>
          <div className="w-full">
            <p>
              {t("footer.description.part1")}{" "}
              <span className="font-bold">admin@refimedellin.org</span>
            </p>
            <p className="break-words">
              {t("footer.description.part2")}{" "}
              <span
                onClick={copyToClipboard}
                className="flex flex-row items-center gap-1"
              >
                <span className="font-bold">(Ethereum):</span>
                <span title="Copy to clipboard" className="flex flex-row items-center gap-1 text-purple-900 font-semibold cursor-pointer">
                  {address}
                  <PiCopyBold />
                </span>
              </span>
            </p>
          </div>
          <div className="flex flex-row flex-wrap justify-start items-center gap-2">
            <Link
              target="_blank"
              href={"https://twitter.com/ReFiMedellin"}
              className="text-purple-900 text-2xl"
            >
              <PiXBold />
            </Link>
            <Link
              target="_blank"
              href={"https://instagram.com/refimedellin"}
              className="text-purple-900 text-2xl"
            >
              <PiInstagramLogoBold />
            </Link>
            <Link
              target="_blank"
              href={"https://t.me/reficolombia"}
              className="text-purple-900 text-2xl"
            >
              <PiTelegramLogoBold />
            </Link>
            <Link
              target="_blank"
              href={"https://www.linkedin.com/company/refimedellin"}
              className="text-purple-900 text-2xl"
            >
              <RxLinkedinLogo />
            </Link>

            <Link
              target="_blank"
              href={"https://youtube.com/@ReFiMedellin"}
              className="text-purple-900 text-2xl"
            >
              <FaYoutube />
            </Link>
            <Link
              target="_blank"
              href={"https://chat.whatsapp.com/C2dUH2dmZyTJdLjWkE1ILG"}
              className="text-purple-900 text-2xl"
            >
              <FaWhatsapp />
            </Link>
            <Link
              target="_blank"
              href={
                "https://refimedellin.notion.site/cacd321bb2204a5888d88d3288d1bec4?v=d1871f2a1dd34bfeae1afe476e6d8b9f"
              }
              className="text-purple-900 text-2xl"
            >
              <RxNotionLogo />
            </Link>
          </div>
        </div>
      </div>
      <div className="py-5 bg-gray-700 text-white  px-2 flex flex-col gap-1 justify-center items-center text-center">
        <p>
          ®2023 Refi Medellín, made with 🩵 by{" "}
          <Link
            className="text-blue-400 font-bold cursor-pointer"
            href={
              "https://refimedellin.notion.site/0fd39ac0a6cf4ee8bfe3d950c18bc9ed?v=d9dafe69cda7413a8d85cac3da405c40"
            }
            target="_blank"
          >
            Refi Medellín Team{" "}
          </Link>
        </p>
        <p>
          Developed by{" "}
          <Link target="_blank" href={"https://github.com/Another-DevX"}>
            <span className="text-blue-400 font-bold">Another_Dev </span>
          </Link>
          And
          <Link target="_blank" href={"https://github.com/simon0820s"}>
            <span className="text-blue-400 font-bold"> Simón_Arboleda</span>
          </Link>
        </p>
      </div>
    </footer>
  );
}
