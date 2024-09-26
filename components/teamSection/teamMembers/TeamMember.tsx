import Image from "next/image";
import styles from "./styles.module.css"; // Import your CSS module
import React from "react";
import { TeamMemberType } from "@/types/members";

type Props = {
  member: TeamMemberType;
};
export default function TeamMemberComponent({ member }: Props) {
  return (
    <div className={styles.container}>
      <div className={styles["card--article"]}>
        <Image
          src={member.imageSrc}
          alt="Refi member"
          className={`${styles["card--profile"]} w-20 h-20 rounded-full border-white border-2`}
          // Combine CSS module class with tailwind classes
        />
        <div className={styles["card--tooltip"]}>
          <div className={styles["card--content"]}>
            <header className={styles["card--header"]}>
              <span>Social</span>

              <div className={styles["card--social"]}>
                <a href="https://www.linkedin.com/" target="_blank">
                  <i className="ri-linkedin-box-line"></i>
                </a>

                <a href="https://github.com/" target="_blank">
                  <i className="ri-github-fill"></i>
                </a>

                <a href="https://dribbble.com/" target="_blank">
                  <i className="ri-dribbble-line"></i>
                </a>
              </div>
            </header>

            <div className={styles["card--data"]}>
              <div className={styles["card--image"]}>
                <div className={styles["card--mask"]}>
                  <Image
                    src={member.imageSrc}
                    alt="Refi member"
                    className={`${styles["card--profile"]} w-20 h-20 rounded-full border-white border-2`}
                  />
                </div>

                <span className={styles["card--status"]}></span>
              </div>

              <h2 className={styles["card--name"]}>Evalyn Adson</h2>
              <h3 className={styles["card--profession"]}>Web designer</h3>

              <a href="#" className={styles["card--button"]}>
                <i className="ri-chat-3-line"></i> <span>Send Message</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
