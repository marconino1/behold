"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Leo from "@/components/mascot/Leo";
import Button from "@/components/ui/Button";

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const router = useRouter();

  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAF7F2",
        padding: 24,
      }}
    >
      <Leo state="oops" size="session" />
      <h1
        style={{
          fontFamily: "'Playfair Display', Georgia, serif",
          fontSize: 24,
          fontWeight: 700,
          color: "#2C2016",
          marginTop: 24,
          marginBottom: 8,
          textAlign: "center",
        }}
      >
        Something went wrong.
      </h1>
      <Button
        variant="primary"
        onClick={() => {
          reset();
          router.refresh();
        }}
        style={{ marginTop: 24 }}
      >
        Try again
      </Button>
    </div>
  );
}
