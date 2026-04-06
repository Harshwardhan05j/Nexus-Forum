"use client";

import { useEffect, useRef, useState } from "react";

export default function CustomCursor() {
  const cursorRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Hide default cursor globally
    document.body.style.cursor = "none";
    const links = document.querySelectorAll("a, button, [role='button']");
    links.forEach(link => {
      (link as HTMLElement).style.cursor = "none";
    });

    const onMouseMove = (e: MouseEvent) => {
      if (!isVisible) setIsVisible(true);
      if (cursorRef.current) {
        cursorRef.current.style.transform = `translate3d(${e.clientX}px, ${e.clientY}px, 0)`;
      }
    };

    const onMouseDown = () => setIsHovering(true);
    const onMouseUp = () => setIsHovering(false);
    const onMouseEnterLink = () => setIsHovering(true);
    const onMouseLeaveLink = () => setIsHovering(false);

    window.addEventListener("mousemove", onMouseMove);
    window.addEventListener("mousedown", onMouseDown);
    window.addEventListener("mouseup", onMouseUp);

    // Re-select links to ensure we catch dynamic ones if needed, 
    // but for now just the static ones
    const interactiveElements = document.querySelectorAll("a, button, [role='button'], input, select, textarea");
    interactiveElements.forEach(el => {
      el.addEventListener("mouseenter", onMouseEnterLink);
      el.addEventListener("mouseleave", onMouseLeaveLink);
    });

    return () => {
      document.body.style.cursor = "auto";
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("mousedown", onMouseDown);
      window.removeEventListener("mouseup", onMouseUp);
      interactiveElements.forEach(el => {
        el.removeEventListener("mouseenter", onMouseEnterLink);
        el.removeEventListener("mouseleave", onMouseLeaveLink);
      });
    };
  }, [isVisible]);

  if (typeof window === "undefined") return null;

  return (
    <div
      ref={cursorRef}
      className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-opacity duration-300 ${isVisible ? 'opacity-100' : 'opacity-0'}`}
      style={{
        width: "32px",
        height: "32px",
        marginTop: "-2px", 
        marginLeft: "-2px",
        willChange: "transform",
      }}
    >
      <div 
        className="transition-transform duration-200 ease-out"
        style={{
          transform: isHovering ? "scale(1.2)" : "scale(1)",
        }}
      >
        <svg
          width="32"
          height="32"
          viewBox="0 0 32 32"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          {/* Main Shadow/Outline */}
          <path
            d="M2 2L15 28L20 18L30 13L2 2Z"
            fill="black"
            stroke="black"
            strokeWidth="3"
            strokeLinejoin="round"
          />
          {/* Main Fill */}
          <path
            d="M2 2L15 28L20 18L30 13L2 2Z"
            fill="#55555d"
          />
          {/* Inner Light Grey Gradient/Highlight Area */}
          <path
            d="M5 6L14 24L18 16L26 12L5 6Z"
            fill="#71717a"
            opacity="0.5"
          />
          {/* Top White Highlight Strip */}
          <path
            d="M8 8L18 13"
            stroke="white"
            strokeWidth="2"
            strokeLinecap="round"
            opacity="0.8"
          />
          {/* Small base squares (bits) */}
          <rect x="14" y="21" width="2" height="2" fill="white" opacity="0.6" />
          <rect x="17" y="19" width="2" height="2" fill="white" opacity="0.6" />
          
          {/* The square bit near the joint */}
          <rect x="15" y="16" width="3" height="3" fill="black" transform="rotate(45 15 16)" />
        </svg>
      </div>
    </div>
  );
}
