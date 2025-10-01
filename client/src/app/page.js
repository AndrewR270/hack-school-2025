"use client";
import { useEffect, useState } from "react";
import PollPreview from "@/components/PollPreview";
import Link from "next/link";
import styles from "./page.module.css";
import HomeButton from "@/components/HomeButton";

export default function Home() {
  const polls = [
    {
      ownerId: "tyler",
      title: "Hamburger or hotdog?",
      description: "food for you",
      options: [
        {
          option: "Hamburger",
          count: 22,
        },
        {
          option: "Hot dog",
          count: 22,
        },
      ],
      __v: 0,
      totalVotes: 44,
      _id: 5,
    },
  ];

  return (
    <div id="main-content">
      <HomeButton></HomeButton>
      {polls.map((poll) => {
        console.log(poll);
        return (
          <PollPreview
            key={poll._id}
            title={poll.title}
            totalVotes={poll.totalVotes || 0}
            ownerId={poll.ownerId}
            link={"/poll/" + poll._id}
          ></PollPreview>
        );
      })}
      <Link className={styles.createPollButton} href="/create">
        Create Poll
      </Link>
    </div>
  );
}
