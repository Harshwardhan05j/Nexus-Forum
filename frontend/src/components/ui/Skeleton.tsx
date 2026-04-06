"use client";

export default function Skeleton({ 
  className = "", 
  variant = "shimmer" 
}: { 
  className?: string;
  variant?: "shimmer" | "pulse";
}) {
  return (
    <div 
      className={`relative overflow-hidden bg-white/5 rounded-md ${className} ${
        variant === "pulse" ? "animate-pulse" : ""
      }`}
    >
      {variant === "shimmer" && (
        <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.03] to-transparent -translate-x-full animate-[shimmer_1.5s_infinite]" />
      )}
    </div>
  );
}
