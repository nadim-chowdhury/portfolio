"use client";

import React, { useEffect, useRef } from "react";

export default function CustomCursor() {
  const cursorRef = useRef(null);

  useEffect(() => {
    const updateCursorPosition = (e: any) => {
      if (cursorRef.current) {
        (cursorRef.current as any).style.left = `${e.clientX}px`;
        (cursorRef.current as any).style.top = `${e.clientY}px`;
      }
    };

    window.addEventListener("mousemove", updateCursorPosition);

    return () => {
      window.removeEventListener("mousemove", updateCursorPosition);
    };
  }, []);

  return <div className="custom-cursor" ref={cursorRef}></div>;
}
