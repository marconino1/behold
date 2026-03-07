import Leo from "@/components/mascot/Leo";

const GRADIENT =
  "linear-gradient(180deg, #0C4A6E 0%, #0369A1 50%, #0EA5E9 100%)";

export default function AuthLoading() {
  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        background: GRADIENT,
      }}
    >
      <Leo state="thinking" size="session" />
      <p
        style={{
          fontFamily: "'Nunito', system-ui, sans-serif",
          fontSize: 16,
          color: "rgba(255,255,255,0.8)",
          marginTop: 16,
        }}
      >
        Loading...
      </p>
    </div>
  );
}
