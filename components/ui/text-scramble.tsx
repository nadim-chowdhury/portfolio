"use client";

import { useEffect, useRef, useState, useCallback } from "react";

interface TextScrambleProps {
  text: string;
  className?: string;
  speed?: number;
  delay?: number;
}

const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789@#$%&";

export function TextScramble({
  text,
  className = "",
  speed = 35,
  delay = 300,
}: TextScrambleProps) {
  const [displayed, setDisplayed] = useState("");
  const [started, setStarted] = useState(false);
  const revealedRef = useRef(0);
  const intervalRef = useRef<ReturnType<typeof setInterval>>(undefined);

  const scramble = useCallback(() => {
    const revealed = revealedRef.current;
    let result = "";

    for (let i = 0; i < text.length; i++) {
      if (i < revealed) {
        result += text[i];
      } else if (i < revealed + 3) {
        result += text[i] === " " ? " " : CHARS[Math.floor(Math.random() * CHARS.length)];
      } else {
        result += " ";
      }
    }

    setDisplayed(result);

    if (revealed >= text.length) {
      setDisplayed(text);
      if (intervalRef.current) clearInterval(intervalRef.current);
      return;
    }

    revealedRef.current += 1;
  }, [text]);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setStarted(true);
      intervalRef.current = setInterval(scramble, speed);
    }, delay);

    return () => {
      clearTimeout(timeout);
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [scramble, speed, delay]);

  if (!started) {
    return <span className={className}>&nbsp;</span>;
  }

  return <span className={className}>{displayed}</span>;
}
