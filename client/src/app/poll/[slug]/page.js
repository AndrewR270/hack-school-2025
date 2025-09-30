"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import HomeButton from "@/components/HomeButton";

export default function PollPage() {
  const HOOK_URL = process.env.NEXT_PUBLIC_HOOK_URL || "http://localhost:3001";
  const [poll, setPoll] = useState(null);

  const { slug } = useParams();

  const [selectedOption, setSelectedOption] = useState("");
  const [voted, setVoted] = useState(false);

  const handleSubmit = async (e) => {
    await e.preventDefault();
    if (!selectedOption) {
      alert("Please select an option.");
      return;
    }
    const res = await fetch(`${HOOK_URL}/api/vote`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        pollId: slug,
        optionId: selectedOption,
      }),
    });
    alert(`Vote cast!`);
    console.log(`Vote cast for ${slug} on option ${selectedOption}`);

    const data = await res.json();
    setVoted(true);
    setPoll(data);
  };

  useEffect(() => {
    async function getPoll() {
      const res = await fetch(`${HOOK_URL}/api/polls/id/${slug}`);
      const data = await res.json();
      setPoll(data);
    }
    getPoll();
  }, []);

  if (!poll) return <h1>Loading...</h1>;

  return (
    <div id="main-content">
      <HomeButton></HomeButton>
      <h1 className={styles.pollTitle}>{poll.title}</h1>
      <p className={styles.totalVotes}>{poll.totalVotes || 0} total votes</p>
      <p className={styles.pollOwner}>Poll created by {poll.ownerId}</p>
      <p className={styles.pollDescription}>{poll.description}</p>
      <form onSubmit={handleSubmit} className={styles.pollForm}>
        {poll.options.map((option) => {
          return (
            <div className={styles.optionsContainer} key={option._id}>
              <div>
                <input
                  type="radio"
                  id={option._id}
                  name="poll"
                  value={option._id}
                  checked={selectedOption === option._id}
                  onChange={() => setSelectedOption(option._id)}
                />
                <label className={styles.label} htmlFor={option.option}>
                  {option.option}
                </label>
              </div>
              {voted ? (
                <p className={styles.voteCount}>{option.count || 0} votes</p>
              ) : (
                <></>
              )}
            </div>
          );
        })}
        <div className={styles.submitContainer}>
          <button
            type="submit"
            onSubmit={handleSubmit}
            className={styles.submitButton}
          >
            Vote
          </button>
        </div>
      </form>
    </div>
  );
}
