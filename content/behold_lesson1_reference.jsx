import { useState } from "react";

// ── DESIGN TOKENS ────────────────────────────────────────────────
const C = {
  sky:"#0EA5E9", skyDark:"#0369A1", skyDeep:"#0C4A6E",
  skyLight:"#E0F2FE", skyPale:"#F0F9FF",
  gold:"#F59E0B", goldLight:"#FEF3C7",
  green:"#10B981", greenLight:"#DCFCE7",
  red:"#EF4444", redLight:"#FEE2E2",
  purple:"#8B5CF6",
  text:"#0C1A2E", muted:"#64748B", faint:"#94A3B8",
  white:"#FFFFFF", bg:"#F0F9FF",
};

// ── LEO SVG MASCOT ───────────────────────────────────────────────
function Leo({ size = 60, state = "default" }) {
  const celebrating = state === "celebrating";
  const happy = state === "happy" || celebrating;
  return (
    <svg width={size} height={size * 1.1} viewBox="0 0 110 120" fill="none">
      <ellipse cx="55" cy="56" rx="42" ry="40" fill="#F59E0B" opacity="0.15"/>
      <ellipse cx="55" cy="56" rx="36" ry="34" fill="#D97706" opacity="0.25"/>
      <ellipse cx="55" cy="22" rx="10" ry="8" fill="#D97706" opacity="0.55"/>
      <ellipse cx="35" cy="28" rx="9" ry="7" fill="#D97706" opacity="0.48"/>
      <ellipse cx="75" cy="28" rx="9" ry="7" fill="#D97706" opacity="0.48"/>
      <ellipse cx="22" cy="44" rx="8" ry="9" fill="#D97706" opacity="0.38"/>
      <ellipse cx="88" cy="44" rx="8" ry="9" fill="#D97706" opacity="0.38"/>
      <ellipse cx="55" cy="58" rx="28" ry="26" fill="#FDE68A"/>
      <ellipse cx="33" cy="36" rx="7" ry="8" fill="#FCD34D"/>
      <ellipse cx="77" cy="36" rx="7" ry="8" fill="#FCD34D"/>
      <ellipse cx="33" cy="36" rx="4" ry="5" fill="#FEF3C7" opacity="0.5"/>
      <ellipse cx="77" cy="36" rx="4" ry="5" fill="#FEF3C7" opacity="0.5"/>
      {happy ? (
        <>
          <path d="M38 53 Q44 48 50 53" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          <path d="M60 53 Q66 48 72 53" stroke="#78350F" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
        </>
      ) : (
        <>
          <ellipse cx="44" cy="54" rx="6" ry="7" fill="white"/>
          <ellipse cx="66" cy="54" rx="6" ry="7" fill="white"/>
          <ellipse cx="44" cy="55" rx="4" ry="5" fill="#78350F"/>
          <ellipse cx="66" cy="55" rx="4" ry="5" fill="#78350F"/>
          <ellipse cx="44" cy="54" rx="2.5" ry="3" fill="#1C0A00"/>
          <ellipse cx="66" cy="54" rx="2.5" ry="3" fill="#1C0A00"/>
          <ellipse cx="45.5" cy="52.5" rx="1.2" ry="1.2" fill="white"/>
          <ellipse cx="67.5" cy="52.5" rx="1.2" ry="1.2" fill="white"/>
        </>
      )}
      <ellipse cx="55" cy="63" rx="5" ry="3.5" fill="#D97706"/>
      <ellipse cx="53.5" cy="62" rx="1.5" ry="1" fill="#FEF3C7" opacity="0.6"/>
      {celebrating ? (
        <path d="M44 70 Q55 81 66 70" stroke="#92400E" strokeWidth="2.2" fill="none" strokeLinecap="round"/>
      ) : (
        <path d="M49 69 Q55 75 61 69" stroke="#92400E" strokeWidth="1.8" fill="none" strokeLinecap="round"/>
      )}
      <ellipse cx="36" cy="64" rx="6" ry="3.5" fill="#FCA5A5" opacity={celebrating ? 0.4 : 0.2}/>
      <ellipse cx="74" cy="64" rx="6" ry="3.5" fill="#FCA5A5" opacity={celebrating ? 0.4 : 0.2}/>
      <line x1="28" y1="64" x2="43" y2="66" stroke="#D97706" strokeWidth="0.8" opacity="0.35"/>
      <line x1="28" y1="68" x2="43" y2="68" stroke="#D97706" strokeWidth="0.8" opacity="0.35"/>
      <line x1="67" y1="66" x2="82" y2="64" stroke="#D97706" strokeWidth="0.8" opacity="0.35"/>
      <line x1="67" y1="68" x2="82" y2="68" stroke="#D97706" strokeWidth="0.8" opacity="0.35"/>
      {celebrating && <>
        <path d="M92 16 L94 11 L96 16 L101 18 L96 20 L94 25 L92 20 L87 18Z" fill="#FCD34D"/>
        <path d="M8 28 L9.5 24 L11 28 L15 29.5 L11 31 L9.5 35 L8 31 L4 29.5Z" fill="#FCD34D" opacity="0.8"/>
        <circle cx="85" cy="35" r="2" fill="#F59E0B"/>
        <circle cx="20" cy="18" r="1.5" fill="#FCD34D"/>
      </>}
    </svg>
  );
}

