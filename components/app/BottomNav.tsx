"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import Icon from "@/components/icons/Icon";

export default function BottomNav() {
  const pathname = usePathname();
  const isLearn = pathname === "/dashboard" || pathname?.startsWith("/session");
  const isProfile = pathname === "/profile";

  return (
    <nav
      style={{
        position: "fixed",
        bottom: 0,
        left: 0,
        right: 0,
        height: 64,
        paddingBottom: "max(16px, env(safe-area-inset-bottom))",
        background: "white",
        boxShadow: "0 -2px 12px rgba(60,40,10,0.08), 0 -1px 4px rgba(60,40,10,0.04)",
        display: "flex",
        alignItems: "center",
        justifyContent: "space-around",
        zIndex: 50,
      }}
    >
      <Link
        href="/dashboard"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
          color: isLearn ? "#C8932A" : "#8C7A62",
          fontFamily: "'Nunito', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        <Icon name="learn" size={24} color={isLearn ? "#C8932A" : "#8C7A62"} />
        Learn
      </Link>
      <Link
        href="/profile"
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 4,
          textDecoration: "none",
          color: isProfile ? "#C8932A" : "#8C7A62",
          fontFamily: "'Nunito', system-ui, sans-serif",
          fontWeight: 700,
          fontSize: 13,
        }}
      >
        <Icon name="person" size={24} color={isProfile ? "#C8932A" : "#8C7A62"} />
        Profile
      </Link>
    </nav>
  );
}
