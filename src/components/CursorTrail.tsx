"use client";

import React, { useState, useEffect, useRef } from "react";

const colors = [
  "#ffb56b",
  "#fdaf69",
  "#f89d63",
  "#f59761",
  "#ef865e",
  "#ec805d",
  "#e36e5c",
  "#df685c",
  "#d5585c",
  "#d1525c",
  "#c5415d",
  "#c03b5d",
  "#b22c5e",
  "#ac265e",
  "#9c155f",
  "#950f5f",
  "#830060",
  "#7c0060",
  "#680060",
  "#60005f",
  "#48005f",
  "#3d005e",
];

interface Coords {
  x: number;
  y: number;
}

const CursorTrail: React.FC = () => {
  const [coords, setCoords] = useState<Coords>({ x: 0, y: 0 });
  const circlesRef = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setCoords({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener("mousemove", handleMouseMove);

    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, []);

  useEffect(() => {
    const animateCircles = () => {
      let x = coords.x;
      let y = coords.y;

      circlesRef.current.forEach((circle, index) => {
        if (circle) {
          circle.style.left = `${x - 12}px`;
          circle.style.top = `${y - 12}px`;
          circle.style.transform = `scale(${
            (circlesRef.current.length - index) / circlesRef.current.length
          })`;

          const nextCircle =
            circlesRef.current[index + 1] || circlesRef.current[0];
          if (nextCircle) {
            x += (nextCircle.offsetLeft - x) * 0.3;
            y += (nextCircle.offsetTop - y) * 0.3;
          }
        }
      });

      requestAnimationFrame(animateCircles);
    };

    animateCircles();
  }, [coords]);

  return (
    <>
      {new Array(22).fill(0).map((_, index) => (
        <div
          key={index}
          ref={(el) => {
            circlesRef.current[index] = el;
          }}
          className="cursor_trail_circle"
          style={{ backgroundColor: colors[index % colors.length] }}
        />
      ))}
    </>
  );
};

export default CursorTrail;