// ── LESSON DATA ──────────────────────────────────────────────────
const LESSON = {
  id:"K0", title:"The Kerygma", subtitle:"Where everything begins",
  tier:"Entry Point", tierColor: C.gold,
  totalXP: 100,
  cards: [
    {
      id: 1,
      sectionTitle: "God made you.",
      teaching: "Before all theology, before doctrine or prayer, comes one irreducible truth: God deliberately created you and he loves you completely — not because of what you have done, earned, or believed, but simply because you exist. You are not an accident. This is not sentiment. It is the foundation on which the entire Catholic faith rests.",
      ccc: "CCC 218–221",
      mechanic: "fill_blank",
      prompt: "Complete the sentence:",
      sentence: "God loves you not because of what you've [BLANK], but because you [BLANK].",
      blanks: [
        { options:["done","earned","believed","achieved"], correct:"done" },
        { options:["exist","pray","try","hope"], correct:"exist" },
      ],
      feedback: "God's love precedes everything you could ever do. This is what makes Christianity radical: every other religion is built on earning divine favor. The Gospel begins by overturning that logic entirely.",
    },
    {
      id: 2,
      sectionTitle: "Something broke.",
      teaching: "From the very beginning, human beings chose themselves over God — and that one choice fractured everything: our relationship with God, with each other, and with ourselves. The Church calls this Original Sin. We inherit its effects not as personal guilt for Adam's act, but as a wounded nature — a tendency toward selfishness we did not choose, but feel in every moment of our lives.",
      ccc: "CCC 385–390",
      mechanic: "multiple_choice",
      prompt: "What is the Church's name for the original human choice that fractured humanity's relationship with God?",
      options: ["The Great Rebellion","Original Sin","The Primal Fall","The First Mistake"],
      correct: "Original Sin",
      feedback: "Original Sin explains what otherwise makes no sense: why the world is the way it is. Not merely bad choices, but a wounded human nature inherited at birth. This is the problem the entire Gospel is the answer to.",
    },
    {
      id: 3,
      sectionTitle: "God never gave up.",
      teaching: "The Old Testament is not a detour before the 'real' story. It is the story of God — over thousands of years, through Abraham, Moses, David, and the prophets — relentlessly pursuing the humanity that walked away. Every covenant was a step closer. Every promise pointed forward. God was preparing the world for one Person.",
      ccc: "CCC 56–64",
      mechanic: "true_false",
      statement: "After humanity fell, God abandoned them and only later changed his plan.",
      correct: false,
      feedback: "God never abandoned the pursuit. The Old Testament is not evidence of God's plan B — it is his plan A unfolding exactly as he intended. From Genesis 3:15 onward, the promise of a Redeemer was already made.",
    },
    {
      id: 4,
      sectionTitle: "Jesus Christ: God became man.",
      teaching: "Jesus Christ is not a great moral teacher or a spiritual hero. He is God — the Second Person of the Trinity — who entered human history in a body, lived without sin, took our death upon himself, and rose from the dead. The resurrection is not a metaphor for hope. It is a historical event. Paul wrote: 'If Christ has not been raised, your faith is futile.' The disciples touched him, ate with him, and then died rather than deny it.",
      ccc: "CCC 638–644; 1 Cor 15:17",
      mechanic: "tap_correct",
      prompt: "According to the Catholic faith, the resurrection of Jesus is best described as:",
      options: [
        "A powerful metaphor for hope",
        "A spiritual experience of the disciples",
        "An actual historical event in time",
        "A symbol of new beginnings",
      ],
      correct: "An actual historical event in time",
      feedback: "The resurrection stands or falls as history. The Church does not hedge here. The disciples were not confused or hallucinating — they were executed for testifying to what they had seen with their own eyes.",
    },
    {
      id: 5,
      sectionTitle: "Now it's your move.",
      teaching: "The Kerygma — this basic proclamation — ends not with information but with an invitation. You can respond to what Christ has done. Faith, repentance, baptism, receiving the Holy Spirit. This is not the conclusion of the story. It is the beginning. Everything else in Catholic faith — every doctrine, every sacrament, every prayer — is either the explanation or the application of what you just learned.",
      ccc: "CCC 422–429; Acts 2:38",
      mechanic: "sequence",
      prompt: "Arrange the four movements of the Kerygma in order. Tap each in sequence:",
      words: ["Sin broke it","You can respond","God made you","Christ restored it"],
      correct: ["God made you","Sin broke it","Christ restored it","You can respond"],
      feedback: "That is the whole Gospel in four movements. Keep them in order — each only makes sense in light of what came before. This sequence is the spine of everything Behold will teach you.",
    },
  ],
};

// ── PATH DATA ────────────────────────────────────────────────────
const PATH = [
  { id:"K0",  label:"The Kerygma",     chapter:"Entry", color:C.gold,   status:"available" },
  { id:"A1",  label:"Who Is God?",      chapter:"Tier 1",color:C.sky,   status:"locked" },
  { id:"A2",  label:"The Holy Trinity", chapter:"Tier 1",color:C.sky,   status:"locked" },
  { id:"P1a", label:"What Is Prayer?",  chapter:"Prayer",color:C.purple,status:"locked" },
  { id:"B1",  label:"Imago Dei",        chapter:"Tier 1",color:C.sky,   status:"locked" },
  { id:"B3",  label:"Sin & the Fall",   chapter:"Tier 1",color:C.sky,   status:"locked" },
  { id:"C1",  label:"The Incarnation",  chapter:"Tier 2",color:C.green, status:"locked" },
];

