"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import HomeButton from "@/components/HomeButton";

export default function CreatePage() {
  // * Begin Activity 2a
  //TODO: Create a set of hooks for the title, description, and owner

  // * End Activity

  const [options, setOptions] = useState([""]);

  const router = useRouter();
  const HOOK_URL = process.env.NEXT_PUBLIC_HOOK_URL || "http://localhost:3001";

  const handleSubmit = async (e) => {
    await e.preventDefault();

    if (!title || !description || !owner || !options) {
      alert("Some fields missing.");
      return;
    }

    const formattedOptions = options.map((opt) => ({
      option: opt.trim(),
      count: 0,
    }));

    const res = await fetch(`${HOOK_URL}/api/polls`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        title: title,
        description: description,
        ownerId: owner,
        options: formattedOptions,
      }),
    });
    alert("Poll created!");
    router.push("/");
  };

  return (
    <div id="main-content">
      <HomeButton></HomeButton>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <h1 className={styles.pollTitle}>Create Poll</h1>
        {/* ACTIVITY 2b STARTS */}

        {/**
         * //TODO: Create an input box for the title, description, and owner of the poll
         * One way of displaying it is:
         * Title: [         ]
         */}

        {/* ACTIVITY END */}

        <label>Options:</label>
        {options.map((option, index) => (
          <div key={index} className={styles.optionsContainer}>
            <input
              className={styles.option}
              type="text"
              placeholder={`Option ${index + 1}`}
              value={option}
              onChange={(e) => {
                const newOptions = [...options];
                newOptions[index] = e.target.value;
                setOptions(newOptions);
              }}
            />
            {options.length > 1 && (
              <button
                type="button"
                className={styles.deleteButton}
                onClick={() => {
                  const newOptions = options.filter((_, i) => i !== index);
                  setOptions(newOptions);
                }}
              >
                ✕
              </button>
            )}
          </div>
        ))}
        <button
          type="button"
          className={styles.addOptionButton}
          onClick={() => setOptions([...options, ""])}
        >
          + Add Option
        </button>

        <button type="submit" className={styles.submitButton}>
          Submit
        </button>
      </form>
    </div>
  );
}
