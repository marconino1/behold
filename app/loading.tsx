import Leo from "@/components/mascot/Leo";

export default function Loading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: "#FAF7F2",
      }}
    >
      <Leo state="thinking" size="session" />
      <p
        style={{
          fontFamily: "'Nunito', system-ui, sans-serif",
          fontSize: 16,
          color: "#8C7A62",
          marginTop: 16,
        }}
      >
        Loading...
      </p>
    </div>
  );
}
