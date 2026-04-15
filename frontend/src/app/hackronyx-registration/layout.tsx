import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "HackRonyX Registration | Annual Tech Hackathon",
  description: "Register for HackRonyX 2026. Join our flagship 24-hour coding competition to build innovative solutions, network with recruiters, and win prizes.",
};

export default function HackronyxLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
