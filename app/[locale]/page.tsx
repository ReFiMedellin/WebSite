// :)
"use client";

import { usePrepareSendTransaction, useSendTransaction } from "wagmi";
import { useState } from "react";
import { parseEther } from "viem";
import { AnimatePresence, motion } from "framer-motion";
import axios from "axios";
import ReactMarkdown from "react-markdown";
import { RiCloseFill } from "react-icons/ri";
import Cards from "@/components/Cards";
import { useTranslations } from "next-intl";
import HomeMainView from "@/components/home/Main";
import AboutUs from "@/components/home/AboutUs";
import SupportUs from "@/components/home/SupportUs";
import MembersSection from "@/components/home/Members";
import Sponsors from "@/components/home/Sponsors";
import Footer from "@/components/home/Footer";

export default function Home() {
  const t = useTranslations("Landing");
  const [value, setValue] = useState("0");
  const [isSendingModal, setIsSendingModal] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [isModalMD, setIsModalMD] = useState(false);
  const [popUpOpen, setPopUpOpen] = useState(true);
  const { config, error } = usePrepareSendTransaction({
    to: "0xd4AC6c14B4C96F7e66049210F56cb07468028d4e",
    value: parseEther(value),
  });
  const [modalMD, setModalMD] = useState("");
  const { sendTransactionAsync } = useSendTransaction(config);

  const handleOnSendDonation = async (e: any) => {
    e.preventDefault();
    try {
      await sendTransactionAsync?.();
      setIsSendingModal(false);
    } catch (e) {
      console.error(e);
      setIsSendingModal(false);
    }
  };
  // :)
  async function fetchMD(path: string) {
    if (path === "") {
      setIsModalMD(false);
      setShowModal(true);
      return;
    }
    const owner = "ReFiMedellin";
    const repo = ".github";

    try {
      const url = `https://api.github.com/repos/${owner}/${repo}/contents/${path}`;
      const response = await axios.get(url, {
        headers: {
          Accept: "application/vnd.github.v3.raw",
        },
      });
      // const content = Buffer.from(response.data.content, 'base64').toString('utf8');
      setModalMD(response.data);
      setIsModalMD(true);
      setShowModal(true);
      // return content;
    } catch (error) {
      throw new Error(`Failed to fetch Markdown content: ${error}`);
    }
  }

  return (
    <main className="flex min-h-screen w-screen overflow-x-hidden flex-col items-center justify-between">
      <AnimatePresence>
        {showModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 z-50 right-0 bottom-0 backdrop-blur-sm flex justify-center items-center"
          >
            <motion.div className="relative bg-white rounded-lg w-[90vw] h-[80vh] flex flex-col gap-2 p-5 md:p-10 lg:w-[80vw] md:h-[60vh]">
              <RiCloseFill
                onClick={() => setShowModal(false)}
                className="absolute md:top-4 md:right-4 top-1 right-1 font-bold text-xl cursor-pointer transition-all hover:bg-slate-400 hover:bg-opacity-20 hover:rounded-full"
              />
              {isModalMD ? (
                <div className="overflow-y-scroll ">
                  <ReactMarkdown className="prose-sm md:prose lg:prose-xl">
                    {modalMD}
                  </ReactMarkdown>
                </div>
              ) : (
                <div className="w-full h-full flex justify-center items-center">
                  <h2 className="text-center font-bold text-xl md:text-4xl break-words">
                    {t("projects.modalNotProject")}
                  </h2>
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {isSendingModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 100 }}
            exit={{ opacity: 0 }}
            className="fixed top-0 left-0 z-20 right-0 bottom-0 bg-black bg-opacity-25 flex justify-center items-center"
          >
            <motion.div className="relative max-w-[90vw] z-50 bg-white p-8 rounded-lg flex flex-col gap-2 ">
              <RiCloseFill
                onClick={() => setIsSendingModal(false)}
                className="absolute top-3 right-3 font-bold text-xl cursor-pointer  hover:bg-slate-400 hover:bg-opacity-20 hover:rounded-full"
              />
              <h3 className="text-2xl font-bold">
                Primero ingresa el valor a donar
              </h3>
              <form
                className="flex flex-col gap-2 justify-center items-start"
                onSubmit={handleOnSendDonation}
              >
                <label className="w-full" htmlFor="amount">
                  Cantidad en ETH
                  <input
                    className="w-full border-2 indent-2 border-purple-700 rounded-md text-black font-bold  text-lg "
                    type="number"
                    name="Cantidad en ETH"
                    id="amount"
                    value={value}
                    onChange={(e) => setValue(e.target.value.toString())}
                  />
                </label>
                <p className="text-sm font-light text-gray-400">
                  Recuerda que solo se habilitara el boton si ingresas una
                  cantidad igual o menor al ETH almacenado en tu wallet
                </p>
                <button
                  className={`${
                    !sendTransactionAsync ||
                    parseFloat(value) === 0.0 ||
                    value === ""
                      ? "bg-purple-900"
                      : "bg-purple-700"
                  } w-full text-center  rounded-md text-white font-bold  text-lg px-12 py-2`}
                  type="submit"
                  disabled={!sendTransactionAsync || value === "0"}
                >
                  Enviar
                </button>
              </form>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <HomeMainView />
      <AboutUs />
      <SupportUs />
      <section
        id="proyectos"
        className="min-h-screen py-20 w-full bg-[#1B2731] flex flex-col justify-center items-center gap-10"
      >
        <h2 className="font-bold w-full text-center text-white text-5xl">
          {t("projects.title")}
        </h2>
        <Cards fetchMD={fetchMD} />
      </section>
      <MembersSection />
      <Sponsors />
      <Footer />
    </main>
  );
}
