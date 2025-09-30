"use client";
import { useEffect, useState } from "react";
import PollPreview from "@/components/PollPreview";
import Link from "next/link";
import styles from "./page.module.css";
import HomeButton from "@/components/HomeButton";

export default function Home() {
  const HOOK_URL = process.env.NEXT_PUBLIC_HOOK_URL || "http://localhost:3001";

  const [polls, setPolls] = useState([]);

  useEffect(() => {
    async function getPolls() {
      const res = await fetch(`${HOOK_URL}/api/polls/`);
      const data = await res.json();
      setPolls(data);
    }

    getPolls();
  }, []);

  if (!polls) return <h1>Loading...</h1>;

  return (
    <div id="main-content" className={styles.mainContent}>
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
