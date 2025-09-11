"use client";
import Link from "next/link";
import styles from "./PollPreview.module.css";

// 1a 👇
export default function PollPreview({ title, totalVotes, ownerId, link }) {
  return (
    <Link href={link} className={styles.PollLink}>
      <div className={styles.infoContainer}>
        {/* 1b 👇*/}
        <h2 className={styles.pollTitle}>{title}</h2>
        {/* 1c 👇*/}
        <p>{totalVotes} votes</p>
      </div>
      {/* 1d 👇*/}
      <p className={styles.ownerId}>{ownerId}</p>
    </Link>
  );
}
