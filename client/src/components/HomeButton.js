"use client";
import Link from "next/link";
import Logo from "../../public/Logo";
import LogoHover from "../../public/LogoHover";
import styles from "./HomeButton.module.css";
import { useState } from "react";

export default function HomeButton() {
  const [hover, setHover] = useState(false);

  return (
    <Link
      href="/"
      className={styles.HomeDiv}
      onMouseEnter={() => setHover(true)}
      onMouseLeave={() => setHover(false)}
    >
      {hover ? <LogoHover /> : <Logo />}
      <h2 className={styles.HomeLink}>ACM POLLS</h2>
    </Link>
  );
}