// ── HELPERS ──────────────────────────────────────────────────────
function canCheck(card, state) {
  if (card.mechanic === "fill_blank") return state.b0 && state.b1;
  if (card.mechanic === "sequence")   return state.seq.length === card.correct.length;
  return state.sel !== null;
}

function checkAnswer(card, state) {
  if (card.mechanic === "fill_blank")   return state.b0 === card.blanks[0].correct && state.b1 === card.blanks[1].correct;
  if (card.mechanic === "multiple_choice" || card.mechanic === "tap_correct") return state.sel === card.correct;
  if (card.mechanic === "true_false")   return state.sel === card.correct;
  if (card.mechanic === "sequence")     return JSON.stringify(state.seq) === JSON.stringify(card.correct);
  return false;
}

// ── MAIN COMPONENT ───────────────────────────────────────────────
export default function BeholdLesson() {
  const [screen, setScreen] = useState("path"); // path | intro | lesson | complete
  const [cardIdx, setCardIdx] = useState(0);
  const [phase, setPhase] = useState("read");    // read | answer | feedback
  const [hearts, setHearts] = useState(3);
  const [xp, setXp] = useState(0);
  const [correct, setCorrect] = useState(null);
  // Per-card answer state
  const [sel, setSel] = useState(null);
  const [b0, setB0] = useState(null);
  const [b1, setB1] = useState(null);
  const [seq, setSeq] = useState([]);

  const card = LESSON.cards[cardIdx];
  const answerState = { sel, b0, b1, seq };

  const resetCard = () => { setSel(null); setB0(null); setB1(null); setSeq([]); setCorrect(null); };

  const handleCheck = () => {
    const ok = checkAnswer(card, answerState);
    setCorrect(ok);
    if (!ok) setHearts(h => Math.max(0, h - 1));
    else setXp(x => x + 20);
    setPhase("feedback");
  };

  const handleNext = () => {
    if (cardIdx < LESSON.cards.length - 1) {
      setCardIdx(i => i + 1);
      setPhase("read");
      resetCard();
    } else {
      setScreen("complete");
    }
  };

  const restart = () => {
    setScreen("path"); setCardIdx(0); setPhase("read");
    setHearts(3); setXp(0); resetCard();
  };

  const GLOBAL_STYLES = `
    @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:ital,wght@0,400;0,700;1,400;1,600&family=Nunito:wght@400;600;700;800;900&display=swap');
    * { box-sizing:border-box; margin:0; padding:0; }
    button { cursor:pointer; font-family:'Nunito',sans-serif; border:none; }
    .press { transition:transform 0.1s; }
    .press:hover { transform:translateY(-2px); }
    .press:active { transform:scale(0.97); }
    @keyframes fadeUp { from{opacity:0;transform:translateY(14px)} to{opacity:1;transform:translateY(0)} }
    @keyframes pop { 0%,100%{transform:scale(1)} 45%{transform:scale(1.06)} }
    @keyframes glow { 0%,100%{box-shadow:0 0 0 6px rgba(14,165,233,0.3),0 8px 32px rgba(0,0,0,0.25)} 50%{box-shadow:0 0 0 12px rgba(14,165,233,0.15),0 8px 32px rgba(0,0,0,0.3)} }
    @keyframes goldGlow { 0%,100%{box-shadow:0 0 0 6px rgba(245,158,11,0.35),0 8px 32px rgba(0,0,0,0.25)} 50%{box-shadow:0 0 0 14px rgba(245,158,11,0.15),0 8px 32px rgba(0,0,0,0.3)} }
    .anim-fadeup { animation:fadeUp 0.35s ease forwards; }
    .anim-pop { animation:pop 0.4s ease; }
    .node-glow { animation:glow 2.4s ease-in-out infinite; }
    .node-gold-glow { animation:goldGlow 2.4s ease-in-out infinite; }
  `;

  // ─ PATH SCREEN ─────────────────────────────────────────────────
  if (screen === "path") return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:`linear-gradient(180deg, ${C.skyDeep} 0%, ${C.skyDark} 50%, ${C.sky} 100%)`, minHeight:"100vh", padding:"0 0 60px" }}>
      <style>{GLOBAL_STYLES}</style>

      {/* Header */}
      <div style={{ padding:"28px 24px 20px", textAlign:"center" }}>
        <div style={{ display:"inline-flex", alignItems:"center", gap:10, marginBottom:4 }}>
          <Leo size={32} />
          <span style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:"white" }}>Behold</span>
        </div>
        <p style={{ fontSize:11, color:"rgba(255,255,255,0.6)", letterSpacing:"0.08em" }}>Your journey</p>
      </div>

      {/* Stats row */}
      <div style={{ margin:"0 20px 28px", background:"rgba(255,255,255,0.1)", backdropFilter:"blur(8px)", borderRadius:16, padding:"12px 20px", display:"flex", justifyContent:"space-around" }}>
        {[
          { val:"0", label:"Day streak", icon:<FlameIcon size={16} color="#F59E0B"/> },
          { val:"0", label:"XP today",   icon:<StarIcon size={16} color="#FCD34D"/> },
          { val:"3", label:"Hearts",     icon:<HeartIcon size={16} color="#F87171"/> },
        ].map(s => (
          <div key={s.label} style={{ textAlign:"center" }}>
            <div style={{ display:"flex", alignItems:"center", justifyContent:"center", gap:4, marginBottom:2 }}>
              {s.icon}
              <span style={{ fontFamily:"'Playfair Display',serif", fontSize:18, fontWeight:700, color:"white" }}>{s.val}</span>
            </div>
            <div style={{ fontSize:9, fontWeight:800, color:"rgba(255,255,255,0.5)", textTransform:"uppercase", letterSpacing:"0.1em" }}>{s.label}</div>
          </div>
        ))}
      </div>

      {/* Section label */}
      <div style={{ textAlign:"center", marginBottom:20 }}>
        <div style={{ display:"inline-block", background:"rgba(255,255,255,0.15)", borderRadius:20, padding:"6px 16px", fontSize:11, fontWeight:800, color:"rgba(255,255,255,0.8)", letterSpacing:"0.1em", textTransform:"uppercase" }}>
          Section I — The Foundation
        </div>
      </div>

      {/* Path nodes */}
      <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:0, padding:"0 20px" }}>
        {PATH.map((node, i) => {
          const avail = node.status === "available";
          const isLeft = i % 2 === 0;
          const chapterColors = {
            "Entry": { ring:C.gold, glow:"rgba(245,158,11,0.4)", nodeClass:"node-gold-glow" },
            "Tier 1":{ ring:C.sky,  glow:"rgba(14,165,233,0.3)", nodeClass:"node-glow" },
            "Tier 2":{ ring:C.green,glow:"rgba(16,185,129,0.3)", nodeClass:"" },
            "Prayer":{ ring:C.purple,glow:"rgba(139,92,246,0.3)",nodeClass:"" },
          };
          const cc = chapterColors[node.chapter] || chapterColors["Tier 1"];

          return (
            <div key={node.id} style={{ width:"100%", maxWidth:340 }}>
              {/* Connecting line */}
              {i > 0 && (
                <div style={{ display:"flex", justifyContent: isLeft ? "flex-start" : "flex-end", paddingLeft: isLeft ? 60 : 0, paddingRight: isLeft ? 0 : 60 }}>
                  <div style={{ width:3, height:28, background:"rgba(255,255,255,0.18)", borderRadius:2 }}/>
                </div>
              )}
              {/* Node row */}
              <div style={{ display:"flex", alignItems:"center", gap:12, flexDirection: isLeft ? "row" : "row-reverse" }}>
                {/* Node */}
                <button
                  onClick={() => avail && setScreen("intro")}
                  className={avail ? cc.nodeClass : ""}
                  style={{
                    width:76, height:76, borderRadius:"50%", flexShrink:0,
                    background: avail ? "white" : "rgba(255,255,255,0.1)",
                    border:`3px solid ${avail ? cc.ring : "rgba(255,255,255,0.2)"}`,
                    display:"flex", alignItems:"center", justifyContent:"center",
                    cursor: avail ? "pointer" : "default",
                    transition:"transform 0.15s",
                    position:"relative",
                  }}>
                  {avail
                    ? <Leo size={50} />
                    : <LockIcon size={24} color="rgba(255,255,255,0.35)"/>
                  }
                  {avail && (
                    <div style={{ position:"absolute", top:-6, right:-6, background:C.gold, borderRadius:"50%", width:22, height:22, display:"flex", alignItems:"center", justifyContent:"center" }}>
                      <StarIcon size={12} color="white"/>
                    </div>
                  )}
                </button>

                {/* Label */}
                <div style={{ textAlign: isLeft ? "left" : "right", flex:1 }}>
                  <div style={{ fontSize:9, fontWeight:900, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.12em", marginBottom:3 }}>
                    {node.chapter} · {node.id}
                  </div>
                  <div style={{ fontSize:14, fontWeight:800, color: avail ? "white" : "rgba(255,255,255,0.35)", lineHeight:1.2 }}>
                    {node.label}
                  </div>
                  {avail
                    ? <div style={{ fontSize:11, color:"rgba(255,255,255,0.65)", marginTop:3 }}>Tap to begin</div>
                    : <div style={{ fontSize:11, color:"rgba(255,255,255,0.25)", marginTop:3 }}>Complete previous lesson</div>
                  }
                </div>
              </div>
            </div>
          );
        })}

        {/* More ahead */}
        <div style={{ marginTop:32, textAlign:"center" }}>
          <div style={{ display:"flex", justifyContent:"center", marginBottom:8 }}>
            <div style={{ width:3, height:24, background:"rgba(255,255,255,0.15)", borderRadius:2 }}/>
          </div>
          <div style={{ display:"inline-block", background:"rgba(255,255,255,0.08)", borderRadius:12, padding:"8px 20px" }}>
            <p style={{ fontSize:11, color:"rgba(255,255,255,0.35)", fontFamily:"'Playfair Display',serif", fontStyle:"italic" }}>More awaits…</p>
          </div>
        </div>
      </div>
    </div>
  );

  // ─ INTRO SCREEN ────────────────────────────────────────────────
  if (screen === "intro") return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:`linear-gradient(160deg, ${C.skyDeep} 0%, ${C.skyDark} 100%)`, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px" }}>
      <style>{GLOBAL_STYLES}</style>
      <div className="anim-fadeup" style={{ textAlign:"center", maxWidth:360, width:"100%" }}>
        <Leo size={88} state="happy"/>
        <div style={{ background:"rgba(255,255,255,0.1)", borderRadius:10, padding:"4px 14px", display:"inline-block", margin:"16px 0 8px", fontSize:10, fontWeight:900, color:"rgba(255,255,255,0.6)", letterSpacing:"0.18em", textTransform:"uppercase" }}>
          {LESSON.tier}
        </div>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:28, fontWeight:700, color:"white", marginBottom:6 }}>
          {LESSON.title}
        </h1>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.65)", fontFamily:"'Playfair Display',serif", fontStyle:"italic", marginBottom:24 }}>
          {LESSON.subtitle}
        </p>

        {/* Lesson breakdown */}
        <div style={{ background:"rgba(255,255,255,0.08)", borderRadius:16, padding:"16px 18px", marginBottom:28, textAlign:"left" }}>
          <div style={{ fontSize:10, fontWeight:900, color:"rgba(255,255,255,0.4)", textTransform:"uppercase", letterSpacing:"0.15em", marginBottom:10 }}>This lesson</div>
          <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
            {[
              ["5 teaching sections","Read a short truth, then prove you got it"],
              ["5 active recall questions","Fill blanks · multiple choice · true/false · sequence"],
              ["Immediate feedback","With sources from the CCC and Doctors of the Church"],
              ["+100 XP on completion","Plus bonus for no mistakes"],
            ].map(([title, desc]) => (
              <div key={title} style={{ display:"flex", gap:10, alignItems:"flex-start" }}>
                <div style={{ width:18, height:18, borderRadius:"50%", background:C.green, display:"flex", alignItems:"center", justifyContent:"center", flexShrink:0, marginTop:1 }}>
                  <CheckIcon size={10} color="white"/>
                </div>
                <div>
                  <div style={{ fontSize:12, fontWeight:800, color:"rgba(255,255,255,0.9)" }}>{title}</div>
                  <div style={{ fontSize:11, color:"rgba(255,255,255,0.45)" }}>{desc}</div>
                </div>
              </div>
            ))}
          </div>
        </div>

        <button className="press"
          onClick={() => { setScreen("lesson"); setPhase("read"); }}
          style={{ width:"100%", background:"white", color:C.skyDark, borderRadius:14, padding:"16px", fontSize:15, fontWeight:900, boxShadow:"0 8px 32px rgba(0,0,0,0.25)" }}>
          Start lesson →
        </button>
        <button onClick={() => setScreen("path")}
          style={{ background:"none", color:"rgba(255,255,255,0.4)", fontSize:12, marginTop:12, padding:8 }}>
          ← Back to path
        </button>
      </div>
    </div>
  );

  // ─ LESSON SCREEN ───────────────────────────────────────────────
  if (screen === "lesson") return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:C.bg, minHeight:"100vh", display:"flex", flexDirection:"column", maxWidth:520, margin:"0 auto" }}>
      <style>{GLOBAL_STYLES}</style>

      {/* Top bar */}
      <div style={{ padding:"12px 16px", background:"white", borderBottom:`2px solid ${C.skyLight}`, display:"flex", alignItems:"center", gap:12, position:"sticky", top:0, zIndex:20 }}>
        <button onClick={() => setScreen("path")} style={{ background:"none", color:C.muted, fontSize:20, lineHeight:1, padding:"0 4px" }}>←</button>
        <div style={{ flex:1, height:10, background:C.skyLight, borderRadius:5, overflow:"hidden" }}>
          <div style={{ height:"100%", width:`${(cardIdx / LESSON.cards.length) * 100}%`, background:`linear-gradient(90deg, ${C.sky}, #38BDF8)`, borderRadius:5, transition:"width 0.5s cubic-bezier(.4,0,.2,1)" }}/>
        </div>
        <div style={{ display:"flex", gap:5 }}>
          {[0,1,2].map(i => <HeartIcon key={i} size={18} color={i < hearts ? "#EF4444" : "#E2E8F0"}/>)}
        </div>
      </div>

      {/* Content area */}
      <div style={{ flex:1, padding:"20px 18px 120px", display:"flex", flexDirection:"column", gap:16 }}>

        {/* Card counter */}
        <div style={{ fontSize:10, fontWeight:900, letterSpacing:"0.18em", textTransform:"uppercase", color:C.sky }}>
          Card {cardIdx + 1} of {LESSON.cards.length} · {LESSON.title}
        </div>

        {/* Teaching card */}
        <div className="anim-fadeup" style={{ background:"white", borderRadius:18, padding:"20px 18px", border:`2px solid ${C.skyLight}`, boxShadow:`0 4px 20px rgba(14,165,233,0.1)` }}>
          <div style={{ display:"flex", gap:14, alignItems:"flex-start" }}>
            <div style={{ flexShrink:0 }}>
              <Leo size={46} />
            </div>
            <div>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:16, fontWeight:700, color:C.text, marginBottom:8, lineHeight:1.3 }}>
                {card.sectionTitle}
              </div>
              <p style={{ fontSize:13, lineHeight:1.8, color:"#334155" }}>
                {card.teaching}
              </p>
              <div style={{ marginTop:10, fontSize:9, fontWeight:800, color:C.sky, letterSpacing:"0.08em" }}>{card.ccc}</div>
            </div>
          </div>
        </div>

        {/* Recall section — appears after "Got it" */}
        {phase !== "read" && (
          <div className="anim-fadeup">
            <div style={{ display:"flex", alignItems:"center", gap:8, marginBottom:12 }}>
              <div style={{ height:2, flex:1, background:C.skyLight }}/>
              <div style={{ fontSize:10, fontWeight:900, color:C.sky, letterSpacing:"0.15em", textTransform:"uppercase" }}>Now recall</div>
              <div style={{ height:2, flex:1, background:C.skyLight }}/>
            </div>

            <p style={{ fontFamily:"'Playfair Display',serif", fontSize:15, fontWeight:600, color:C.text, marginBottom:14, lineHeight:1.5 }}>
              {card.prompt || card.statement}
            </p>

            {/* ── MECHANICS ── */}
            {card.mechanic === "fill_blank" && (
              <FillBlank card={card} b0={b0} b1={b1} setB0={setB0} setB1={setB1} disabled={phase==="feedback"} correct={correct}/>
            )}
            {card.mechanic === "multiple_choice" && (
              <OptionList options={card.options} correct={card.correct} sel={sel} setSel={setSel} disabled={phase==="feedback"}/>
            )}
            {card.mechanic === "tap_correct" && (
              <OptionList options={card.options} correct={card.correct} sel={sel} setSel={setSel} disabled={phase==="feedback"}/>
            )}
            {card.mechanic === "true_false" && (
              <TrueFalse card={card} sel={sel} setSel={setSel} disabled={phase==="feedback"} correct={correct}/>
            )}
            {card.mechanic === "sequence" && (
              <Sequence card={card} seq={seq} setSeq={setSeq} disabled={phase==="feedback"} correct={correct}/>
            )}

            {/* Feedback block */}
            {phase === "feedback" && (
              <div className="anim-pop" style={{
                marginTop:16, borderRadius:14, padding:"14px 16px",
                background: correct ? C.greenLight : C.redLight,
                border: `2px solid ${correct ? C.green : C.red}`,
              }}>
                <div style={{ fontWeight:900, fontSize:12, color: correct ? "#166534" : "#991B1B", marginBottom:5, display:"flex", alignItems:"center", gap:6 }}>
                  {correct ? <CheckIcon size={14} color="#166534"/> : <XIcon size={14} color="#991B1B"/>}
                  {correct ? "That's right." : "Not quite —"}
                </div>
                <p style={{ fontSize:12.5, lineHeight:1.75, color: correct ? "#14532D" : "#7F1D1D", fontFamily:"'Playfair Display',serif", fontStyle:"italic" }}>
                  {card.feedback}
                </p>
                <div style={{ marginTop:6, fontSize:9, fontWeight:800, color: correct ? C.green : C.red, opacity:0.75 }}>
                  {card.ccc}
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* Bottom button */}
      <div style={{ position:"fixed", bottom:0, left:"50%", transform:"translateX(-50%)", width:"100%", maxWidth:520, background:"white", borderTop:`2px solid ${C.skyLight}`, padding:"12px 18px 24px" }}>
        {phase === "read" ? (
          <button className="press" onClick={() => setPhase("answer")}
            style={{ width:"100%", background:C.sky, color:"white", borderRadius:14, padding:"15px", fontSize:15, fontWeight:900, boxShadow:`0 6px 20px rgba(14,165,233,0.45)` }}>
            I've read this — test me
          </button>
        ) : phase === "answer" ? (
          <button className="press" onClick={handleCheck}
            disabled={!canCheck(card, answerState)}
            style={{ width:"100%", borderRadius:14, padding:"15px", fontSize:15, fontWeight:900, transition:"all 0.2s",
              background: canCheck(card, answerState) ? C.sky : C.skyLight,
              color: canCheck(card, answerState) ? "white" : C.faint,
              boxShadow: canCheck(card, answerState) ? `0 6px 20px rgba(14,165,233,0.45)` : "none",
              cursor: canCheck(card, answerState) ? "pointer" : "default",
            }}>
            Check answer
          </button>
        ) : (
          <button className="press" onClick={handleNext}
            style={{ width:"100%", background: correct ? C.green : C.sky, color:"white", borderRadius:14, padding:"15px", fontSize:15, fontWeight:900, boxShadow:`0 6px 20px ${correct ? "rgba(16,185,129,0.45)" : "rgba(14,165,233,0.45)"}` }}>
            {cardIdx < LESSON.cards.length - 1 ? "Next card →" : "Finish lesson →"}
          </button>
        )}
      </div>
    </div>
  );

  // ─ COMPLETE SCREEN ─────────────────────────────────────────────
  return (
    <div style={{ fontFamily:"'Nunito',sans-serif", background:`linear-gradient(160deg, ${C.skyDeep} 0%, ${C.skyDark} 100%)`, minHeight:"100vh", display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", padding:"32px 24px" }}>
      <style>{GLOBAL_STYLES}</style>
      <div className="anim-fadeup" style={{ textAlign:"center", maxWidth:340, width:"100%" }}>
        <Leo size={100} state="celebrating"/>
        <h1 style={{ fontFamily:"'Playfair Display',serif", fontSize:30, fontWeight:700, color:"white", margin:"18px 0 6px" }}>
          Lesson complete!
        </h1>
        <p style={{ fontSize:13, color:"rgba(255,255,255,0.65)", fontFamily:"'Playfair Display',serif", fontStyle:"italic", marginBottom:28 }}>
          You've proclaimed the Kerygma.
        </p>

        <div style={{ display:"flex", gap:12, justifyContent:"center", marginBottom:32 }}>
          {[
            { label:"XP earned", value: xp + (hearts === 3 ? 25 : 0) + 100, color:C.gold },
            { label:"Hearts",    value: hearts, color:"#F87171" },
            { label:"Streak",    value:"1 day",  color:C.green },
          ].map(s => (
            <div key={s.label} style={{ background:"rgba(255,255,255,0.1)", borderRadius:14, padding:"14px 16px", minWidth:90 }}>
              <div style={{ fontFamily:"'Playfair Display',serif", fontSize:22, fontWeight:700, color:s.color }}>{s.value}</div>
              <div style={{ fontSize:9, fontWeight:800, color:"rgba(255,255,255,0.45)", textTransform:"uppercase", letterSpacing:"0.1em", marginTop:3 }}>{s.label}</div>
            </div>
          ))}
        </div>

        {hearts === 3 && (
          <div style={{ background:"rgba(245,158,11,0.2)", border:"1.5px solid rgba(245,158,11,0.5)", borderRadius:12, padding:"10px 14px", marginBottom:20, fontSize:12, fontWeight:800, color:"#FCD34D" }}>
            Perfect score — +25 bonus XP
          </div>
        )}

        <button className="press" onClick={restart}
          style={{ width:"100%", background:"white", color:C.skyDark, borderRadius:14, padding:"15px", fontSize:15, fontWeight:900, boxShadow:"0 8px 32px rgba(0,0,0,0.25)", marginBottom:10 }}>
          Back to path →
        </button>
      </div>
    </div>
  );
}

// ── MECHANIC COMPONENTS ──────────────────────────────────────────

function FillBlank({ card, b0, b1, setB0, setB1, disabled, correct }) {
  const parts = card.sentence.split("[BLANK]");
  return (
    <div>
      {/* Sentence display */}
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:15, lineHeight:2.1, color:C.text, marginBottom:16 }}>
        {parts[0]}
        <BlankSlot val={b0} color={disabled ? (b0 === card.blanks[0].correct ? C.green : C.red) : C.sky}/>
        {parts[1]}
        <BlankSlot val={b1} color={disabled ? (b1 === card.blanks[1].correct ? C.green : C.red) : C.sky}/>
        {parts[2]}
      </div>
      {/* Option banks */}
      {card.blanks.map((blank, bi) => {
        const curr = bi === 0 ? b0 : b1;
        const set = bi === 0 ? setB0 : setB1;
        return (
          <div key={bi} style={{ marginBottom:10 }}>
            <div style={{ fontSize:9, fontWeight:900, color:C.muted, textTransform:"uppercase", letterSpacing:"0.1em", marginBottom:6 }}>Blank {bi+1}</div>
            <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
              {blank.options.map(opt => {
                const isSel = curr === opt;
                const showCorrect = disabled && opt === blank.correct;
                const showWrong = disabled && isSel && opt !== blank.correct;
                return (
                  <button key={opt} className={disabled ? "" : "press"}
                    disabled={disabled} onClick={() => set(opt)}
                    style={{ padding:"9px 16px", borderRadius:10, fontSize:13, fontWeight:700, transition:"all 0.12s",
                      border:`2px solid ${showCorrect ? C.green : showWrong ? C.red : isSel ? C.sky : "#E2E8F0"}`,
                      background: showCorrect ? C.greenLight : showWrong ? C.redLight : isSel ? C.skyPale : "white",
                      color: showCorrect ? "#166534" : showWrong ? "#991B1B" : isSel ? C.skyDark : C.muted,
                    }}>
                    {opt}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}

function BlankSlot({ val, color }) {
  return (
    <span style={{ display:"inline-block", minWidth:68, borderBottom:`2.5px solid ${color}`, padding:"0 6px", marginBottom:2, textAlign:"center", color, fontWeight:800, verticalAlign:"bottom" }}>
      {val || "\u00A0\u00A0\u00A0\u00A0\u00A0"}
    </span>
  );
}

function OptionList({ options, correct, sel, setSel, disabled }) {
  return (
    <div style={{ display:"flex", flexDirection:"column", gap:8 }}>
      {options.map(opt => {
        const isSel = sel === opt;
        const showCorrect = disabled && opt === correct;
        const showWrong = disabled && isSel && opt !== correct;
        return (
          <button key={opt} className={disabled ? "" : "press"}
            disabled={disabled} onClick={() => setSel(opt)}
            style={{ padding:"13px 16px", borderRadius:12, fontSize:13, fontWeight:700, textAlign:"left", transition:"all 0.12s",
              border:`2px solid ${showCorrect ? C.green : showWrong ? C.red : isSel ? C.sky : "#E2E8F0"}`,
              background: showCorrect ? C.greenLight : showWrong ? C.redLight : isSel ? C.skyPale : "white",
              color: showCorrect ? "#166534" : showWrong ? "#991B1B" : isSel ? C.skyDark : C.text,
              boxShadow: isSel && !disabled ? `0 2px 10px rgba(14,165,233,0.2)` : "0 1px 3px rgba(0,0,0,0.05)",
            }}>
            {opt}
          </button>
        );
      })}
    </div>
  );
}

function TrueFalse({ card, sel, setSel, disabled, correct }) {
  return (
    <div>
      <div style={{ fontFamily:"'Playfair Display',serif", fontSize:14, color:C.text, background:C.skyPale, padding:"12px 16px", borderRadius:12, border:`1.5px solid ${C.skyLight}`, marginBottom:14, lineHeight:1.65 }}>
        "{card.statement}"
      </div>
      <div style={{ display:"flex", gap:10 }}>
        {[true,false].map(val => {
          const isSel = sel === val;
          const showCorrect = disabled && val === card.correct;
          const showWrong = disabled && isSel && val !== card.correct;
          return (
            <button key={String(val)} className={disabled ? "" : "press"}
              disabled={disabled} onClick={() => setSel(val)}
              style={{ flex:1, padding:"14px", borderRadius:12, fontSize:14, fontWeight:900, transition:"all 0.12s",
                border:`2px solid ${showCorrect ? C.green : showWrong ? C.red : isSel ? C.sky : "#E2E8F0"}`,
                background: showCorrect ? C.greenLight : showWrong ? C.redLight : isSel ? C.skyPale : "white",
                color: showCorrect ? "#166534" : showWrong ? "#991B1B" : isSel ? C.skyDark : C.text,
              }}>
              {val ? "True" : "False"}
            </button>
          );
        })}
      </div>
    </div>
  );
}

function Sequence({ card, seq, setSeq, disabled, correct }) {
  const remaining = card.words.filter(w => !seq.includes(w));
  return (
    <div>
      {/* Slots */}
      <div style={{ display:"flex", flexDirection:"column", gap:6, marginBottom:14 }}>
        {card.correct.map((_, i) => {
          const filled = seq[i];
          const showCorrect = disabled && filled === card.correct[i];
          const showWrong = disabled && filled && filled !== card.correct[i];
          return (
            <div key={i}
              onClick={() => { if (!disabled && filled) setSeq(s => s.filter((_,j) => j !== i)); }}
              style={{ display:"flex", alignItems:"center", gap:10, padding:"10px 14px", borderRadius:11, minHeight:44, transition:"all 0.12s", cursor:(!disabled && filled) ? "pointer" : "default",
                border:`2px dashed ${filled ? (showCorrect ? C.green : showWrong ? C.red : C.sky) : "#CBD5E1"}`,
                background: showCorrect ? C.greenLight : showWrong ? C.redLight : filled ? C.skyPale : "#F8FAFC",
                color: showCorrect ? "#166534" : showWrong ? "#991B1B" : filled ? C.skyDark : C.faint,
              }}>
              <span style={{ fontSize:10, fontWeight:900, color:C.faint, opacity:0.6, width:14 }}>{i+1}.</span>
              <span style={{ fontSize:13, fontWeight:700 }}>
                {filled || <span style={{ fontStyle:"italic", fontFamily:"'Playfair Display',serif" }}>tap below to place</span>}
              </span>
            </div>
          );
        })}
      </div>
      {/* Word bank */}
      {!disabled && (
        <div style={{ display:"flex", gap:8, flexWrap:"wrap" }}>
          {remaining.map(word => (
            <button key={word} className="press"
              onClick={() => { if (seq.length < card.correct.length) setSeq(s => [...s, word]); }}
              style={{ padding:"9px 14px", borderRadius:10, border:`2px solid ${C.sky}`, background:C.skyPale, color:C.skyDark, fontSize:13, fontWeight:700 }}>
              {word}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}

// ── ICON COMPONENTS ──────────────────────────────────────────────
function FlameIcon({ size=20, color="#F59E0B" }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 2C10 2 13 5.5 12.5 9C14.5 7 14.5 4.5 14.5 4.5C14.5 4.5 17 7.5 16.5 11.5C16 15 13 17.5 10 17.5C7 17.5 4 15 3.5 11.5C3 7.5 5.5 4.5 5.5 4.5C5.5 4.5 5.5 7 7.5 9C7 5.5 10 2 10 2Z" fill={color}/>
    <path d="M10 11C10 11 11.5 12.5 11 14.5C12 13.5 12 11.5 12 11.5C12 11.5 13.5 13 13 15C12.5 16.5 11.5 17.5 10 17.5C8.5 17.5 7.5 16.5 7 15C6.5 13 8 11.5 8 11.5C8 11.5 8 13.5 9 14.5C8.5 12.5 10 11 10 11Z" fill="#D97706"/>
  </svg>;
}
function StarIcon({ size=20, color="#FCD34D" }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 2L12.4 7.5H18L13.5 11.2L15.5 17L10 13.5L4.5 17L6.5 11.2L2 7.5H7.6Z" fill={color}/>
  </svg>;
}
function HeartIcon({ size=20, color="#EF4444" }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <path d="M10 16C10 16 3 11.5 3 6.5C3 4.5 4.5 3 6.5 3C7.8 3 9 3.8 10 5C11 3.8 12.2 3 13.5 3C15.5 3 17 4.5 17 6.5C17 11.5 10 16 10 16Z" fill={color}/>
  </svg>;
}
function LockIcon({ size=20, color="#94A3B8" }) {
  return <svg width={size} height={size} viewBox="0 0 20 20" fill="none">
    <rect x="4" y="9" width="12" height="9" rx="2" fill={color} opacity="0.5"/>
    <path d="M6.5 9V6.5C6.5 4.5 8 3 10 3C12 3 13.5 4.5 13.5 6.5V9" stroke={color} strokeWidth="1.8" fill="none" strokeLinecap="round"/>
    <circle cx="10" cy="13.5" r="1.5" fill={color}/>
  </svg>;
}
function CheckIcon({ size=14, color="#10B981" }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M2 7L5.5 10.5L12 4" stroke={color} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
  </svg>;
}
function XIcon({ size=14, color="#EF4444" }) {
  return <svg width={size} height={size} viewBox="0 0 14 14" fill="none">
    <path d="M3 3L11 11M11 3L3 11" stroke={color} strokeWidth="2" strokeLinecap="round"/>
  </svg>;
}
