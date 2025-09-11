"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import styles from "./page.module.css";

export default function CreatePage() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [owner, setOwner] = useState("");
  const [options, setOptions] = useState([""]);

  const router = useRouter();

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

    const res = await fetch("http://localhost:3001/api/polls", {
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
      <Link id="title-link" href="/">
        ACM POLLS
      </Link>
      <form onSubmit={handleSubmit} className={styles.formContainer}>
        <label>
          Title:
          <input
            className={styles.textInput}
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </label>

        <label>
          Description:
          <input
            className={styles.textInput}
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </label>

        <label>
          Owner:
          <input
            className={styles.textInput}
            type="text"
            value={owner}
            onChange={(e) => setOwner(e.target.value)}
          />
        </label>

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
