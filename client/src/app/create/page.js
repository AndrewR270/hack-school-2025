"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";
import HomeButton from "@/components/HomeButton";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
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
        <div className={styles.formRow}>
          <label htmlFor="titleInput">Title:</label>
          <input
            id="titleInput"
            className={styles.textInput}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="descriptionInput">Description:</label>
          <input
            id="descriptionInput"
            className={styles.textInput}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div className={styles.formRow}>
          <label htmlFor="ownerInput">Owner:</label>
          <input
            id="ownerInput"
            className={styles.textInput}
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </div>

        <br></br>

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
