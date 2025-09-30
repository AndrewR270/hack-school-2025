"use client";
import Link from "next/link";
import Logo from "../../public/Logo";
import styles from "./HomeButton.module.css";

export default function HomeButton() {
  return (
    <Link href="/" className={styles.HomeDiv}>
      <Logo></Logo>
      <h2 className={styles.HomeLink}>ACM POLLS</h2>
    </Link>
  );
}
