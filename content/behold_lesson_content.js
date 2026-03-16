// behold_lesson_content.js
// ─────────────────────────────────────────────────────────────────────────────
// BEHOLD — Complete Lesson Content Data
// This file is the single source of truth for all lesson content.
// It is designed to be imported directly by the Next.js app.
// It also serves as the context file passed to Claude when generating new lessons.
//
// STRUCTURE:
//   Each lesson follows the LESSON_SCHEMA exactly.
//   Teaching sections interleave with recall cards (active recall, not flashcards).
//   5 teaching+recall cards per lesson.
//   1 prayer per lesson (except K0 which is doctrine only).
//
// CONTENT STATUS:
//   ● Full content: K0, A1, A2, B1, B2, B3 (Tier 1 — Foundation, Track A+B)
//   ● Full content: D1, D2 (Track D — Scripture, partial)
//   ● Structured outline: All remaining lessons (C1–L4)
//
// ─────────────────────────────────────────────────────────────────────────────

// LESSON SCHEMA (reference for generation)
// {
//   id: string,                  // e.g. "A1"
//   title: string,               // e.g. "Who Is God?"
//   subtitle: string,            // 1 italic line shown on intro screen
//   tier: string,                // "Entry" | "Foundation" | "Encounter" | "Church" | "Moral" | "Depth"
//   tierColor: string,           // hex
//   track: string,               // e.g. "A — God & the Trinity"
//   prereqs: string[],           // lesson IDs
//   ccc_primary: string,         // e.g. "CCC 198–231"
//   doctors: string,             // quoted sources
//   totalXP: number,             // always 100
//   prayer: {                    // daily prayer for this lesson
//     title: string,
//     text: string[],            // line-by-line for guided recitation
//     source: string,
//     note: string,              // brief theological note
//   },
//   cards: [                     // exactly 5 cards
//     {
//       id: number,              // 1–5
//       sectionTitle: string,    // "God made you."
//       teaching: string,        // 2–5 sentences. Dense but accessible.
//       ccc: string,             // specific paragraph reference
//       mechanic: string,        // fill_blank | multiple_choice | true_false | tap_correct | sequence | matching
//       // mechanic-specific fields (see examples below)
//       feedback: string,        // 2–4 sentences. THE most important field. Teaches deeper than the teaching text.
//     }
//   ]
// }

export const LESSONS = {

  // ═══════════════════════════════════════════════════════════════
  // ENTRY POINT
  // ═══════════════════════════════════════════════════════════════

  K0: {
    id: "K0",
    title: "The Kerygma",
    subtitle: "Where everything begins",
    tier: "Entry",
    tierColor: "#F59E0B",
    track: "Entry Point",
    prereqs: [],
    ccc_primary: "CCC 422–429",
    doctors: "Chrysostom, Homilies on Acts II; Paul VI, Evangelii Nuntiandi §22; Benedict XVI, Verbum Domini §93",
    totalXP: 100,
    status: "complete",
    prayer: null, // Entry lesson — prayer introduced in P1a
    cards: [
      {
        id: 1,
        sectionTitle: "God made you.",
        teaching: "Before all theology, before doctrine or prayer, comes one irreducible truth: God deliberately created you and he loves you completely — not because of what you have done, earned, or believed, but simply because you exist. You are not an accident. This is not sentiment. It is the foundation on which the entire Catholic faith rests.",
        ccc: "CCC 218–221",
        mechanic: "fill_blank",
        prompt: "Complete the sentence:",
        sentence: "God loves you not because of what you've [BLANK], but because you [BLANK].",
        wordBank: ["done","deserved","impressed him","exist","pray","try","hope"],
        blanks: [
          { correct: "done" },
          { correct: "exist" },
        ],
        feedback: "God's love precedes everything you could ever do. This is what makes Christianity radical — every other system is built on earning favor. The Gospel begins by overturning that logic entirely.",
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
        prompt: "True or false?",
        statement: "After humanity fell, God abandoned them and only later changed his plan.",
        correct: false,
        feedback: "God never abandoned the pursuit. From Genesis 3:15 — the 'Protoevangelium' — God already promised a Redeemer. The Old Testament is not evidence of plan B. It is plan A unfolding exactly as he intended.",
      },
      {
        id: 4,
        sectionTitle: "Jesus Christ: God became man.",
        teaching: "Jesus Christ is not a great moral teacher or a spiritual hero. He is God — the Second Person of the Trinity — who entered human history in a body, lived without sin, took our death upon himself, and rose from the dead. The resurrection is not a metaphor for hope. It is a historical event. Paul wrote: 'If Christ has not been raised, your faith is futile.' The disciples touched him, ate with him, and then died rather than deny it.",
        ccc: "CCC 638–644",
        mechanic: "tap_correct",
        prompt: "According to the Catholic faith, the resurrection of Jesus is best described as:",
        options: [
          "A powerful metaphor for hope",
          "A spiritual experience of the disciples",
          "An actual historical event in time",
          "A symbol of new beginnings",
        ],
        correct: "An actual historical event in time",
        feedback: "The resurrection stands or falls as history. The Church does not hedge here. The disciples were not confused — they were executed for testifying to what they had seen with their own eyes. Their transformed behavior is one of the strongest pieces of evidence.",
      },
      {
        id: 5,
        sectionTitle: "Now it's your move.",
        teaching: "The Kerygma ends not with information but with an invitation. You can respond to what Christ has done. Faith, repentance, baptism, receiving the Holy Spirit. This is not the conclusion of the story. It is the beginning. Everything in Catholic faith — every doctrine, sacrament, and prayer — is either the explanation or the application of what you just learned.",
        ccc: "CCC 422–429; Acts 2:38",
        mechanic: "sequence",
        prompt: "Arrange the four movements of the Kerygma in order:",
        words: ["Sin broke it","You can respond","God made you","Christ restored it"],
        correct: ["God made you","Sin broke it","Christ restored it","You can respond"],
        feedback: "That is the whole Gospel in four movements. Keep them in order — each makes sense only in light of what came before. This sequence is the spine of everything Behold will teach you.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TIER 1 — FOUNDATION
  // ═══════════════════════════════════════════════════════════════

  A1: {
    id: "A1",
    title: "Who Is God?",
    subtitle: "Not a concept — a Person who speaks",
    tier: "Foundation",
    tierColor: "#F59E0B",
    track: "A — God & the Trinity",
    prereqs: ["K0"],
    ccc_primary: "CCC 198–231",
    doctors: "Augustine, Confessions I.1; Aquinas, ST I Q.2–13; Anselm, Proslogion Ch. 2–4",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Act of Faith",
      text: [
        "O my God, I firmly believe",
        "that you are one God in three divine Persons,",
        "Father, Son, and Holy Spirit.",
        "I believe that your divine Son became man",
        "and died for our sins,",
        "and that he will come to judge the living and the dead.",
        "I believe these and all the truths",
        "which the holy Catholic Church teaches,",
        "because you have revealed them,",
        "who can neither deceive nor be deceived.",
      ],
      source: "Traditional Catholic prayer",
      note: "This prayer commits you to the basic content of what you are about to study. Pray it slowly. The words are precise.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "God is not an idea.",
        teaching: "The first thing to understand about God is what he is not. He is not a philosophical concept, a cosmic force, or the sum of human religious longing. He is a Person — specifically, a Person who revealed himself by name to Moses: 'I AM WHO AM' (Exodus 3:14). This name is not a riddle. It is the claim that God's existence is not derived from anything else. He simply IS. Everything else — including you — exists because God wills it.",
        ccc: "CCC 198–213",
        mechanic: "fill_blank",
        prompt: "Complete the sentence:",
        sentence: "When God revealed his name to Moses, he said: 'I [BLANK] WHO [BLANK].'",
        wordBank: ["AM", "WHO", "AM", "WAS", "WILL BE", "IS NOT"],
        blanks: [
          { correct: "AM" },
          { correct: "AM" },
        ],
        wordBank: ["AM", "WHO", "AM", "WAS", "WILL BE", "AM NOT"],
        feedback: "Yahweh — 'I AM WHO AM' — is the most philosophically dense thing God ever said. It means: God has no origin. He does not exist because something caused him. He is existence itself. Every creature exists by participation in his being; God exists by his own nature.",
      },
      {
        id: 2,
        sectionTitle: "What can reason tell us?",
        teaching: "The Catholic tradition insists that God's existence is knowable by reason alone, without revelation. Aquinas gave five arguments — the Five Ways — working from what we observe: motion requires a mover, effects require causes, contingent existence requires necessary existence, degrees of perfection require a maximum, and order requires an orderer. These are not proofs like mathematical proofs — they are demonstrations from evidence. The Church teaches that refusing to see them is not philosophy but a choice.",
        ccc: "CCC 31–36",
        mechanic: "multiple_choice",
        prompt: "According to the Catholic tradition, knowledge of God's existence is:",
        options: [
          "Possible only through faith and Scripture",
          "Accessible to reason without revelation",
          "Impossible — God is beyond all human knowing",
          "Only available to trained theologians",
        ],
        correct: "Accessible to reason without revelation",
        feedback: "Vatican I (1870) formally defined that God can be known with certainty by natural reason. This matters: it means atheism is not the philosophically neutral default. It also means faith is not a leap in the dark — it builds on a foundation reason has already prepared.",
      },
      {
        id: 3,
        sectionTitle: "The divine attributes.",
        teaching: "When the Church speaks of God's attributes — eternal, omnipotent, omniscient, omnipresent, immutable, simple — these are not arbitrary properties bolted onto a vague deity. Each follows logically from 'I AM WHO AM.' If God is pure act (not potential), he cannot change. If he is infinite, there is no place he is not. If he is the source of all truth, he cannot deceive. The divine attributes are a single, undivided reality described from different angles.",
        ccc: "CCC 212–221",
        mechanic: "tap_correct",
        prompt: "Which of these is NOT an attribute the Church ascribes to God?",
        options: ["Eternal","Omnipotent","Improvable","Omniscient"],
        correct: "Improvable",
        feedback: "God cannot improve because he has no imperfection to overcome. He is pure perfection — actus purus — with no unrealized potential. This is why the God of the Creed is not the god of 'open theism' who learns and changes. It also means God cannot sin or make mistakes.",
      },
      {
        id: 4,
        sectionTitle: "God is love — but that has a very specific meaning.",
        teaching: "When John writes 'God is love' (1 John 4:8), he is not saying love is God or that God is an emotion. He is saying that the very inner life of God — the communion of Father, Son, and Holy Spirit — is a perfect, eternal self-gift. God does not love because he needs to; he loves because love is what he is. This distinction matters enormously: a God who needs to love something is incomplete without creation. The Catholic God is complete in himself — and creates not from need but from abundance.",
        ccc: "CCC 221; 733",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "John's statement 'God is love' means God needed to create something in order to love.",
        correct: false,
        feedback: "God is already love — infinitely, perfectly, within himself — in the eternal communion of the Trinity. Creation is not God filling a void. It is the overflow of a love that is already infinite. This is why the Church says God creates freely — out of abundance, not need.",
      },
      {
        id: 5,
        sectionTitle: "Knowing God vs. knowing about God.",
        teaching: "There is a natural progression in how we come to know God. First, reason shows God exists — the Five Ways, the order of nature, the voice of conscience. Second, God reveals his name — 'I AM WHO AM' — going beyond what reason alone could reach. Third, the Church teaches who he is through catechesis, unpacking revelation systematically. Fourth and finally, you come to know him personally. Augustine wrote: 'You have made us for yourself, O Lord, and our heart is restless until it rests in you.' Everything before this step exists to make this step possible. (CCC 26–36)",
        ccc: "CCC 26–30",
        mechanic: "sequence",
        prompt: "Put these four steps in order — starting with how we first discover God exists, ending with the ultimate goal:",
        words: ["You come to know him personally", "The Church teaches who he is", "Reason shows God exists", "God reveals his name"],
        correct: ["Reason shows God exists", "God reveals his name", "The Church teaches who he is", "You come to know him personally"],
        feedback: "Augustine's 'restless heart' is not poetic exaggeration — it is a precise anthropological claim. Every human desire is ultimately a desire for God, often misdirected. Catechesis exists not to produce knowledgeable Catholics but to remove the obstacles between a soul and the God it was made for.",
      },
    ],
  },

  A2: {
    id: "A2",
    title: "The Holy Trinity",
    subtitle: "One God, three Persons — and why it matters",
    tier: "Foundation",
    tierColor: "#F59E0B",
    track: "A — God & the Trinity",
    prereqs: ["A1"],
    ccc_primary: "CCC 232–267",
    doctors: "Athanasius, De Incarnatione; Gregory of Nazianzus, Theological Orations III–V; Aquinas, ST I Q.27–43; Augustine, On the Trinity",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Glory Be",
      text: [
        "Glory be to the Father,",
        "and to the Son,",
        "and to the Holy Spirit,",
        "as it was in the beginning,",
        "is now, and ever shall be,",
        "world without end.",
        "Amen.",
      ],
      source: "Ancient doxology, 4th century",
      note: "Three lines, three Persons, one doxology. Notice you are glorifying one God — not three. This prayer is Trinitarian theology in fourteen words.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "The central mystery.",
        teaching: "The Trinity is not a mathematical puzzle. It is the disclosure of what God actually is on the inside. What Christians claim is this: the one God exists as three co-equal, co-eternal, and distinct Persons — Father, Son, and Holy Spirit. Not three gods. Not one God wearing three masks. Not a committee. One God whose inner life is personal communion. The Catechism calls it 'the central mystery of Christian faith and life.'",
        ccc: "CCC 234; 261",
        mechanic: "tap_correct",
        prompt: "How does the Church describe the Trinity?",
        options: [
          "Three gods cooperating together",
          "One God who appears in three different forms",
          "One God in three co-equal, distinct Persons",
          "God plus two divine creations",
        ],
        correct: "One God in three co-equal, distinct Persons",
        feedback: "The three most common errors about the Trinity each get one thing right and one thing wrong. Modalism (one God, three modes) preserves unity but loses real distinction. Tritheism (three gods) preserves distinction but loses unity. Subordinationism makes the Son or Spirit lesser than the Father. The Church spent three centuries defeating all three.",
      },
      {
        id: 2,
        sectionTitle: "The Councils that defined it.",
        teaching: "The Trinity was not invented by councils — it was confessed by the Church from the beginning. But in the 4th century, a priest named Arius taught that the Son was the greatest created being — not truly God, but a divine creature. The Council of Nicaea (325 AD) responded with one Greek word: homoousios — 'of the same substance' as the Father. Athanasius spent much of his life exiled for defending this word. His argument: only if the Son is truly God can he truly save us.",
        ccc: "CCC 242; 465",
        mechanic: "fill_blank",
        prompt: "Complete the key definition:",
        sentence: "The Council of Nicaea (325 AD) defined the Son as [BLANK] with the Father — meaning of the [BLANK] divine substance.",
        blanks: [
          { options: ["consubstantial","similar","equal","comparable"], correct: "consubstantial" },
          { options: ["same","similar","compatible","shared"], correct: "same" },
        ],
        feedback: "Homoousios — consubstantial — was fought over for decades because the alternative (homoiousios, 'of similar substance') seems like a minor difference. It is not. If the Son is merely similar to God, the incarnation saves us from below. If the Son is God, the incarnation saves us from within. Athanasius saw this instantly.",
      },
      {
        id: 3,
        sectionTitle: "The Persons are distinct — but not separate.",
        teaching: "The Father, Son, and Holy Spirit are truly distinct from each other — not just three names for the same reality. The Father is not the Son. The Son is not the Spirit. But they are not three separate beings, because each Person fully possesses the one divine nature. The technical term is perichoresis (Greek: mutual indwelling). The Persons are so thoroughly one that wherever one is, all three are — but they remain distinct. The unity is real; so is the distinction.",
        ccc: "CCC 253–256",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "The Father, Son, and Holy Spirit are three separate divine beings who work together.",
        correct: false,
        feedback: "This is Tritheism — the most intuitive but most incorrect reading of the Trinity. There are not three divine wills, three divine intellects, or three divine powers. There is one divine nature, one will, one intellect — but three Persons who each fully possess it. The missions differ; the nature is one.",
      },
      {
        id: 4,
        sectionTitle: "Why it's not just philosophy.",
        teaching: "The Trinity matters because it tells us what love ultimately is. Love requires a lover, a beloved, and the bond between them. If God were a solitary monad — alone from eternity — love would not be fundamental to his nature. But if God is Father, Son, and Holy Spirit in eternal self-gift, then love is not something God occasionally does. Love is what God is. And since we are made in his image, we are made for communion — not isolation.",
        ccc: "CCC 221; 1604",
        mechanic: "multiple_choice",
        prompt: "Why does the Trinity matter for how we understand love?",
        options: [
          "It explains why God has three names",
          "A Trinitarian God shows that love is eternal and prior to creation",
          "It proves that God is more complex than other religions teach",
          "It means humans should be divided into three parts",
        ],
        correct: "A Trinitarian God shows that love is eternal and prior to creation",
        feedback: "A solitary, pre-creation God who later 'decides to love' has love as an afterthought. A Trinitarian God has love as his very being — from before creation, before time. This is why John can write 'God is love' without qualification. It means human love — at its best — is a participation in what God already IS.",
      },
      {
        id: 5,
        sectionTitle: "How to speak about it without heresy.",
        teaching: "The Church gives us precise language to keep us from going off the rails. Four rules: (1) There is only ONE God — not three. (2) The three Persons are REALLY distinct — not just three modes or masks. (3) The three Persons are EQUAL in divinity — the Son and Spirit are not lesser. (4) Each Person is wholly God — the Father, Son, and Spirit are each fully divine. Everything else in Trinitarian theology is the expansion and application of these rules. When you feel confused, return to them.",
        ccc: "CCC 252–256",
        mechanic: "sequence",
        prompt: "Put the four Trinitarian rules in order as the Church teaches them:",
        words: ["Three Persons are fully equal","Only one God exists","Three Persons are truly distinct","Each Person is wholly God"],
        correct: ["Only one God exists","Three Persons are truly distinct","Three Persons are fully equal","Each Person is wholly God"],
        feedback: "Unity first, then real distinction, then full equality, then the fullness of each Person. Any error in Trinitarian theology violates at least one of these four. Modalism violates rule 2. Tritheism violates rule 1. Arianism violates rule 3. The four rules together constitute the minimum Trinitarian grammar every Catholic should know.",
      },
    ],
  },

  B1: {
    id: "B1",
    title: "Imago Dei",
    subtitle: "Made in the image of God — what that actually means",
    tier: "Foundation",
    tierColor: "#F59E0B",
    track: "B — The Human Person",
    prereqs: ["A3"],
    ccc_primary: "CCC 355–384",
    doctors: "Augustine, On the Trinity XIV; John Paul II, Theology of the Body Audiences 1–6; Aquinas, ST I Q.93",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Morning Offering",
      text: [
        "O Jesus, through the Immaculate Heart of Mary,",
        "I offer you my prayers, works, joys, and sufferings",
        "of this day",
        "in union with the Holy Sacrifice of the Mass throughout the world.",
        "I offer them for all the intentions of your Sacred Heart:",
        "the salvation of souls, reparation for sin,",
        "and the reunion of all Christians.",
        "Amen.",
      ],
      source: "Traditional Morning Offering",
      note: "Notice you're not just asking for things — you're offering your entire day. This reflects Imago Dei: humans are the only creatures who can give themselves to God by an act of will.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "The most important sentence in Genesis.",
        teaching: "Genesis 1:26–27: 'Then God said: Let us make man in our image, after our likeness.' This is the hinge on which all anthropology turns. It is the only time in the creation account that God deliberates before creating. It is the only creature described as 'image and likeness' of God. Every claim the Church makes about human dignity, rights, sexuality, and destiny flows from these two verses.",
        ccc: "CCC 355–357",
        mechanic: "fill_blank",
        prompt: "Complete the foundational verse:",
        sentence: "God said: 'Let us make man in our [BLANK], after our [BLANK].'",
        wordBank: ["image", "likeness", "form", "design", "will", "plan"],
        blanks: [
          { correct: "image" },
          { correct: "likeness" },
        ],
        feedback: "The distinction between 'image' (tselem) and 'likeness' (demuth) has been debated since Origen. Irenaeus saw image as the rational nature (indelible) and likeness as the supernatural grace (losable by sin). Either way, both together describe something utterly unique in creation: a being who reflects God himself.",
      },
      {
        id: 2,
        sectionTitle: "What the image means — concretely.",
        teaching: "The image of God is not located in the body (God is spirit). It is located in three specific human capacities: intellect (the ability to know truth), will (the ability to freely choose), and the capacity for relationship (we are made for communion — with God and with each other). Animals have instincts. Humans have these. The image means we are structured like God — rational, free, relational — even if infinitely inferior to him in degree.",
        ccc: "CCC 1703–1706",
        mechanic: "tap_correct",
        prompt: "In what are the three expressions of the Imago Dei found?",
        options: [
          "The physical body, the emotions, and the senses",
          "Intellect, free will, and capacity for communion",
          "Intelligence, talent, and moral virtue",
          "The soul, the spirit, and the heart",
        ],
        correct: "Intellect, free will, and capacity for communion",
        feedback: "Aquinas locates the image primarily in the intellectual nature (ST I Q.93 a.4). Augustine sees it in the trinitarian structure of memory, understanding, and will (On the Trinity XIV). Both agree: the image is the ground of human dignity, not something earned or assigned — it is constitutive of what we are.",
      },
      {
        id: 3,
        sectionTitle: "The image is wounded — but not erased.",
        teaching: "Original sin damaged the Imago Dei but did not destroy it. Every human being, regardless of sin, retains the image. This is why the Church opposes torture, abortion, euthanasia, slavery, and every violation of human dignity: because attacking any human person is attacking someone who bears God's image. Even the worst sinner carries within them the structure of a rational, free, relational being — which is why repentance and redemption remain possible.",
        ccc: "CCC 405; 1701",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "Original sin erased the image of God in human beings.",
        correct: false,
        feedback: "The Council of Trent is precise here: original sin 'darkened and weakened' human nature — it did not annihilate the image. This has massive practical consequences. Human dignity is not earned, not contingent on virtue or belief. It cannot be forfeited by crime, illness, age, or sin. Every person you meet is an image-bearer.",
      },
      {
        id: 4,
        sectionTitle: "The body is part of the image.",
        teaching: "John Paul II's Theology of the Body makes a claim that surprised many theologians: the body, not only the soul, participates in the Imago Dei. How? Because the body expresses the person. The body makes visible what is interior. And in a special way, the spousal structure of the body — male and female, oriented toward self-gift — images the Trinitarian communion of self-giving love. This is why sexual ethics, for the Church, is not arbitrary — it is theological.",
        ccc: "CCC 362–368",
        mechanic: "multiple_choice",
        prompt: "According to John Paul II, why does the body participate in the Imago Dei?",
        options: [
          "Because God has a body described in the Old Testament",
          "Because the body expresses the person and images self-giving love",
          "Because physical health reflects spiritual health",
          "Because the body will be resurrected",
        ],
        correct: "Because the body expresses the person and images self-giving love",
        feedback: "This is the beginning of the Theology of the Body's revolutionary contribution. The body is not a container for the soul (Platonic dualism) or merely biological machinery. It is a sacramental sign — it makes the interior life of the person visible. The spousal meaning of the body (given for the other) is the icon of Trinitarian love.",
      },
      {
        id: 5,
        sectionTitle: "The destination of the image.",
        teaching: "The image is not a static fact — it is a dynamic calling. The purpose of human existence is to become more fully what we already are in seed: to grow in the likeness of God through grace, virtue, and ultimately the beatific vision. The Eastern tradition calls this theosis or divinization — 2 Peter 1:4 calls it becoming 'partakers of the divine nature.' We are made for nothing less than union with the God whose image we bear.",
        ccc: "CCC 1996–1998; 2 Pet 1:4",
        mechanic: "fill_blank",
        prompt: "Complete the teaching on human destiny:",
        sentence: "The Eastern tradition calls our ultimate destiny [BLANK] — a becoming like God. 2 Peter 1:4 calls it becoming [BLANK] of the divine nature.",
        blanks: [
          { options: ["theosis","salvation","beatification","canonization"], correct: "theosis" },
          { options: ["partakers","admirers","copies","reflections"], correct: "partakers" },
        ],
        feedback: "Theosis is not pantheism (we don't become God). It is participation: we share in God's life without losing our creaturely status. Aquinas says grace is 'a participation in the divine nature.' The image we bear at creation is a promise of the likeness we are called to at consummation.",
      },
    ],
  },

  B2: {
    id: "B2",
    title: "Body, Soul & Free Will",
    subtitle: "What you are — and why you're responsible for what you do",
    tier: "Foundation",
    tierColor: "#F59E0B",
    track: "B — The Human Person",
    prereqs: ["B1"],
    ccc_primary: "CCC 362–368; 1730–1802",
    doctors: "Aquinas, ST I Q.75–90; ST I-II Q.6–21; Vatican II, Gaudium et Spes §16; Newman, Grammar of Assent Part II",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Prayer to the Holy Spirit",
      text: [
        "Come, Holy Spirit, fill the hearts of your faithful",
        "and kindle in them the fire of your love.",
        "Send forth your Spirit",
        "and they shall be created,",
        "and you shall renew the face of the earth.",
        "O God, who by the light of the Holy Spirit",
        "did instruct the hearts of the faithful,",
        "grant that by the same Spirit",
        "we may be truly wise,",
        "and ever rejoice in his consolations.",
        "Amen.",
      ],
      source: "Traditional veni Sancte Spiritus",
      note: "This prayer asks the Holy Spirit to guide your intellect and will — the very faculties we study in this lesson.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "Not a ghost in a machine.",
        teaching: "The Catholic view of the human person rejects two common errors. Platonism says the soul is the real person; the body is a prison. Materialism says there is no soul; you are only a body. The Church teaches a third path: the human person is a substantial unity of body and soul — one reality, not two things stuck together. Your body is not something you have. It is something you are. This unity has enormous consequences for bioethics, resurrection, sexuality, and suffering.",
        ccc: "CCC 362–368",
        mechanic: "tap_correct",
        prompt: "Which statement best reflects the Church's teaching on body and soul?",
        options: [
          "The soul is the real person; the body is a temporary prison",
          "The body is all that exists; the 'soul' is just brain activity",
          "Body and soul together form one unified human person",
          "The body and soul coexist but are fundamentally separate",
        ],
        correct: "Body and soul together form one unified human person",
        feedback: "Aquinas uses the Aristotelian concept: the soul is the 'form' of the body — not a tenant in a house, but the organizing principle that makes the body alive and human. Death is the separation of soul from body. Resurrection is their reunification. The body is not left behind; it is redeemed.",
      },
      {
        id: 2,
        sectionTitle: "What free will actually is.",
        teaching: "Free will does not mean the ability to do whatever you want. It means the power of rational self-determination — the ability to choose among real alternatives in light of your knowledge of the good. Only rational beings have it. Animals act by instinct; they cannot deliberate. Humans act by choice; we can reason, evaluate, and decide. This is why we bear moral responsibility for our actions in a way that animals do not.",
        ccc: "CCC 1730–1733",
        mechanic: "multiple_choice",
        prompt: "What is the proper definition of free will according to the Church?",
        options: [
          "The ability to do whatever you feel like doing",
          "Freedom from all external constraints",
          "The power to choose among real alternatives through rational deliberation",
          "The ability to resist temptation",
        ],
        correct: "The power to choose among real alternatives through rational deliberation",
        feedback: "Aquinas defines free will as liberum arbitrium — 'free judgment.' It is not freedom from causation but freedom through reason. This is why sin is possible: we can freely choose lesser goods over the highest good. And why virtue is possible: we can freely habituate ourselves to choose rightly.",
      },
      {
        id: 3,
        sectionTitle: "Conscience — the interior voice.",
        teaching: "Conscience is not feeling guilty. It is the interior act of practical reason applying the moral law to a specific situation. The Catechism calls it 'the proximate norm of personal morality.' Vatican II says it is 'the most secret core and sanctuary' of the person, where one is 'alone with God.' Importantly, conscience can be wrong — and the Catholic tradition insists we have a serious duty to form it well, because an erroneous conscience, followed in good faith, may excuse the act — but it does not change the object of the act.",
        ccc: "CCC 1776–1794; GS §16",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "A conscience that has been incorrectly formed still binds the person who acts on it.",
        correct: true,
        feedback: "This is the doctrine of invincible ignorance and erroneous conscience. If you act on a well-formed but mistaken conscience, you may not be subjectively guilty — but the Church is equally clear that you have a positive obligation to form your conscience. 'I didn't know' is only exculpatory if the ignorance was genuinely unavoidable. The obligation to form conscience well means that claiming ignorance does not eliminate the duty to seek truth. Invincible ignorance excuses; vincible ignorance — ignorance you could have resolved but didn't — does not.",
      },
      {
        id: 4,
        sectionTitle: "Freedom ordered toward truth.",
        teaching: "The modern idea of freedom says: freedom means doing whatever you choose. The Catholic idea says: freedom means doing what is truly good — which is why authentic freedom requires truth, not just the absence of constraints. John Paul II wrote: 'Freedom consists not in doing what we like, but in having the right to do what we ought.' A drug addict is not free; his choices are enslaved to compulsion. True freedom is what grows through virtue — the reliable ability to choose what is genuinely good.",
        ccc: "CCC 1731–1733; VS §17",
        mechanic: "fill_blank",
        prompt: "Complete John Paul II's definition:",
        sentence: "Freedom consists not in doing what we [BLANK], but in having the right to do what we [BLANK].",
        blanks: [
          { options: ["like","want","choose","desire"], correct: "like" },
          { options: ["ought","feel","believe","prefer"], correct: "ought" },
        ],
        feedback: "This is the Catholic answer to the modern confusion between freedom and autonomy. Autonomy means 'I am my own law.' Catholic freedom means conforming your will freely to what is genuinely good. The virtuous person is more free than the impulsive person — not less — because their freedom is reliable and ordered.",
      },
      {
        id: 5,
        sectionTitle: "Sin diminishes freedom.",
        teaching: "This seems counterintuitive: if free will means choosing freely, how can sin reduce freedom? Because freedom is the power to choose the good — and sin is a misuse of that power that progressively weakens it. Each sinful act creates a tendency, a habit, a compulsion that makes the next sin easier and the opposite virtue harder. This is the doctrine of the capital sins — not that they are worse than others, but that they are 'heads' from which entire chains of disorder grow.",
        ccc: "CCC 1865; 1866",
        mechanic: "sequence",
        prompt: "Arrange the progression that sin creates:",
        words: ["Vice becomes habitual","Compulsion overcomes freedom","Free choice made","Tendency reinforced"],
        correct: ["Free choice made","Tendency reinforced","Vice becomes habitual","Compulsion overcomes freedom"],
        feedback: "Aquinas describes this as the 'stain' of sin — a lasting disposition toward disorder that remains even after the guilt is forgiven. This is why Confession removes the guilt of mortal sin but does not automatically repair the damaged habit. Penance exists precisely to begin rebuilding what sin has eroded.",
      },
    ],
  },

  B3: {
    id: "B3",
    title: "Sin & the Fall",
    subtitle: "What actually went wrong — and what it cost",
    tier: "Foundation",
    tierColor: "#F59E0B",
    track: "B — The Human Person",
    prereqs: ["B2"],
    ccc_primary: "CCC 385–421",
    doctors: "Augustine, City of God XIV; Aquinas, ST I-II Q.81–83; Council of Trent, Session V, Decree on Original Sin",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Act of Contrition",
      text: [
        "O my God, I am heartily sorry",
        "for having offended you,",
        "and I detest all my sins",
        "because of your just punishments,",
        "but most of all because they offend you, my God,",
        "who are all good and deserving of all my love.",
        "I firmly resolve,",
        "with the help of your grace,",
        "to sin no more",
        "and to avoid the near occasions of sin.",
        "Amen.",
      ],
      source: "Traditional Act of Contrition",
      note: "This prayer presupposes everything in this lesson — that sin offends God, that punishment is just, and that conversion requires grace. It is the most important short prayer in Catholic devotional life.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "What sin actually is.",
        teaching: "Sin is not primarily breaking a rule. It is a failure in love — a turning away from God (aversio a Deo) toward a lesser good (conversio ad creaturam). The classic definition from Aquinas: 'a word, deed, or desire contrary to the eternal law.' There are three conditions for mortal sin: (1) grave matter, (2) full knowledge, (3) deliberate consent. Without all three, a sin is venial — it wounds the relationship with God but does not sever it.",
        ccc: "CCC 1849–1861",
        mechanic: "tap_correct",
        prompt: "What are the three conditions required for a mortal sin?",
        options: [
          "Intention, repetition, and public scandal",
          "Grave matter, full knowledge, and deliberate consent",
          "Serious harm, awareness, and malice",
          "Deliberate act, grave matter, and failure to confess",
        ],
        correct: "Grave matter, full knowledge, and deliberate consent",
        feedback: "Remove any one condition, and mortal sin becomes venial. This matters pastorally: people who grow up with no formation in the faith may commit objectively grave acts without subjective guilt — because full knowledge was absent. The Church distinguishes objective and subjective dimensions of moral acts.",
      },
      {
        id: 2,
        sectionTitle: "The Fall — what Genesis 3 actually says.",
        teaching: "The account in Genesis 3 is not a myth in the sense of legend — it is a story that describes real events in theological language appropriate to its time. The serpent's temptation follows a logic: 'Did God really say...?' — doubt, then denial, then self-deification ('you will be like God'). Adam and Eve's sin was not eating fruit. It was the refusal to accept their creaturely status and trust God's word. They wanted to be autonomous — to be their own gods.",
        ccc: "CCC 397–401",
        mechanic: "multiple_choice",
        prompt: "What was the core of Adam and Eve's sin in Genesis 3?",
        options: [
          "Disobeying a dietary rule",
          "Refusing creaturely status and trusting themselves over God",
          "Listening to an animal instead of God",
          "Failing to ask God's permission",
        ],
        correct: "Refusing creaturely status and trusting themselves over God",
        feedback: "The serpent's strategy: 'You will be like gods, knowing good and evil.' The temptation is to self-determination — to define good and evil for yourself rather than receive it from God. This is also the deepest structure of every subsequent human sin. Every sin is a miniature re-enactment of Genesis 3.",
      },
      {
        id: 3,
        sectionTitle: "What was lost in the Fall.",
        teaching: "Before the Fall, Adam and Eve enjoyed four extraordinary gifts beyond human nature: (1) sanctifying grace — friendship with God, (2) integrity — right ordering of passions to reason, (3) immortality — freedom from death, (4) infused knowledge and freedom from suffering. Original sin lost all four — for them and for their descendants. What remains is the natural human nature (capable of reason and will) but without the supernatural and preternatural gifts.",
        ccc: "CCC 375–379; 405",
        mechanic: "sequence",
        prompt: "Arrange the four gifts lost at the Fall:",
        words: ["Freedom from death (immortality)","Friendship with God (sanctifying grace)","Freedom from suffering (impassibility)","Right order of passions (integrity)"],
        correct: ["Friendship with God (sanctifying grace)","Right order of passions (integrity)","Freedom from death (immortality)","Freedom from suffering (impassibility)"],
        feedback: "The four gifts are: sanctifying grace (the most important — its loss is the essence of original sin), integrity (passions subject to reason), immortality (freedom from death), and impassibility (freedom from suffering). These last three are called preternatural — above nature but not supernatural. All four were lost in the Fall; all four are restored (in different forms) by redemption and resurrection.",
      },
      {
        id: 4,
        sectionTitle: "Original sin is inherited, not imitated.",
        teaching: "Augustine's critical insight, confirmed by the Council of Trent: Original sin is transmitted biologically (per propagationem), not merely by imitation of Adam's bad example. Every human being is born with a nature deprived of original sanctifying grace — a condition of privation, not just a bad example to follow. Pelagius denied this: he said Adam merely showed us a bad example. The Church condemned Pelagius precisely because his view makes Christ unnecessary — if sin is just imitation, conversion is just moral reform.",
        ccc: "CCC 402–406",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "According to the Church, we inherit original sin by imitating Adam's bad example.",
        correct: false,
        feedback: "This was Pelagius's error — and it was condemned because it logically eliminates the need for Christ. If sin is just imitation, a good moral teacher can fix it. But if sin is an inherited wound in nature, only a redeemer can heal it. 'Not by reform but by regeneration' (non reformatione sed regeneratione) — Trent, Session V.",
      },
      {
        id: 5,
        sectionTitle: "The 'happy fault.'",
        teaching: "The Church's liturgy dares to call Adam's sin the felix culpa — the 'happy fault.' Not because sin is good, but because God's response to sin was so overwhelmingly greater than what was lost: 'O happy fault, that earned for us so great, so glorious a Redeemer!' (Exsultet, Easter Vigil). The Fall did not catch God by surprise. The incarnation was not Plan B. The death and resurrection of Christ reveal a love deeper than what would ever have been visible if Adam had not sinned.",
        ccc: "CCC 412; 1994",
        mechanic: "fill_blank",
        prompt: "Complete the Church's doxology from the Easter Vigil:",
        sentence: "O [BLANK] fault, that earned for us so great, so glorious a [BLANK]!",
        blanks: [
          { options: ["happy","terrible","great","chosen"], correct: "happy" },
          { options: ["Redeemer","salvation","blessing","reward"], correct: "Redeemer" },
        ],
        feedback: "Felix culpa is not an excuse for sin. It is an exclamation of wonder at what God has done with it. Romans 5:20: 'Where sin increased, grace abounded all the more.' The logic of the Incarnation requires the Fall. A world of sinless beings would never have known what divine love looks like when it stoops to the lowest.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PRAYER TRACK P1 — integrated into Tier 1
  // ═══════════════════════════════════════════════════════════════

  P1a: {
    id: "P1a",
    title: "What Is Prayer?",
    subtitle: "Not a technique — a relationship",
    tier: "Foundation",
    tierColor: "#0EA5E9",
    track: "P — Prayer Practice",
    prereqs: ["K0"],
    ccc_primary: "CCC 2558–2590",
    doctors: "Augustine, Confessions I.1; Cassian, Conferences IX–X; Aquinas, ST II-II Q.83",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Sign of the Cross",
      text: [
        "In the name of the Father,",
        "and of the Son,",
        "and of the Holy Spirit.",
        "Amen.",
      ],
      source: "Tertullian, De Corona §3 (c. 211 AD)",
      note: "The most fundamental Catholic prayer — a small Trinitarian theology enacted on the body. Tertullian wrote that Christians made this sign constantly. It is not superstition; it is a daily confession of the faith.",
    },
    cards: [
      // Note: Full card content follows same schema but abbreviated here
      // See generation prompt for format
      {
        id: 1,
        sectionTitle: "Prayer is not what most people think it is.",
        teaching: "Most people think prayer is talking to God — sending up requests, offering thanks. But the Catechism's first definition is 'the raising of the mind and heart to God.' It is not primarily speaking. It is turning. The Catechism also calls it 'a covenant relationship between God and man in Christ.' Prayer is not a technique or practice you perform. It is a relationship you inhabit — and like any relationship, it can be neglected, deepened, or broken.",
        ccc: "CCC 2558–2565",
        mechanic: "fill_blank",
        prompt: "Complete the Catechism's definition:",
        sentence: "Prayer is the raising of the [BLANK] and [BLANK] to God.",
        blanks: [
          { options: ["mind","voice","hands","will"], correct: "mind" },
          { options: ["heart","soul","spirit","body"], correct: "heart" },
        ],
        feedback: "The raising of mind AND heart — not just mind (which would make prayer pure theology) and not just heart (which would make it pure emotion). Catholic prayer integrates both. This is why the Church insists on both formation in doctrine AND formation in devotion.",
      },
      {
        id: 2,
        sectionTitle: "The three forms of prayer.",
        teaching: "The Church identifies three expressions of prayer: (1) Vocal prayer — words (the Our Father, the Rosary, the liturgy). (2) Meditative prayer — thinking with the heart about God, Scripture, or a mystery of faith. (3) Contemplative prayer — silent attentiveness to God, beyond thoughts and words. All three are valid. Most Catholics start with vocal prayer. Deeper prayer typically integrates all three. None is superior in itself — what matters is that you show up.",
        ccc: "CCC 2700–2724",
        mechanic: "multiple_choice",
        prompt: "Which of these correctly identifies the three forms of Christian prayer?",
        options: [
          "Morning, afternoon, and evening prayer",
          "Vocal, meditative, and contemplative",
          "Public, private, and sacramental",
          "Praise, petition, and intercession",
        ],
        correct: "Vocal, meditative, and contemplative",
        feedback: "These three are not stages (first vocal, then meditation, then contemplation) as if you 'graduate' out of vocal prayer. They are three modes. Even the most advanced contemplative still prays the Our Father. The goal is integration, not progression.",
      },
      {
        id: 3,
        sectionTitle: "Why God wants us to ask.",
        teaching: "Petition is the most natural form of prayer — and the most theologically interesting. God doesn't need our prayers to know what we need. So why does he ask us to ask? Because prayer is not a divine information-gathering system. It is the training of the human will. When I ask God for something, I am ordering my desire toward him as the source of all good. Even when the answer is no, the asking has changed me — it has placed me in right relationship to the Giver.",
        ccc: "CCC 2629–2633",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "God asks us to petition him because he needs our prayers to know what we need.",
        correct: false,
        feedback: "God is omniscient — he knows our needs before we ask. The purpose of petitionary prayer is not to inform God but to form us: to train our desires, to acknowledge our dependence, to enter into relationship rather than self-sufficiency. 'Ask, and it shall be given to you' is an invitation to relationship, not a transaction.",
      },
      {
        id: 4,
        sectionTitle: "The obstacles to prayer.",
        teaching: "The Catechism identifies three main obstacles: distraction (the mind wanders), dryness (no feeling of God's presence), and the temptation to abandon prayer when it seems fruitless. All three are normal. St. Teresa of Avila, one of the greatest teachers of prayer in Church history, described decades of what felt like talking to a wall. Her advice: show up anyway. The feeling of God's presence is not the point — faithfulness is.",
        ccc: "CCC 2726–2728",
        mechanic: "tap_correct",
        prompt: "Which of these does the Catechism NOT list as a common obstacle to prayer?",
        options: ["Distraction","Dryness","Temptation to abandon prayer","Praying in the wrong posture"],
        correct: "Praying in the wrong posture",
        feedback: "Posture is not an obstacle — it can actually help. Kneeling or bowing can engage the body in the act of prayer and help focus attention. The real obstacles are all interior. Distraction, dryness, and discouragement are universal in the Christian life and have been for 2,000 years. You are not uniquely bad at prayer.",
      },
      {
        id: 5,
        sectionTitle: "Starting small.",
        teaching: "You do not need to pray for an hour a day to begin. You need a consistent time, a fixed prayer (to begin and end), and enough time to sit still. The tradition recommends: morning offering (five minutes), one decade of the Rosary, or simply the Lord's Prayer prayed slowly. The Fathers' counsel is unanimous: irregular long prayers are worth less than regular short ones. Show up every day. God will deepen what you show up for.",
        ccc: "CCC 2742–2745",
        mechanic: "sequence",
        prompt: "Arrange these elements in order of priority when starting a prayer practice:",
        words: ["Begin with a fixed prayer","Choose a consistent time","Sit still and be present","End with a consistent closing"],
        correct: ["Choose a consistent time","Sit still and be present","Begin with a fixed prayer","End with a consistent closing"],
        feedback: "Time first, then posture, then content. Most prayer advice focuses on what to pray. The tradition focuses on when and how. A fixed time is more important than a perfect method. If you have five minutes every morning, that is more than enough to build something that will last a lifetime.",
      },
    ],
  },


  // ═══════════════════════════════════════════════════════════════
  // TIER 1 FOUNDATION — REMAINING LESSONS (fully written)
  // ═══════════════════════════════════════════════════════════════

  A3: {
    id: "A3",
    title: "Creator & Creation",
    subtitle: "Why matter matters — and why the world is fundamentally good",
    tier: "Foundation",
    tierColor: "#F59E0B",
    track: "A — God & the Trinity",
    prereqs: ["A2"],
    ccc_primary: "CCC 279–324",
    doctors: "Augustine, City of God XI.21–22; Aquinas, ST I Q.44–47; Q.65–74; Bonaventure, Breviloquium Part II",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Canticle of the Sun",
      text: [
        "Most high, all-powerful, all-good Lord,",
        "all praise is yours, all glory, all honor,",
        "and all blessings.",
        "To you alone, Most High, do they belong;",
        "no mortal lips are worthy to pronounce your name.",
        "Be praised, my Lord, through all your creatures,",
        "especially through my lord Brother Sun,",
        "who brings the day, and you give light through him.",
        "Be praised, my Lord, through Sister Moon and the stars;",
        "in the heavens you have made them bright,",
        "precious, and beautiful.",
      ],
      source: "St. Francis of Assisi, Canticle of the Creatures (1224)",
      note: "Francis wrote this because he understood what this lesson teaches: creation is not a backdrop for human life. It is itself a song of praise. Every creature glorifies God by being what it is.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "God made everything out of nothing.",
        teaching: "The Church's first claim about creation is the most radical one: God created the universe ex nihilo — out of nothing. He did not shape pre-existing matter like a craftsman working clay. He did not emanate the world from himself like a sun giving off light. There was no 'before' and no raw material. God spoke, and 'being' itself came into existence. This is not a poetic statement. It is the most precise metaphysical claim in the Catechism.",
        ccc: "CCC 296–298",
        mechanic: "fill_blank",
        prompt: "Complete the Church's foundational teaching:",
        sentence: "God created the universe [BLANK] — out of [BLANK]. No matter pre-existed; he spoke and being came into existence.",
        blanks: [
          { options: ["ex nihilo", "ex materia", "ex deo", "freely"], correct: "ex nihilo" },
          { options: ["nothing", "chaos", "himself", "darkness"], correct: "nothing" },
        ],
        feedback: "Ex nihilo distinguishes Christian creation from every alternative. Greek philosophy assumed eternal matter that a craftsman-god organised. Gnosticism assumed a flawed god working with bad material. The Church teaches neither: God's creation is total, sovereign, and free. Creation owes its very existence — not just its form — entirely to God.",
      },
      {
        id: 2,
        sectionTitle: "God creates freely — not from need.",
        teaching: "Why did God create? Not because he was lonely, incomplete, or needed anything. The Trinity is already an infinite communion of love — Father, Son, and Holy Spirit in eternal self-gift. God creates purely from the overflow of that love, willing that other beings should share in his goodness. The Catechism says it plainly: 'God creates freely.' Creation is not God's necessity. It is his gift.",
        ccc: "CCC 293–295",
        mechanic: "multiple_choice",
        prompt: "Why did God create the universe, according to the Church?",
        options: [
          "Because he was lonely and needed companionship",
          "Because the material world had always existed alongside him",
          "Freely, as an overflow of his goodness — not from any need",
          "In order to have beings who could love him back",
        ],
        correct: "Freely, as an overflow of his goodness — not from any need",
        feedback: "Option D sounds pious but it subtly makes creation necessary — as if God needed worshippers. The Church is precise: God gains nothing from creation. He creates not to receive love but to share it. This is what makes creation a pure gift, and it is why gratitude — not transaction — is the right response.",
      },
      {
        id: 3,
        sectionTitle: "Creation is good — not a trap.",
        teaching: "Genesis 1 ends every day with the same refrain: 'And God saw that it was good.' After the sixth day, with humanity in place: 'very good.' This is not decoration. It is a direct rebuttal of every ancient and modern view that matter is evil, the body is a prison, and the physical world is something to escape. Gnosticism taught this. Manichaeism taught this. The Church has condemned it repeatedly. The world is genuinely good because a genuinely good God made it.",
        ccc: "CCC 299; 337–338",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "The Catholic Church teaches that the physical, material world is fundamentally corrupted and something the soul should escape.",
        correct: false,
        feedback: "This is the Gnostic and Manichaean error — and Augustine himself was a Manichaean before his conversion. The Church teaches the opposite: matter is created good, the body will be resurrected (not abandoned), and the sacraments use physical things — water, oil, bread, wine — to convey grace. Matter matters.",
      },
      {
        id: 4,
        sectionTitle: "Angels: real, personal, and already at war.",
        teaching: "Before the visible universe, God created a vast community of purely spiritual beings: angels. They are not metaphors for human feelings or vague 'presences.' They are real, rational, personal beings with intellect and will. Scripture and Tradition are unanimous on this. Many chose God freely; some, led by Lucifer, refused — and their fall is the origin of the devil and the demonic. The existence of spiritual evil explains something the natural order alone cannot: why the world contains a malice that exceeds human weakness.",
        ccc: "CCC 328–336; 391–395",
        mechanic: "tap_correct",
        prompt: "What does the Church teach about angels?",
        options: [
          "Angels are symbolic representations of God's attributes",
          "Angels are human souls who have reached heaven",
          "Angels are real, rational, personal spiritual beings with intellect and free will",
          "Angels are a helpful metaphor but not literally real",
        ],
        correct: "Angels are real, rational, personal spiritual beings with intellect and free will",
        feedback: "The Church has formally defined the existence of angels (Lateran IV, 1215). Their reality matters for understanding prayer (guardian angels are not decoration), spiritual warfare (Ephesians 6), and the problem of evil. The devil is not an impersonal force or metaphor. He is a fallen angel — a being who knew God perfectly and chose against him completely.",
      },
      {
        id: 5,
        sectionTitle: "Providence: God has not walked away.",
        teaching: "Creation is not God winding up a clock and stepping back. Providence is the doctrine that God actively sustains every creature in existence at every moment and guides all things toward his ends — not by overriding natural causes but through them. Aquinas: God is the primary cause; creatures are genuine secondary causes. This means miracles are real (direct divine action) but ordinary. It also means suffering has not escaped God's notice. Providence does not explain suffering away — but it insists that nothing is outside his reach.",
        ccc: "CCC 301–314",
        mechanic: "sequence",
        prompt: "Arrange these four claims about Providence in logical order:",
        words: [
          "Suffering does not escape his governance",
          "God sustains every creature at every moment",
          "Creatures are real secondary causes",
          "God works through natural causes, not despite them",
        ],
        correct: [
          "God sustains every creature at every moment",
          "Creatures are real secondary causes",
          "God works through natural causes, not despite them",
          "Suffering does not escape his governance",
        ],
        feedback: "The sequence moves from God's total sustaining presence, through the integrity of natural causation, to the pastoral application: Providence does not eliminate suffering but it means nothing is random. CCC 314: 'We firmly believe that God is master of the world and of its history.' This is not a claim that everything is pleasant — it is a claim that nothing is outside his reach.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PRAYER TRACK P1b — Basic Prayers
  // Unlocked after P1a. Introduces rote prayers one by one.
  // ═══════════════════════════════════════════════════════════════

  P1b: {
    id: "P1b",
    title: "The Basic Prayers",
    subtitle: "Learning the words the Church has prayed for centuries",
    tier: "Foundation",
    tierColor: "#0EA5E9",
    track: "P — Prayer Practice",
    prereqs: ["P1a", "A2"],
    ccc_primary: "CCC 2759–2865",
    doctors: "Tertullian, On Prayer §1–10; Aquinas, ST II-II Q.83 a.9; Chrysostom, Homilies on Matthew Hom.19",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Hail Mary",
      text: [
        "Hail Mary, full of grace,",
        "the Lord is with thee.",
        "Blessed art thou among women,",
        "and blessed is the fruit of thy womb, Jesus.",
        "Holy Mary, Mother of God,",
        "pray for us sinners,",
        "now and at the hour of our death.",
        "Amen.",
      ],
      source: "Combined from Luke 1:28, 1:42, and Council of Ephesus (431 AD)",
      note: "The first half is pure Scripture — the angel's greeting and Elizabeth's words. The second half is the Church's petition added after Ephesus defined Mary as Theotokos (God-bearer). Notice you are not worshipping Mary — you are asking her to pray for you, as you would ask any saint.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "Why memorised prayers are not hollow repetition.",
        teaching: "Jesus warned against 'babbling' in prayer (Matthew 6:7) — but then immediately gave his disciples a memorised prayer to repeat. The point is not that memorised words are wrong; the point is that empty-headed repetition is wrong. The Church's rote prayers have content precisely because they have been refined by centuries of theological precision. When you pray the Our Father slowly, you are not bypassing thought — you are thinking with the whole Church across time.",
        ccc: "CCC 2700–2704",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "Jesus taught that all memorised, repeated prayers are the 'vain babbling' he warned against in Matthew 6.",
        correct: false,
        feedback: "The irony is that Matthew 6:7 is immediately followed by the Lord's Prayer — the most memorised prayer in Christian history. The warning is against saying words without meaning them, not against repeated formulae. The Rosary, the Divine Office, the Mass — all involve repeated, memorised text. The discipline is praying them with attention, not abandoning them.",
      },
      {
        id: 2,
        sectionTitle: "The Our Father: seven petitions, one theology.",
        teaching: "The Lord's Prayer is not just a prayer — it is a summary of the entire Gospel. Tertullian called it the 'breviary of the whole Gospel.' It falls into two halves: three petitions directed toward God (hallowed be thy name / thy kingdom come / thy will be done) and four directed toward human need (daily bread / forgiveness / deliverance from temptation / deliverance from evil). The order matters: we ask for God's things before our own.",
        ccc: "CCC 2803–2806",
        mechanic: "sequence",
        prompt: "The Our Father has two halves. Arrange them correctly:",
        words: [
          "Four petitions for human needs",
          "Address: Our Father, who art in heaven",
          "Three petitions directed toward God",
          "Final doxology: for thine is the kingdom",
        ],
        correct: [
          "Address: Our Father, who art in heaven",
          "Three petitions directed toward God",
          "Four petitions for human needs",
          "Final doxology: for thine is the kingdom",
        ],
        feedback: "The structure teaches a theology of prayer: right relationship first, then petition. We begin by placing ourselves before God (address), then orient to his agenda (his name, kingdom, will), then bring our own needs. This is why the Church teaches you to spend the first part of prayer in adoration before petition — the Our Father encodes that priority.",
      },
      {
        id: 3,
        sectionTitle: "The Hail Mary: two sentences from Scripture, one from the Church.",
        teaching: "The Hail Mary is built from three sources. 'Hail, full of grace' is the angel Gabriel's greeting (Luke 1:28). 'Blessed art thou among women and blessed is the fruit of thy womb' is Elizabeth's Spirit-filled acclamation (Luke 1:42). 'Holy Mary, Mother of God, pray for us sinners now and at the hour of our death' is the Church's petition, added after the Council of Ephesus (431 AD) defined Mary as Theotokos — God-bearer. The prayer is asking a saint to intercede — the same thing Catholics do when they ask a friend to pray for them.",
        ccc: "CCC 2676–2677",
        mechanic: "multiple_choice",
        prompt: "Where does the phrase 'Holy Mary, Mother of God, pray for us sinners' come from?",
        options: [
          "The Gospel of Luke",
          "The Gospel of John, chapter 2",
          "The Church's own petition, added after the Council of Ephesus (431 AD)",
          "The Letter of Paul to the Romans",
        ],
        correct: "The Church's own petition, added after the Council of Ephesus (431 AD)",
        feedback: "This matters apologetically: the first half of the Hail Mary is pure Scripture. The second half is the Church applying the dogma of Ephesus to prayer. Once you know that Mary is truly the Mother of God — not just the mother of Jesus's human nature — asking her to intercede is no different from asking any saint to pray for you. The prayer is doctrinally constructed, not devotionally invented.",
      },
      {
        id: 4,
        sectionTitle: "The Sign of the Cross: a creed you make with your body.",
        teaching: "When a Catholic makes the Sign of the Cross, they are doing three things simultaneously: confessing the Trinity (in the name of the Father, and of the Son, and of the Holy Spirit), invoking God's name over their person and actions, and tracing the instrument of salvation on their own body. Tertullian documented Christians making this sign constantly — before meals, travel, bathing — around 211 AD. It is the oldest continuous Catholic gesture and one of the briefest complete theological statements in existence.",
        ccc: "CCC 232–233; 1235",
        mechanic: "fill_blank",
        prompt: "Complete the three things the Sign of the Cross does simultaneously:",
        sentence: "It confesses the [BLANK], invokes God's name over the person, and traces the instrument of [BLANK] on the body.",
        blanks: [
          { options: ["Trinity", "Gospel", "Church", "Bible"], correct: "Trinity" },
          { options: ["salvation", "creation", "prayer", "blessing"], correct: "salvation" },
        ],
        feedback: "Tertullian, writing c. 211 AD: 'At every forward step and movement, at every going in and out, when we put on our clothes and shoes, when we bathe, when we sit at table, when we light the lamps, on couch, on seat, in all the ordinary actions of daily life, we trace upon the forehead the sign.' The Sign of the Cross is not a ritual tic. It is a full theology compressed into four words and one gesture.",
      },
      {
        id: 5,
        sectionTitle: "Glory Be: the shortest complete doxology.",
        teaching: "The Gloria Patri — 'Glory be to the Father, and to the Son, and to the Holy Spirit, as it was in the beginning, is now, and ever shall be, world without end' — is an ancient doxology dating to at least the 4th century. It appears at the end of every psalm in the Liturgy of the Hours, at the end of each decade of the Rosary, and scattered throughout Catholic prayer. Its function is to orient every prayer, every psalm, every moment of praise back toward its source: the Trinity, whose glory is eternal and unchanging.",
        ccc: "CCC 2639–2643",
        mechanic: "tap_correct",
        prompt: "What is the primary function of the Gloria Patri (Glory Be) in Catholic prayer?",
        options: [
          "To ask for specific graces from each Person of the Trinity",
          "To orient every prayer back toward the Trinity as its source and end",
          "To praise Mary as the mother of the Church",
          "To mark the transition between different sections of the Mass",
        ],
        correct: "To orient every prayer back toward the Trinity as its source and end",
        feedback: "The Liturgy of the Hours ends every single psalm with the Gloria Patri — 150 psalms, each one turned back toward the Trinity. This is the Church's instinct: any authentic prayer, regardless of its human author or occasion, ultimately glorifies the Triune God. The Gloria Patri makes that orientation explicit.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // TRACK D — SCRIPTURE & TRADITION
  // D1, D2, D3 — Days 8, 9, 10
  // ═══════════════════════════════════════════════════════════════

  D1: {
    id: "D1",
    title: "What Is Scripture?",
    subtitle: "The Word of God in human words — and why that matters",
    tier: "Foundation",
    tierColor: "#F59E0B",
    track: "D — Scripture & Tradition",
    prereqs: ["K0", "A1"],
    ccc_primary: "CCC 101–141",
    doctors: "Jerome, Preface to the Vulgate; Augustine, On Christian Doctrine II; Aquinas, ST I Q.1 a.10; Dei Verbum (Vatican II)",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Prayer Before Reading Scripture",
      text: [
        "Lord,",
        "open my heart and my mind",
        "by the grace of your Holy Spirit.",
        "As I receive your word,",
        "may it shape my thoughts and desires,",
        "and lead me into all truth.",
        "Speak, Lord —",
        "your servant is listening.",
        "Amen.",
      ],
      source: "Traditional prayer, based on 1 Samuel 3:9",
      note: "Samuel's response to God — 'Speak, Lord, your servant is listening' — is the posture Scripture itself models for its own reception. Every time you open the Bible, this prayer sets the right disposition: readiness to be addressed, not just to read.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "Scripture is divine — and human — at the same time.",
        teaching: "The Catholic Church teaches that Scripture is the Word of God expressed in human words. This is not a contradiction. The same logic applies here as to the Incarnation: just as Jesus is fully human and fully divine without confusion, so Scripture has a true human author and a true divine author without cancellation. God used real human beings — with their personalities, vocabularies, literary styles, and historical contexts — to communicate exactly what he intended. Vatican II's Dei Verbum calls this 'divine condescension.'",
        ccc: "CCC 101–108",
        mechanic: "multiple_choice",
        prompt: "The Catholic Church's teaching on biblical authorship holds that:",
        options: [
          "God dictated Scripture word-for-word, bypassing the human authors' personalities",
          "The human authors wrote independently; God later endorsed their work",
          "God is the true author, working through real human authors with their own styles and contexts",
          "Scripture is primarily a human record of religious experience",
        ],
        correct: "God is the true author, working through real human authors with their own styles and contexts",
        feedback: "The dictation theory (option A) was never the Catholic position. It is mechanical and fails to explain why Paul sounds like Paul and John sounds like John. God's authorship works through secondary causation — the same principle as Providence. The human author truly wrote; God truly authored. Dei Verbum §11: 'To compose the sacred books, God chose certain men who, all the while he employed them in this task, made full use of their own faculties and powers.'",
      },
      {
        id: 2,
        sectionTitle: "Inspiration and inerrancy — what they actually mean.",
        teaching: "Biblical inspiration means that the human authors were moved by the Holy Spirit to write what God intended. Inerrancy means that Scripture, rightly interpreted, does not err in what it affirms for the sake of our salvation. These two claims go together — but inerrancy does not mean every number in Chronicles is accurate to modern historiography or that Genesis 1 is a scientific description of origins. The Church interprets each passage according to its literary genre, historical context, and the intent of the author.",
        ccc: "CCC 105–107; 136–137",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "Biblical inerrancy means every statement in Scripture — including numerical data, geographical details, and scientific descriptions — is literally and precisely accurate.",
        correct: false,
        feedback: "Dei Verbum §11 is precise: Scripture 'teaches firmly, faithfully, and without error that truth which God wanted put into the sacred writings for the sake of our salvation.' The scope of inerrancy is salvation truth, not encyclopedic accuracy. Jerome, Augustine, and Aquinas all acknowledged that apparent conflicts in Scripture are often resolved by attending to genre, idiom, or authorial intent — not by insisting on wooden literalism.",
      },
      {
        id: 3,
        sectionTitle: "The canon: why these 73 books and not others.",
        teaching: "The Catholic Bible contains 73 books: 46 in the Old Testament and 27 in the New Testament. The Protestant Bible has 66 — it removes 7 books (Tobit, Judith, 1 and 2 Maccabees, Sirach, Baruch, and Wisdom) that Luther rejected in the 16th century. These books were in the Septuagint (the Greek Old Testament used by the early Church and quoted by the New Testament authors). The Council of Trent (1546) formally defined the Catholic canon in response to this rejection.",
        ccc: "CCC 120",
        mechanic: "fill_blank",
        prompt: "Complete the fact:",
        sentence: "The Catholic Bible contains [BLANK] books. The [BLANK] books absent from Protestant Bibles were removed by Luther in the 16th century.",
        blanks: [
          { options: ["73", "66", "72", "74"], correct: "73" },
          { options: ["7", "5", "4", "9"], correct: "7" },
        ],
        feedback: "The 7 books are called the deuterocanonical books (Catholic) or the Apocrypha (Protestant). Luther's stated criterion was conformity with the Hebrew canon (the Palestinian canon used by rabbinic Judaism), which excluded these books. Critics noted, however, that the early Church and the New Testament authors consistently used the Septuagint — the Greek Old Testament — which includes them.",
      },
      {
        id: 4,
        sectionTitle: "Scripture and Tradition: two streams from one source.",
        teaching: "The Catholic Church does not hold to sola scriptura — the Protestant principle that Scripture alone is the sufficient rule of faith. Instead, she teaches that Scripture and Sacred Tradition together constitute one sacred deposit of the Word of God. Tradition is not later additions to Scripture. It is the living transmission of the Gospel through the life of the Church — the Creeds, the Liturgy, the teaching office — beginning with the Apostles. Scripture itself was produced within that Tradition and cannot be properly interpreted without it.",
        ccc: "CCC 80–83",
        mechanic: "tap_correct",
        prompt: "What is the Catholic teaching on Scripture and Sacred Tradition?",
        options: [
          "Scripture alone is the sufficient rule of faith; Tradition is optional",
          "Tradition supersedes Scripture when they conflict",
          "Scripture and Tradition are two equal streams from one source and must be received together",
          "Scripture is inspired; Tradition is merely the Church's human commentary",
        ],
        correct: "Scripture and Tradition are two equal streams from one source and must be received together",
        feedback: "Sola scriptura is itself a Tradition — a 16th-century decision about how to interpret the faith. The irony is that the canon of Scripture was determined by the very Tradition that sola scriptura dismisses. Which books belong in the Bible is not answered by the Bible itself — it was answered by councils, Fathers, and the lived reception of the Church over four centuries.",
      },
      {
        id: 5,
        sectionTitle: "The four senses of Scripture.",
        teaching: "The medieval Church, following Augustine and Aquinas, read Scripture on four levels simultaneously: the literal sense (what the text says happened), the allegorical sense (how it points to Christ), the moral sense (how it shapes our conduct), and the anagogical sense (how it points to heaven). The literal sense is the foundation — you cannot jump to allegory without first understanding what the text actually says. But the literal sense is not the only sense. The full meaning of Scripture unfolds across all four.",
        ccc: "CCC 115–119",
        mechanic: "sequence",
        prompt: "The four senses of Scripture — arrange them from foundational to eschatological:",
        words: ["Anagogical (points to heaven)", "Allegorical (points to Christ)", "Moral (shapes conduct)", "Literal (what happened)"],
        correct: ["Literal (what happened)", "Allegorical (points to Christ)", "Moral (shapes conduct)", "Anagogical (points to heaven)"],
        feedback: "The medieval mnemonic: 'The letter teaches what happened; allegory what to believe; the moral sense what to do; anagogy where we are going.' All four are present in every text, but the literal sense governs interpretation. Without the literal sense, allegorical readings become arbitrary. With it, the full theological depth of the text becomes accessible.",
      },
    ],
  },

  D2: {
    id: "D2",
    title: "How to Read the Bible",
    subtitle: "The Church's rules for reading Scripture faithfully",
    tier: "Foundation",
    tierColor: "#F59E0B",
    track: "D — Scripture & Tradition",
    prereqs: ["D1"],
    ccc_primary: "CCC 109–119; 131–133",
    doctors: "Augustine, On Christian Doctrine III; Jerome, Letter 53; Aquinas, Quodlibetal Questions VII q.6 a.2; Dei Verbum §§12–13",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Come, Holy Spirit",
      text: [
        "Come, Holy Spirit, Creator blest,",
        "and in our souls take up thy rest;",
        "come with thy grace and heavenly aid",
        "to fill the hearts which thou hast made.",
        "O Comforter, to thee we cry,",
        "thou heavenly gift of God most high,",
        "thou fount of life and fire of love,",
        "and sweet anointing from above.",
      ],
      source: "Veni Creator Spiritus, attr. Rabanus Maurus (9th c.); trans. Edward Caswall",
      note: "Traditionally prayed before studying Scripture or theology. The Holy Spirit is not only the author of Scripture but its necessary interpreter. Human intelligence can parse the text; only the Spirit opens its meaning.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "The author's intent comes first.",
        teaching: "The Church's first rule for reading Scripture is to seek what the human author intended to say in their time, using their literary conventions, for their original audience. This is not a concession to modern scholarship — Augustine and Aquinas both insisted on it. You cannot understand what a text means until you understand what it says, and you cannot understand what it says without understanding the kind of writing it is. A psalm is not a history. A prophecy is not a legal code. Genre matters.",
        ccc: "CCC 109–110",
        mechanic: "multiple_choice",
        prompt: "According to the Church, the first step in interpreting Scripture is to:",
        options: [
          "Find a spiritual or allegorical meaning that edifies the reader",
          "Apply the text directly to contemporary situations",
          "Determine what the human author intended in their original context",
          "Accept whatever the reader feels the Holy Spirit is saying through it",
        ],
        correct: "Determine what the human author intended in their original context",
        feedback: "Dei Verbum §12 is explicit: 'Seeing that, in sacred scripture, God speaks through men in human fashion, the interpreter of sacred scripture... should carefully investigate what meaning the sacred writers really intended.' The spiritual senses build on the literal sense — they do not bypass it. Skipping to allegory without establishing the literal sense leads to reading your own ideas into the text.",
      },
      {
        id: 2,
        sectionTitle: "Scripture must be read within the Tradition that produced it.",
        teaching: "A second rule: Scripture must be read in the light of the Tradition of the whole Church. This has two practical implications. First, no text should be interpreted in isolation from the broader sweep of Scripture — the Old Testament illuminates the New, and the New fulfils the Old. Second, no private interpretation should contradict what the Church has consistently taught for two thousand years. 2 Peter 1:20 is precise: 'no prophecy of Scripture is a matter of one's own interpretation.'",
        ccc: "CCC 112–113",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "According to the Church, any personal interpretation of Scripture is valid as long as it is sincere and Spirit-led.",
        correct: false,
        feedback: "2 Peter 1:20–21 says prophecy 'never came by the impulse of man, but men moved by the Holy Spirit spoke from God' — which means the Spirit who inspired it governs its interpretation. Private sincerity does not override two millennia of consistent Church teaching. This does not mean individuals cannot study Scripture; it means individual readings are accountable to the whole Church's reading.",
      },
      {
        id: 3,
        sectionTitle: "The unity of Scripture: the whole Bible is one story.",
        teaching: "The Catholic Church reads the Bible as a single, unified narrative with a single divine author who intended the whole. This is why the Old Testament is not just background — it is essential. The sacrifice of Isaac prefigures the crucifixion. The Passover lamb prefigures the Eucharist. The prophet's suffering servant prefigures Christ. This reading — typology — is not imposed from outside: it is how the New Testament itself reads the Old, and how Jesus taught his disciples to read it after the resurrection (Luke 24:27).",
        ccc: "CCC 128–130",
        mechanic: "fill_blank",
        prompt: "Complete the teaching on typology:",
        sentence: "The Church reads the Old Testament as containing [BLANK] — Old Testament events or persons that [BLANK] New Testament realities.",
        blanks: [
          { options: ["types", "myths", "symbols", "allegories"], correct: "types" },
          { options: ["prefigure", "explain", "contradict", "replace"], correct: "prefigure" },
        ],
        feedback: "Typology is not allegory — types are real historical events and persons whose full meaning is only visible in light of their fulfilment in Christ. The Passover really happened; the Eucharist really is its fulfilment. Isaac was truly offered; Christ was truly sacrificed. The historical reality of the type is not cancelled by the spiritual fulfilment — it is confirmed by it.",
      },
      {
        id: 4,
        sectionTitle: "What Scripture is NOT trying to do.",
        teaching: "Understanding what Scripture is not trying to do is as important as understanding what it is. Scripture is not a science textbook — it does not intend to describe the mechanics of creation. It is not a chronological history in the modern sense — ancient historians had different conventions. It is not a legal code where every statement has equal weight. The Church teaches that Scripture 'teaches firmly, faithfully, and without error that truth which God wanted put into the sacred writings for the sake of our salvation.' The scope is salvation. Within that scope, inerrancy holds.",
        ccc: "CCC 106–107",
        mechanic: "tap_correct",
        prompt: "Which of these does the Church say Scripture is primarily intended to do?",
        options: [
          "Provide a complete and accurate account of ancient history",
          "Describe the scientific origins of the universe",
          "Communicate the truth necessary for our salvation",
          "Serve as the legal constitution of the Catholic Church",
        ],
        correct: "Communicate the truth necessary for our salvation",
        feedback: "This is the most important rule for reading Scripture without confusion. When you read a difficult passage — apparent contradictions, a violent command, an unusual number — the first question is: what is this text trying to do? Is it claiming scientific precision? Historical completeness? Usually not. It is always communicating something about God, humanity, sin, salvation, or covenant. Stay focused on that register.",
      },
      {
        id: 5,
        sectionTitle: "Reading Scripture as prayer.",
        teaching: "Lectio Divina — sacred reading — is the oldest Christian practice of Scripture engagement. It has four movements: Lectio (read the passage slowly, noticing words that stand out), Meditatio (chew on those words — what do they mean? what is God saying through them?), Oratio (respond in prayer — not a prepared speech but a genuine reaction), Contemplatio (rest in God's presence, beyond words). This is not a technique invented by monks. It is the shape of all genuine reading of Scripture: attentive, personal, and responsive.",
        ccc: "CCC 1177; 2708",
        mechanic: "sequence",
        prompt: "The four movements of Lectio Divina — arrange them in order:",
        words: ["Oratio — pray in response", "Contemplatio — rest in God's presence", "Lectio — read the passage slowly", "Meditatio — reflect on what stands out"],
        correct: ["Lectio — read the passage slowly", "Meditatio — reflect on what stands out", "Oratio — pray in response", "Contemplatio — rest in God's presence"],
        feedback: "The progression is important: reading before reflecting, reflecting before responding, responding before resting. The temptation is to skip to contemplation — a vague spiritual feeling — without the discipline of actual reading and actual thought. Lectio Divina is not an emotion. It begins with the text. The contemplation it produces is grounded in what God has actually said.",
      },
    ],
  },

  D3: {
    id: "D3",
    title: "Salvation History: The Old Testament",
    subtitle: "The long preparation — how God pursued humanity across millennia",
    tier: "Foundation",
    tierColor: "#F59E0B",
    track: "D — Scripture & Tradition",
    prereqs: ["D2", "B3"],
    ccc_primary: "CCC 54–64; 142–175",
    doctors: "Augustine, City of God XV–XVIII; Aquinas, ST I-II Q.98–105; Irenaeus, Against Heresies III.12–21",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Psalm 23",
      text: [
        "The Lord is my shepherd; I shall not want.",
        "He makes me lie down in green pastures.",
        "He leads me beside still waters.",
        "He restores my soul.",
        "He leads me in paths of righteousness",
        "for his name's sake.",
        "Even though I walk through the valley",
        "of the shadow of death,",
        "I will fear no evil,",
        "for you are with me.",
        "Your rod and your staff — they comfort me.",
      ],
      source: "Psalm 23:1–4",
      note: "This psalm is Israel's prayer — and now yours. When you pray it, you are praying with every Jew who has prayed it for three thousand years, and with Christ who prayed it. This is what the Old Testament is: not a foreign document but your own inheritance.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "The Old Testament is your story.",
        teaching: "Catholics sometimes treat the Old Testament as background reading before the 'real' Bible begins. This is a mistake. Paul writes to Gentile Christians: 'These things happened to them as a warning, but they were written down for our instruction' (1 Cor 10:11). Abraham is your father in faith. The Exodus is your type of baptism. The Psalms are your prayer book. The promises made to Israel are fulfilled in the Church. The Old Testament is not a prologue. It is the first two-thirds of your story.",
        ccc: "CCC 121–123",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "The Old Testament was written for the Jewish people and has limited relevance for Christians today.",
        correct: false,
        feedback: "Paul is explicit in Romans 4, Galatians 3, and 1 Corinthians 10: Gentile Christians are grafted into Israel's story, not exempted from it. Marcion (c. 140 AD) tried to remove the Old Testament entirely and was condemned as a heretic. The Church's reading: the Old Testament is 'permanently valid' (CCC 121) and contains 'sublime teachings about God' and 'a wonderful treasury of prayers.'",
      },
      {
        id: 2,
        sectionTitle: "The covenant structure: how God binds himself to his people.",
        teaching: "The spine of the Old Testament is a series of covenants — solemn, binding commitments between God and specific persons or groups. Adam (creation covenant), Noah (no more flood), Abraham (land, descendants, blessing), Moses/Israel (law at Sinai), David (eternal dynasty). Each covenant narrows: from all humanity, to a family, to a nation, to a royal line — all pointing to the one who will be the perfect covenant partner. The covenant structure explains why the New Testament is called 'New' — it is the final and perfect covenant in Christ's blood.",
        ccc: "CCC 56–64",
        mechanic: "sequence",
        prompt: "Arrange the five major Old Testament covenants in order:",
        words: ["Mosaic covenant (law at Sinai)", "Adamic covenant (creation)", "Davidic covenant (eternal dynasty)", "Noahic covenant (no more flood)", "Abrahamic covenant (land and descendants)"],
        correct: ["Adamic covenant (creation)", "Noahic covenant (no more flood)", "Abrahamic covenant (land and descendants)", "Mosaic covenant (law at Sinai)", "Davidic covenant (eternal dynasty)"],
        feedback: "The narrowing is deliberate and theological. God starts with all of humanity (Adam, Noah), then calls one man (Abraham), then forms one nation (Moses), then focuses on one royal line (David). This progressive narrowing culminates in one Person — Jesus of Nazareth, son of David, son of Abraham, second Adam, in whom all the covenants are fulfilled and universalised.",
      },
      {
        id: 3,
        sectionTitle: "Abraham: the father of faith.",
        teaching: "Abraham is the pivotal figure of salvation history — the point at which God's response to sin becomes a specific project rather than a general promise. What makes Abraham remarkable is not his virtue but his obedience. He left everything on God's word alone. He believed God could raise the dead (Hebrews 11). Paul calls him the father of all who believe — both Jew and Gentile. James says his faith was shown by his works. Both are correct: genuine faith acts. The offering of Isaac is the supreme test — and a type of the Father offering his Son.",
        ccc: "CCC 59–60; 145–147",
        mechanic: "multiple_choice",
        prompt: "What does Paul say makes Abraham 'the father of all who believe' (Romans 4)?",
        options: [
          "His moral excellence and perfect obedience to the law",
          "His circumcision, which he received before the Gentiles",
          "His faith — trust in God's promise before he received any sign",
          "His sacrifice of Isaac on Mount Moriah",
        ],
        correct: "His faith — trust in God's promise before he received any sign",
        feedback: "Romans 4:3 quotes Genesis 15:6: 'Abraham believed God, and it was credited to him as righteousness.' Paul's crucial point is that this happened before his circumcision (Genesis 17) and centuries before the Mosaic law. Abraham's righteousness was credited through faith alone, which means the same principle applies to Gentiles who believe. He is the prototype of justification by faith — in the Catholic sense: a faith that works through love (Galatians 5:6).",
      },
      {
        id: 4,
        sectionTitle: "Moses and the law: gift, not burden.",
        teaching: "The giving of the Law at Sinai is not the imposition of a burden on a free people. It is the wedding covenant between God and Israel — Israel's constitution as God's people, his 'treasured possession among all peoples' (Exodus 19:5). The Law tells Israel how to live as the people they already are by grace. Paul's argument that the Law cannot save is not an argument that the Law is bad — he calls it 'holy, righteous, and good' (Romans 7:12). The Law reveals sin; it cannot remove it. That requires something more.",
        ccc: "CCC 1961–1964",
        mechanic: "fill_blank",
        prompt: "Complete Paul's teaching on the Law:",
        sentence: "Paul calls the Mosaic Law 'holy, [BLANK], and good' — but argues it reveals sin without being able to [BLANK] it.",
        blanks: [
          { options: ["righteous", "perfect", "eternal", "divine"], correct: "righteous" },
          { options: ["remove", "define", "explain", "judge"], correct: "remove" },
        ],
        feedback: "This is the precise Catholic position on Law and Gospel. The Law is not the problem — sin is the problem. The Law is 'a schoolmaster to bring us to Christ' (Galatians 3:24 KJV) — it diagnoses the disease with precision. But a diagnosis is not a cure. The Law reveals that we need a Saviour; it cannot be the Saviour. This sets up the entire logic of the New Covenant.",
      },
      {
        id: 5,
        sectionTitle: "The prophets: hope kept alive across the silence.",
        teaching: "After the disaster of the exile — Israel deported to Babylon, the Temple destroyed, the Davidic monarchy ended — the prophets kept alive the promise that God was not finished. Isaiah 53's Suffering Servant who 'bore our sins.' Jeremiah 31's New Covenant 'written on the heart.' Ezekiel 37's valley of dry bones restored to life. Micah 5's ruler from Bethlehem. Zechariah 9's king entering Jerusalem on a donkey. These are not vague hopes. They are specific enough that when Jesus fulfilled them, his disciples recognised them — and specific enough that they could not have been engineered.",
        ccc: "CCC 64; 522",
        mechanic: "tap_correct",
        prompt: "What is the primary theological function of the prophets in salvation history?",
        options: [
          "To call Israel to political resistance against foreign powers",
          "To preserve and transmit God's specific promises pointing toward Christ",
          "To replace the Mosaic Law with a more spiritual religion",
          "To prepare Israel for the loss of the Temple as spiritually beneficial",
        ],
        correct: "To preserve and transmit God's specific promises pointing toward Christ",
        feedback: "The prophets' social and political preaching is real — Isaiah, Amos, and Micah all confront injustice directly. But their deeper function in salvation history is what Jesus himself declares in Luke 24:44: 'Everything written about me in the Law of Moses and the Prophets and the Psalms must be fulfilled.' The prophets are not background — they are the specification of what the Messiah would be, against which Jesus is measured and found to match.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // PRAYER TRACK P2 — Encounter tier prayer
  // P2b written here as it is needed on Day 10
  // ═══════════════════════════════════════════════════════════════

  P2b: {
    id: "P2b",
    title: "Praying with Scripture",
    subtitle: "How to let the Word of God become the words of your prayer",
    tier: "Encounter",
    tierColor: "#0EA5E9",
    track: "P — Prayer Practice",
    prereqs: ["P1b", "D2"],
    ccc_primary: "CCC 2700–2708",
    doctors: "Guigo II, Scala Claustralium (Ladder of Monks); Benedict XVI, Verbum Domini §§86–87; Origen, On Prayer §2",
    totalXP: 100,
    status: "complete",
    prayer: {
      title: "Psalm 119:105",
      text: [
        "Your word is a lamp to my feet",
        "and a light to my path.",
        "I have sworn an oath and confirmed it,",
        "to keep your righteous rules.",
        "I am severely afflicted;",
        "give me life, O Lord, according to your word.",
        "Accept my freewill offerings of praise, O Lord,",
        "and teach me your rules.",
        "I hold my life in my hand continually,",
        "but I do not forget your law.",
      ],
      source: "Psalm 119:105–109",
      note: "Psalm 119 is the longest chapter in the Bible — 176 verses, every one about the Word of God. The psalmist is not studying Scripture. He is praying it back to God. This is what lectio divina trains: the movement from text to prayer.",
    },
    cards: [
      {
        id: 1,
        sectionTitle: "Lectio Divina: the Church's oldest way of reading Scripture as prayer.",
        teaching: "Lectio divina — sacred reading — is the practice of reading Scripture slowly, attentively, and prayerfully so that the text becomes an encounter with God rather than merely the acquisition of information. It is not a modern invention. Origen practiced it in the 3rd century. Benedict of Nursia built it into his Rule in the 6th. Guigo II, a Carthusian monk, gave it its classic four-movement structure in the 12th century. The Second Vatican Council and Benedict XVI's Verbum Domini both commend it as a practice for every Catholic, not only monks.",
        ccc: "CCC 2708; Verbum Domini §87",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "Lectio divina is a modern spiritual technique developed for laypeople in the 20th century.",
        correct: false,
        feedback: "Lectio divina is patristic in origin and monastic in its classical formulation. Origen described prayerful engagement with Scripture in the 3rd century; Benedict's Rule (6th c.) structured the monk's day around it; Guigo II codified the four movements in the 12th c. What is modern is its recovery for laypeople — but the practice is as old as the Church's reading of the Word.",
      },
      {
        id: 2,
        sectionTitle: "The four movements: Lectio, Meditatio, Oratio, Contemplatio.",
        teaching: "Guigo II described lectio divina as a ladder with four rungs. Lectio: read the passage slowly, aloud if possible, noticing any word or phrase that catches your attention. Meditatio: stay with that word — turn it over, repeat it, ask what God is saying through it to you now. Oratio: respond to God in prayer — not a prepared speech but whatever your honest reaction is: gratitude, petition, confusion, desire. Contemplatio: rest. Stop talking. Simply be present to God who has spoken. The movement is from the text, to the mind, to the heart, to silence.",
        ccc: "CCC 2700–2704",
        mechanic: "sequence",
        prompt: "Arrange the four movements of lectio divina in the correct order:",
        words: [
          "Contemplatio — rest silently in God's presence",
          "Oratio — respond to God in honest prayer",
          "Lectio — read the passage slowly",
          "Meditatio — reflect on what stands out",
        ],
        correct: [
          "Lectio — read the passage slowly",
          "Meditatio — reflect on what stands out",
          "Oratio — respond to God in honest prayer",
          "Contemplatio — rest silently in God's presence",
        ],
        feedback: "Guigo's image is a ladder: 'Reading seeks the sweetness of the blessed life; meditation perceives it; prayer asks for it; contemplation tastes it.' Each rung presupposes the one below. Skipping lectio to reach contemplation produces vague spiritual feeling untethered from what God has actually said. The discipline is that the prayer grows from the text.",
      },
      {
        id: 3,
        sectionTitle: "How to choose a passage.",
        teaching: "For beginners, the Gospels are the natural starting point — specifically the synoptic passages (Matthew, Mark, Luke) where Jesus acts, speaks, and encounters people. A single paragraph is enough; lectio divina is not about covering ground. The Church also recommends following the daily Mass readings as a way of praying with the whole Church simultaneously. The Psalms are the other great starting point — they are Scripture that is already prayer, already addressed to God, and they cover the full range of human experience before God.",
        ccc: "CCC 2585–2589",
        mechanic: "multiple_choice",
        prompt: "Which of the following does the Church most commonly recommend as a starting point for lectio divina?",
        options: [
          "The Letters of Paul, beginning with Romans",
          "The Book of Revelation, for its rich symbolism",
          "The Gospels and the Psalms",
          "The Old Testament historical books (Joshua, Judges, Kings)",
        ],
        correct: "The Gospels and the Psalms",
        feedback: "The Gospels because they are the direct record of Jesus — the Word made flesh — speaking and acting. You are not just reading about Jesus; you are present to him. The Psalms because they are the prayer book of Israel and of Christ himself — he prayed them on the cross. Every human disposition before God is in the Psalms: praise, lament, confusion, trust, gratitude, anger. You will always find yourself there.",
      },
      {
        id: 4,
        sectionTitle: "What meditatio is — and is not.",
        teaching: "Meditatio in the patristic and medieval tradition means rumination — the slow chewing of a word or phrase, the way a cow chews cud (the image is theirs, not mine). It is not analysis or exegesis. It is not trying to extract a theological point. It is repeating the word quietly, sitting with it, letting it work on you. 'Come to me, all you who are weary.' Just that sentence. Repeated. Held. Let it locate you. This is different from academic study of Scripture — both are valuable, but they serve different purposes.",
        ccc: "CCC 2706",
        mechanic: "fill_blank",
        prompt: "Complete the description of meditatio:",
        sentence: "Meditatio is not [BLANK] or theological analysis — it is the slow [BLANK] of a word or phrase, letting it work on the heart.",
        blanks: [
          { options: ["exegesis", "prayer", "reading", "silence"], correct: "exegesis" },
          { options: ["rumination", "memorisation", "study", "repetition"], correct: "rumination" },
        ],
        feedback: "The Fathers used the Latin word ruminatio — the same word for a ruminant animal chewing its food slowly to extract full nourishment. Cassiodorus, Benedict, and Bernard all use this image. The point is that Scripture's nourishment is not extracted at speed. A single verse of the Psalms, held for twenty minutes in quiet repetition, can do more than reading three chapters quickly. The Word works differently at different speeds.",
      },
      {
        id: 5,
        sectionTitle: "The difference between reading Scripture and being read by it.",
        teaching: "There is a difference between reading Scripture and being read by it. Academic reading positions you as the subject: you approach the text, analyse it, extract meaning, move on. Lectio divina reverses the direction: you come to the text as an object — as one who is addressed. The assumption is that God is speaking to you through this passage, today, in your specific situation. This requires a posture of docility — 'Speak, Lord, your servant is listening' (1 Samuel 3:9). It requires slowing down enough to be spoken to. It is this posture that transforms reading into prayer.",
        ccc: "CCC 2716",
        mechanic: "tap_correct",
        prompt: "What posture does lectio divina require that distinguishes it from ordinary reading?",
        options: [
          "Critical distance — keeping an analytical eye on the text",
          "Docility — coming as one who is addressed and ready to listen",
          "Scholarly preparation — knowing the historical context first",
          "Emotional receptivity — waiting to feel moved by the text",
        ],
        correct: "Docility — coming as one who is addressed and ready to listen",
        feedback: "Docility is the precise word — from the Latin docilis: teachable, capable of being instructed. It is not passivity or emotionalism. It is the active disposition of one who has come to be taught. Samuel's words — 'Speak, Lord, your servant is listening' — are the model. He is not passive; he has positioned himself to receive. Emotion may follow, but it is not the goal. The goal is being spoken to by the living God through his Word.",
      },
    ],
  },

  // ═══════════════════════════════════════════════════════════════
  // JESUS CHRIST — Foundation tier (C1–C5)
  // ═══════════════════════════════════════════════════════════════

  C1: {
    id: "C1",
    title: "The Incarnation",
    subtitle: "God became man — and why it had to be that way",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "C — Jesus Christ",
    prereqs: ["A2", "B3"],
    ccc_primary: "CCC 456–483; 512–521",
    doctors: "Athanasius, De Incarnatione; Leo the Great, Tome; Council of Chalcedon (451)",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "True God and true man",
        teaching: "The Incarnation is the claim that the eternal Son of God — the Second Person of the Trinity — took on a complete human nature. He did not merely appear human. He did not inhabit a human body like a tenant. He became fully human while remaining fully divine. The Council of Chalcedon (451) defined this: two natures, divine and human, united in one Person 'without confusion, without change, without division, without separation.' (CCC 464–469)",
        ccc: "CCC 464–469",
        mechanic: "multiple_choice",
        prompt: "The Council of Chalcedon defined that in Christ there are:",
        options: [
          "Two persons, one divine and one human",
          "One nature that is a mixture of divine and human",
          "Two natures, divine and human, united in one Person without confusion",
          "A divine person who took on the appearance of a human body"
        ],
        correct: "Two natures, divine and human, united in one Person without confusion",
        feedback: "Each wrong option is a historical heresy. Two persons = Nestorianism. One mixed nature = Monophysitism. Mere appearance = Docetism. Chalcedon's formula is precise because every imprecise alternative was tried and failed."
      },
      {
        id: 2,
        sectionTitle: "Why God became man",
        teaching: "Why did God become man? The Catechism gives four reasons: to save us by reconciling us with God, so that we might know God's love, to be our model of holiness, and to make us 'partakers of the divine nature' (2 Peter 1:4). Athanasius summarized it radically: 'God became man so that man might become God' — not that we become divine in nature, but that we participate in divine life through grace. (CCC 456–460)",
        ccc: "CCC 456–460",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "The Incarnation was necessary only because humanity sinned — if Adam had not fallen, God would not have become man.",
        correct: false,
        feedback: "This is debated among theologians. The Franciscan tradition (Duns Scotus) holds that the Incarnation was always part of God's plan — not merely a response to sin but the culmination of creation. The Catechism lists four reasons, only one of which is redemption from sin."
      },
      {
        id: 3,
        sectionTitle: "Theotokos — Mother of God",
        teaching: "Mary's role in the Incarnation is not decorative. The Council of Ephesus (431) defined her as Theotokos — 'God-bearer' or 'Mother of God.' This title is not primarily about Mary. It is a Christological claim: the child she bore was not merely human. If Mary is not the Mother of God, then the person she bore is not God — and the Incarnation collapses. (CCC 495; 509)",
        ccc: "CCC 495; 509",
        mechanic: "fill_blank",
        prompt: "Complete the definition:",
        sentence: "The Council of Ephesus defined Mary as [BLANK] — meaning '[BLANK] of God.'",
        blanks: [
          { options: ["Theotokos", "Christotokos", "Anthropotokos", "Mediatrix"], correct: "Theotokos" },
          { options: ["Bearer", "Servant", "Vessel", "Image"], correct: "Bearer" }
        ],
        feedback: "Nestorius wanted to call Mary 'Christotokos' (bearer of Christ) to avoid saying God was born. Ephesus rejected this because it splits Christ into two persons. If the person born of Mary is one Person who is God, then Mary is rightly called God-bearer."
      },
      {
        id: 4,
        sectionTitle: "A truly human life",
        teaching: "Jesus was born in poverty in Bethlehem, grew up in Nazareth as a carpenter's son, and was subject to his parents. He experienced hunger, fatigue, sorrow, and temptation. He wept at the death of Lazarus. He sweated blood in Gethsemane. None of this was pretend. The Son of God lived an authentically human life — which means human experience itself has been taken up into God. (CCC 512–534)",
        ccc: "CCC 512–534",
        mechanic: "multiple_choice",
        prompt: "Why does it matter that Jesus experienced genuine human suffering and limitation?",
        options: [
          "It proves he was not really divine",
          "It means human experience itself has been taken up into God",
          "It shows that suffering is always God's punishment",
          "It was necessary to trick the devil into thinking he was only human"
        ],
        correct: "It means human experience itself has been taken up into God",
        feedback: "The Incarnation does not just save us from above — it transforms human experience from within. Every human suffering, limitation, and joy has been lived by God himself. This is why the Church can say suffering is redemptive, not merely endured."
      },
      {
        id: 5,
        sectionTitle: "The four Christological Councils",
        teaching: "The Incarnation brings together claims that seem impossible: the infinite enters the finite, the eternal enters time, the Creator becomes a creature. The early Church spent four centuries and four major Councils (Nicaea, Constantinople, Ephesus, Chalcedon) defining this mystery. Each Council addressed a specific error. (CCC 464–469)",
        ccc: "CCC 464–469",
        mechanic: "sequence",
        prompt: "Arrange the four Christological Councils in chronological order:",
        words: ["Chalcedon (two natures, one Person)", "Ephesus (Mary is Theotokos)", "Nicaea (Son is consubstantial with Father)", "Constantinople (full divinity of the Holy Spirit)"],
        correct: ["Nicaea (Son is consubstantial with Father)", "Constantinople (full divinity of the Holy Spirit)", "Ephesus (Mary is Theotokos)", "Chalcedon (two natures, one Person)"],
        feedback: "325, 381, 431, 451 — each Council built on the last. Nicaea established the Son's full divinity. Constantinople affirmed the Spirit's. Ephesus protected the unity of Christ's person. Chalcedon defined how two natures coexist in one Person."
      }
    ],
    prayer: {
      title: "The Angelus",
      text: [
        "The Angel of the Lord declared unto Mary,",
        "and she conceived of the Holy Spirit.",
        "Hail Mary, full of grace...",
        "Behold the handmaid of the Lord.",
        "Be it done unto me according to thy word.",
        "Hail Mary, full of grace...",
        "And the Word was made flesh,",
        "and dwelt among us.",
        "Hail Mary, full of grace...",
        "Pray for us, O holy Mother of God,",
        "that we may be made worthy of the promises of Christ.",
        "Amen."
      ],
      source: "Traditional Angelus prayer",
      note: "The Angelus is the Incarnation prayed three times daily — morning, noon, and evening. Each verse moves through the mystery: annunciation, Mary's fiat, and the Word made flesh."
    }
  },

  C2: {
    id: "C2",
    title: "Life & Ministry of Jesus",
    subtitle: "What he taught, what he did, and why it matters",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "C — Jesus Christ",
    prereqs: ["C1"],
    ccc_primary: "CCC 512–570",
    doctors: "Augustine, Sermon on the Mount; Aquinas, ST III Q.35–45",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "Baptism and the Trinity revealed",
        teaching: "Jesus' public ministry began with his baptism by John in the Jordan. The heavens opened, the Spirit descended like a dove, and the Father's voice declared: 'This is my beloved Son.' This is a Trinitarian revelation — all three Persons are present and active. Jesus' baptism does not cleanse him of sin (he has none) but inaugurates his mission and prefigures Christian baptism. (CCC 535–537)",
        ccc: "CCC 535–537",
        mechanic: "multiple_choice",
        prompt: "At Jesus' baptism, all three Persons of the Trinity are revealed. The Father speaks, the Son is baptized, and:",
        options: [
          "An angel appears with a scroll",
          "The Spirit descends like a dove",
          "Moses and Elijah appear beside Jesus",
          "The Temple curtain is torn"
        ],
        correct: "The Spirit descends like a dove",
        feedback: "The baptism is the first public manifestation of the Trinity in Christ's ministry. It inaugurates everything that follows — the temptation, the teaching, the miracles, and ultimately the cross."
      },
      {
        id: 2,
        sectionTitle: "Miracles as signs",
        teaching: "Jesus' miracles are not magic tricks designed to impress. Each miracle is a sign — it reveals something about who Jesus is and what the Kingdom of God looks like. Healing the sick shows the Kingdom restores wholeness. Feeding the multitude prefigures the Eucharist. Raising the dead anticipates the resurrection. The miracles are theology enacted in the physical world. (CCC 547–550)",
        ccc: "CCC 547–550",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "Jesus' miracles were primarily displays of power meant to prove he was God.",
        correct: false,
        feedback: "The miracles are signs of the Kingdom, not power displays. Jesus actually refused to perform miracles as mere proof (see the temptation narrative). Each miracle reveals the nature of God's reign: wholeness, abundance, life, mercy."
      },
      {
        id: 3,
        sectionTitle: "The Beatitudes",
        teaching: "The Sermon on the Mount (Matthew 5–7) is Jesus' most sustained moral teaching. It begins with the Beatitudes — eight declarations that invert the world's values. 'Blessed are the poor in spirit, for theirs is the kingdom of heaven.' The Beatitudes are not rules to follow. They are descriptions of the character formed by grace — the portrait of what a person looks like when they are living in the Kingdom. (CCC 1716–1717)",
        ccc: "CCC 1716–1717",
        mechanic: "fill_blank",
        prompt: "Complete the teaching:",
        sentence: "The Beatitudes are not rules to follow — they are descriptions of the [BLANK] formed by [BLANK].",
        blanks: [
          { options: ["character", "behavior", "obedience", "reward"], correct: "character" },
          { options: ["grace", "effort", "law", "discipline"], correct: "grace" }
        ],
        feedback: "The Beatitudes describe the kind of person God is making — not a moral checklist but a portrait. When Jesus says 'blessed are the merciful,' he is describing what a graced person naturally becomes, not issuing a command to be more merciful by willpower."
      },
      {
        id: 4,
        sectionTitle: "The Twelve Apostles",
        teaching: "Jesus chose twelve apostles — not randomly, but as a deliberate sign. Israel had twelve tribes. Jesus reconstitutes Israel around himself. He gives the apostles authority to teach, govern, and sanctify. Peter is named 'rock' and given the keys of the kingdom. This is not a loose fellowship — it is the foundation of an institution that will outlast the Roman Empire. (CCC 551–553)",
        ccc: "CCC 551–553",
        mechanic: "multiple_choice",
        prompt: "Why did Jesus choose exactly twelve apostles?",
        options: [
          "Twelve was considered a lucky number in Jewish culture",
          "To mirror the twelve tribes and reconstitute Israel around himself",
          "Because he needed twelve witnesses for Roman legal requirements",
          "Each apostle represented one month of the year"
        ],
        correct: "To mirror the twelve tribes and reconstitute Israel around himself",
        feedback: "The Twelve are not a committee. They are the patriarchs of the new Israel. Jesus explicitly links them to Israel's twelve tribes (Matthew 19:28). This act is the foundation of the Church's apostolic structure."
      },
      {
        id: 5,
        sectionTitle: "The shape of the ministry",
        teaching: "Jesus' ministry follows a pattern visible across the Gospels: proclamation of the Kingdom, call to repentance and faith, teaching through parables and discourse, demonstration through miracles and signs, formation of the apostles, and the journey toward Jerusalem and the cross. Nothing in his ministry is accidental — each phase prepares for what follows. (CCC 541–556)",
        ccc: "CCC 541–556",
        mechanic: "sequence",
        prompt: "Arrange these phases of Jesus' ministry in order:",
        words: ["Journey toward Jerusalem and the cross", "Proclamation of the Kingdom", "Formation of the apostles", "Teaching through parables and miracles"],
        correct: ["Proclamation of the Kingdom", "Teaching through parables and miracles", "Formation of the apostles", "Journey toward Jerusalem and the cross"],
        feedback: "The pattern is: announce, demonstrate, form, sacrifice. Jesus first proclaims the Kingdom, then shows what it looks like, then prepares leaders to continue it, then gives his life to accomplish it."
      }
    ],
    prayer: {
      title: "Prayer of St. Francis",
      text: [
        "Lord, make me an instrument of your peace.",
        "Where there is hatred, let me sow love;",
        "where there is injury, pardon;",
        "where there is doubt, faith;",
        "where there is despair, hope;",
        "where there is darkness, light;",
        "where there is sadness, joy.",
        "O Divine Master, grant that I may not so much seek",
        "to be consoled as to console,",
        "to be understood as to understand,",
        "to be loved as to love.",
        "For it is in giving that we receive,",
        "it is in pardoning that we are pardoned,",
        "and it is in dying that we are born to eternal life.",
        "Amen."
      ],
      source: "Attributed to St. Francis of Assisi",
      note: "This prayer embodies what Jesus' ministry taught: the Kingdom inverts the world's logic. Giving is receiving. Pardoning is being pardoned. Dying is living."
    }
  },

  C3: {
    id: "C3",
    title: "The Paschal Mystery",
    subtitle: "His death is not a tragedy — it is the plan",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "C — Jesus Christ",
    prereqs: ["C2"],
    ccc_primary: "CCC 571–623",
    doctors: "Anselm, Cur Deus Homo; Leo the Great, Sermon 55; Aquinas, ST III Q.46–59",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "One saving event",
        teaching: "The Paschal Mystery is the term for Christ's suffering, death, and resurrection taken as a single saving event. It is not three separate things that happened in sequence. The cross and the resurrection are two dimensions of one act of salvation. The word 'Paschal' comes from Pesach — Passover. Christ is the true Passover lamb whose blood delivers humanity from death. (CCC 571–573)",
        ccc: "CCC 571–573",
        mechanic: "multiple_choice",
        prompt: "The term 'Paschal Mystery' refers to:",
        options: [
          "Jesus' birth in Bethlehem",
          "The Last Supper and the institution of the Eucharist",
          "Christ's suffering, death, and resurrection as one saving event",
          "The descent of the Holy Spirit at Pentecost"
        ],
        correct: "Christ's suffering, death, and resurrection as one saving event",
        feedback: "The Paschal Mystery is not just Good Friday. It is Good Friday and Easter Sunday understood as inseparable — two aspects of one divine act. Separating them produces either despair (death without resurrection) or cheap grace (resurrection without the cost of the cross)."
      },
      {
        id: 2,
        sectionTitle: "Not an accident",
        teaching: "Jesus' death was not an accident, a tragedy, or a failure that God improvised around. It was the predetermined plan. Jesus himself said: 'No one takes my life from me. I lay it down of my own accord' (John 10:18). The cross is not where God's plan went wrong — it is where God's plan went deepest. Isaiah 53 described it seven centuries before it happened. (CCC 599–605)",
        ccc: "CCC 599–605",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "Jesus' crucifixion was an unexpected tragedy that God turned into something good after the fact.",
        correct: false,
        feedback: "Acts 2:23: Christ was 'delivered up according to the definite plan and foreknowledge of God.' The cross was not plan B. It was the definite plan from before creation."
      },
      {
        id: 3,
        sectionTitle: "What the cross accomplished",
        teaching: "What did the cross accomplish? The Catholic tradition uses several complementary images: sacrifice (Christ offered himself as the perfect victim), redemption (he paid the ransom to free us from bondage), satisfaction (he made reparation for the offense of sin), and substitution (he bore what we deserved). No single image captures the full reality — together they illuminate different faces of one mystery. (CCC 613–617)",
        ccc: "CCC 613–617",
        mechanic: "fill_blank",
        prompt: "Complete the teaching:",
        sentence: "Christ's death is understood as [BLANK] (he offered himself), [BLANK] (he freed us from bondage), satisfaction, and substitution.",
        blanks: [
          { options: ["sacrifice", "punishment", "defeat", "example"], correct: "sacrifice" },
          { options: ["redemption", "inspiration", "demonstration", "negotiation"], correct: "redemption" }
        ],
        feedback: "The Church resists reducing the cross to any single theory. Sacrifice emphasizes offering. Redemption emphasizes freedom. Satisfaction emphasizes justice. Substitution emphasizes love. Together they describe the inexhaustible meaning of Christ's death."
      },
      {
        id: 4,
        sectionTitle: "The Eucharist instituted",
        teaching: "At the Last Supper, Jesus took bread and said 'This is my body, given for you' and took wine and said 'This is my blood of the new covenant.' He then commanded: 'Do this in remembrance of me.' In this act, Jesus instituted the Eucharist — making the sacrifice of the cross perpetually present in the life of the Church. The Mass is not a new sacrifice. It is the same sacrifice, made sacramentally present. (CCC 610–611; 1362–1367)",
        ccc: "CCC 610–611; 1362–1367",
        mechanic: "multiple_choice",
        prompt: "The Eucharist, instituted at the Last Supper, makes present:",
        options: [
          "A symbolic reminder of Jesus' death",
          "A new sacrifice offered each time Mass is celebrated",
          "The same sacrifice of the cross, sacramentally present",
          "A community meal of fellowship and thanksgiving"
        ],
        correct: "The same sacrifice of the cross, sacramentally present",
        feedback: "The Mass does not repeat Calvary — there is one sacrifice, offered once for all. But the Eucharist makes that one sacrifice present across time so that every generation can participate in it."
      },
      {
        id: 5,
        sectionTitle: "The Paschal Triduum",
        teaching: "The events of the Paschal Triduum — the three holiest days of the Christian year — follow a precise sequence. Holy Thursday: the Last Supper and institution of the Eucharist. Good Friday: the crucifixion and death. Holy Saturday: Christ descends to the dead. Easter Sunday: the resurrection. Each day is a distinct movement in the one Paschal Mystery. (CCC 617–625; 631–637)",
        ccc: "CCC 617–625; 631–637",
        mechanic: "sequence",
        prompt: "Arrange the events of the Paschal Triduum in order:",
        words: ["Easter Sunday: the resurrection", "Holy Thursday: the Last Supper", "Holy Saturday: descent to the dead", "Good Friday: the crucifixion"],
        correct: ["Holy Thursday: the Last Supper", "Good Friday: the crucifixion", "Holy Saturday: descent to the dead", "Easter Sunday: the resurrection"],
        feedback: "The Triduum is the heartbeat of the liturgical year. Every other feast and season orbits around these three days."
      }
    ],
    prayer: {
      title: "Stations of the Cross Prayer",
      text: [
        "We adore you, O Christ, and we bless you,",
        "because by your holy cross",
        "you have redeemed the world.",
        "Lord Jesus, help me to walk with you",
        "on the way of the cross.",
        "Let me see in your suffering",
        "the depth of your love.",
        "And in your resurrection,",
        "the power of your victory.",
        "Amen."
      ],
      source: "Traditional Stations devotion",
      note: "This prayer accompanies the Stations of the Cross — fourteen scenes from Jesus' passion, walked meditatively in every Catholic church. It is the Paschal Mystery prayed with the body."
    }
  },

  C4: {
    id: "C4",
    title: "Resurrection & Ascension",
    subtitle: "He is risen — and that changes everything",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "C — Jesus Christ",
    prereqs: ["C3"],
    ccc_primary: "CCC 638–658; 659–667",
    doctors: "Augustine, City of God XXII; Aquinas, ST III Q.53–59",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "A historical event",
        teaching: "The resurrection is not a metaphor for the triumph of hope over despair. It is not a spiritual experience the disciples had after Jesus died. It is a historical event: the same Jesus who was crucified and buried was raised bodily from the dead on the third day. The tomb was empty. He appeared to individuals and groups over forty days. He ate fish. Thomas touched his wounds. Paul wrote: 'If Christ has not been raised, your faith is futile.' (CCC 639–644)",
        ccc: "CCC 639–644",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "The resurrection of Jesus can be understood as a powerful spiritual metaphor rather than a literal, bodily event.",
        correct: false,
        feedback: "The Church does not hedge here. The resurrection is either history or it is nothing. The disciples did not die for a metaphor. Paul staked everything on the claim that it actually happened — and said if it didn't, Christianity is a fraud."
      },
      {
        id: 2,
        sectionTitle: "The glorified body",
        teaching: "The risen body of Jesus is real but transformed. He passes through locked doors, yet invites Thomas to touch his wounds. He appears and disappears, yet eats broiled fish. His body is the same body that was crucified — the wounds are still there — but it is now glorified, no longer subject to death. This is what the Church means by 'resurrection of the body' in the Creed: not resuscitation to the same mortal life, but transformation to a new kind of life. (CCC 645–646)",
        ccc: "CCC 645–646",
        mechanic: "multiple_choice",
        prompt: "Jesus' risen body is best described as:",
        options: [
          "A completely new body that replaced the crucified one",
          "The same body, fully healed and restored to normal life",
          "The same body, but now glorified and transformed beyond mortality",
          "A spiritual presence that appeared to have physical form"
        ],
        correct: "The same body, but now glorified and transformed beyond mortality",
        feedback: "The continuity (same wounds, same person) and the transformation (passes through doors, no longer mortal) are both essential. Resurrection is not resuscitation — Lazarus was raised to die again. Christ was raised to a new mode of existence that death cannot touch."
      },
      {
        id: 3,
        sectionTitle: "The Ascension",
        teaching: "The Ascension is not Jesus leaving. It is Jesus reigning. He does not go 'away' — he enters into the fullness of his authority over all creation. 'Seated at the right hand of the Father' is not a location — it is a claim about sovereignty. From this position he sends the Spirit, intercedes for us, and will come again to judge the living and the dead. (CCC 659–664)",
        ccc: "CCC 659–664",
        mechanic: "fill_blank",
        prompt: "Complete the teaching:",
        sentence: "'Seated at the right hand of the Father' is not a [BLANK] — it is a claim about [BLANK].",
        blanks: [
          { options: ["location", "metaphor", "prophecy", "reward"], correct: "location" },
          { options: ["sovereignty", "distance", "departure", "absence"], correct: "sovereignty" }
        ],
        feedback: "The Ascension is the enthronement of Christ as Lord of all. He is not less present after the Ascension — he is present in a new way: through the Spirit, the Eucharist, the Church."
      },
      {
        id: 4,
        sectionTitle: "The Second Coming",
        teaching: "The Creed says Christ 'will come again in glory to judge the living and the dead.' This is the doctrine of the Second Coming (Parousia). The Church does not know when it will happen — Jesus himself said 'no one knows the day or the hour.' But the Church lives in confident expectation that history is going somewhere. The story has an ending, and the ending is Christ. (CCC 668–677)",
        ccc: "CCC 668–677",
        mechanic: "multiple_choice",
        prompt: "What does the Church teach about Christ's return?",
        options: [
          "It already happened spiritually at Pentecost",
          "It will happen at a date that can be calculated from Scripture",
          "The time is unknown, but the Church lives in confident expectation",
          "It is a symbolic way of saying the Church will gradually improve the world"
        ],
        correct: "The time is unknown, but the Church lives in confident expectation",
        feedback: "The Second Coming is not a code to be cracked or a timeline to be calculated. It is a promise that grounds Christian hope: the same Jesus who ascended will return, and when he does, he will bring to completion everything he began."
      },
      {
        id: 5,
        sectionTitle: "The post-resurrection sequence",
        teaching: "The post-resurrection events follow a specific theological sequence: Christ rises, appears to witnesses over forty days to establish the reality of the resurrection, ascends to the Father to take his throne, and then sends the Holy Spirit at Pentecost to empower the Church. Each event depends on the one before it. (CCC 638–667; 731–732)",
        ccc: "CCC 638–667; 731–732",
        mechanic: "sequence",
        prompt: "Arrange the post-resurrection events in order:",
        words: ["Sends the Holy Spirit at Pentecost", "Rises from the dead", "Ascends to the Father", "Appears to witnesses over forty days"],
        correct: ["Rises from the dead", "Appears to witnesses over forty days", "Ascends to the Father", "Sends the Holy Spirit at Pentecost"],
        feedback: "The sequence matters: resurrection establishes the fact, the appearances confirm it to witnesses, the Ascension enthrones Christ, and Pentecost empowers the Church to carry the mission forward."
      }
    ],
    prayer: {
      title: "Regina Caeli",
      text: [
        "Queen of Heaven, rejoice, alleluia.",
        "For he whom you did merit to bear, alleluia.",
        "Has risen, as he said, alleluia.",
        "Pray for us to God, alleluia.",
        "Rejoice and be glad, O Virgin Mary, alleluia.",
        "For the Lord has truly risen, alleluia.",
        "Amen."
      ],
      source: "Traditional Regina Caeli (Queen of Heaven)",
      note: "Prayed during the Easter season in place of the Angelus. It connects Mary's role in the Incarnation to Christ's resurrection — the child she bore has conquered death."
    }
  },

  C5: {
    id: "C5",
    title: "The Holy Spirit & Pentecost",
    subtitle: "The Church is born — the mission begins",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "C — Jesus Christ",
    prereqs: ["C4"],
    ccc_primary: "CCC 683–747",
    doctors: "Augustine, On the Trinity; Basil, On the Holy Spirit",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "A Person, not a force",
        teaching: "The Holy Spirit is the Third Person of the Trinity — not a force, not an energy, not God's influence. He is a Person with intellect and will, co-equal and co-eternal with the Father and the Son. The Nicene Creed calls him 'the Lord, the giver of life, who proceeds from the Father and the Son, who with the Father and the Son is adored and glorified.' (CCC 685–686)",
        ccc: "CCC 685–686",
        mechanic: "multiple_choice",
        prompt: "The Holy Spirit is:",
        options: [
          "God's impersonal power or energy at work in the world",
          "A created being sent by the Father to help humanity",
          "The Third Person of the Trinity, co-equal with Father and Son",
          "A symbolic way of describing God's presence in the Church"
        ],
        correct: "The Third Person of the Trinity, co-equal with Father and Son",
        feedback: "The Spirit is not 'less' God than the Father or the Son. Calling the Spirit an 'it' or a 'force' is the most common theological error in everyday Catholic speech."
      },
      {
        id: 2,
        sectionTitle: "Pentecost reverses Babel",
        teaching: "Pentecost is not merely the birthday of the Church — it is the moment when the risen Christ fulfills his promise to send 'another Advocate' (John 14:16). The Spirit descended on the apostles as tongues of fire, and they began speaking in languages they had never learned. This reversal of Babel is deliberate: where sin scattered humanity into mutual incomprehension, the Spirit gathers humanity back into communion. (CCC 731–732; 1076)",
        ccc: "CCC 731–732; 1076",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "Pentecost reversed the scattering of Babel by gathering diverse peoples back into communion through the Spirit.",
        correct: true,
        feedback: "At Babel, one language was confused into many and humanity was scattered. At Pentecost, many languages were understood as one and humanity was gathered. The parallel is not accidental — Luke constructed his narrative to make it explicit."
      },
      {
        id: 3,
        sectionTitle: "The seven gifts",
        teaching: "The Spirit works in the Church through seven gifts — wisdom, understanding, counsel, fortitude, knowledge, piety, and fear of the Lord — drawn from Isaiah 11:2. These are not natural talents. They are supernatural dispositions that make us responsive to the Spirit's guidance. They are given in Baptism and strengthened in Confirmation. (CCC 1830–1831)",
        ccc: "CCC 1830–1831",
        mechanic: "fill_blank",
        prompt: "Complete the teaching:",
        sentence: "The seven gifts of the Holy Spirit are supernatural [BLANK] that make us responsive to the Spirit's [BLANK].",
        blanks: [
          { options: ["dispositions", "talents", "emotions", "rewards"], correct: "dispositions" },
          { options: ["guidance", "power", "approval", "comfort"], correct: "guidance" }
        ],
        feedback: "Gifts are not skills you develop. They are capacities God gives you for receiving his direction. Wisdom is not intelligence — it is the ability to see reality as God sees it. Fear of the Lord is not terror — it is awe before the infinite."
      },
      {
        id: 4,
        sectionTitle: "The Spirit in the Church",
        teaching: "The Spirit's role in the Church is not limited to Pentecost. He is the source of all grace in the sacraments, the inspiration of Scripture, the guide of the Magisterium, the power behind every act of genuine holiness, and the bond of unity in the Body of Christ. Without the Spirit, the Church is an institution. With the Spirit, the Church is the living Body of Christ. (CCC 737–741)",
        ccc: "CCC 737–741",
        mechanic: "multiple_choice",
        prompt: "Which of these is NOT a role of the Holy Spirit in the Church?",
        options: [
          "Source of grace in the sacraments",
          "Inspiration of Sacred Scripture",
          "Replacement of Christ's presence after the Ascension",
          "Bond of unity in the Body of Christ"
        ],
        correct: "Replacement of Christ's presence after the Ascension",
        feedback: "The Spirit does not replace Christ — he makes Christ present in a new way. The Spirit is the 'other Advocate' who continues Christ's work, not a substitute for a departed founder."
      },
      {
        id: 5,
        sectionTitle: "The Spirit across salvation history",
        teaching: "The Spirit's work follows a pattern across salvation history: he hovered over the waters at creation, spoke through the prophets, overshadowed Mary at the Incarnation, descended on Jesus at his baptism, and was poured out on the Church at Pentecost. The same Spirit who was at work from the beginning is at work now. (CCC 702–716; 731)",
        ccc: "CCC 702–716; 731",
        mechanic: "sequence",
        prompt: "Arrange the Spirit's activity in salvation history:",
        words: ["Poured out at Pentecost", "Hovered over creation", "Overshadowed Mary at the Incarnation", "Spoke through the prophets"],
        correct: ["Hovered over creation", "Spoke through the prophets", "Overshadowed Mary at the Incarnation", "Poured out at Pentecost"],
        feedback: "The Spirit is not a late addition to the story. He has been active from the first verse of Genesis. Pentecost is not the Spirit's debut — it is the moment his work becomes visible, universal, and permanently constitutive of the Church."
      }
    ],
    prayer: {
      title: "Veni Creator Spiritus",
      text: [
        "Come, Holy Spirit, Creator blest,",
        "and in our souls take up thy rest;",
        "come with thy grace and heavenly aid",
        "to fill the hearts which thou hast made.",
        "O Comforter, to thee we cry,",
        "thou heavenly gift of God most high,",
        "thou fount of life and fire of love,",
        "and sweet anointing from above.",
        "Amen."
      ],
      source: "Veni Creator Spiritus, attr. Rabanus Maurus (9th c.)",
      note: "Traditionally prayed before studying theology, at ordinations, and at papal conclaves. If you are going to invoke the Spirit, this is the prayer the Church has used for over a thousand years."
    }
  },

  // ═══════════════════════════════════════════════════════════════
  // THE CHURCH & THE SACRAMENTS — Foundation tier (E1, F0, F1, M0, L0)
  // ═══════════════════════════════════════════════════════════════

  E1: {
    id: "E1",
    title: "What Is the Church?",
    subtitle: "One, Holy, Catholic, Apostolic",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "E — The Church",
    prereqs: ["C5"],
    ccc_primary: "CCC 748–870",
    doctors: "Cyprian, On the Unity of the Church; Vatican II, Lumen Gentium",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "Body of Christ",
        teaching: "The Church is not merely a human organization. It is the Body of Christ — the continuation of his presence in the world. Paul's metaphor is precise: just as a body has many parts but is one organism, so the baptized are many but constitute one Body with Christ as the head. The Church is simultaneously a visible institution and a mystical reality animated by the Holy Spirit. (CCC 787–795)",
        ccc: "CCC 787–795",
        mechanic: "multiple_choice",
        prompt: "According to Catholic teaching, the Church is:",
        options: [
          "A voluntary association of people who share beliefs about Jesus",
          "The Body of Christ — both a visible institution and a mystical reality",
          "A purely spiritual reality with no need for institutional structure",
          "A human organization that represents God's interests on earth"
        ],
        correct: "The Body of Christ — both a visible institution and a mystical reality",
        feedback: "Reducing the Church to either dimension alone is an error. Without the visible institution, the Church dissolves into private opinion. Without the mystical reality, the Church becomes mere bureaucracy."
      },
      {
        id: 2,
        sectionTitle: "The four marks",
        teaching: "The Creed describes the Church with four marks: one (unified in faith, sacraments, and governance), holy (set apart by God and animated by the Spirit), catholic (universal — for all peoples in all times), and apostolic (founded on the apostles and continuing their teaching through apostolic succession). These are not aspirations. They are claims about what the Church already is by God's design. (CCC 811–870)",
        ccc: "CCC 811–870",
        mechanic: "fill_blank",
        prompt: "Complete the four marks:",
        sentence: "The four marks of the Church are: one, [BLANK], catholic, and [BLANK].",
        blanks: [
          { options: ["holy", "perfect", "pure", "sacred"], correct: "holy" },
          { options: ["apostolic", "evangelical", "universal", "divine"], correct: "apostolic" }
        ],
        feedback: "Holy does not mean sinless — it means set apart by God and sustained by his grace. Apostolic does not mean old-fashioned — it means the Church's authority traces in unbroken succession to the apostles whom Christ commissioned."
      },
      {
        id: 3,
        sectionTitle: "Apostolic succession",
        teaching: "Apostolic succession means that every Catholic bishop can trace his ordination in an unbroken chain back to the apostles themselves. This is not a metaphor. It is a historical claim with documentary evidence. The bishop of Rome (the Pope) succeeds Peter, to whom Christ said: 'You are Peter, and on this rock I will build my Church' (Matthew 16:18). (CCC 857–862)",
        ccc: "CCC 857–862",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "Apostolic succession is a symbolic way of saying the Church honors the apostles' memory.",
        correct: false,
        feedback: "Apostolic succession is a historical and sacramental reality, not a metaphor. Every bishop is ordained by bishops who were ordained by bishops, in an unbroken chain to the apostles. This is what gives the Magisterium its authority."
      },
      {
        id: 4,
        sectionTitle: "Papal infallibility",
        teaching: "The Pope has a unique role: he is the successor of Peter and the visible head of the Church on earth. The doctrine of papal infallibility (defined at Vatican I, 1870) does not mean the Pope cannot sin or make mistakes. It means that when the Pope speaks ex cathedra — formally defining a doctrine of faith or morals for the whole Church — he is preserved from error by the Holy Spirit. This has been invoked explicitly only twice. (CCC 889–892)",
        ccc: "CCC 889–892",
        mechanic: "multiple_choice",
        prompt: "Papal infallibility means:",
        options: [
          "The Pope never sins or makes mistakes",
          "Everything the Pope says is guaranteed to be true",
          "When formally defining doctrine for the whole Church, the Pope is preserved from error",
          "The Pope can change any Church teaching at will"
        ],
        correct: "When formally defining doctrine for the whole Church, the Pope is preserved from error",
        feedback: "Infallibility is far more limited than people assume. It applies only to formal, solemn definitions of faith or morals. It has been explicitly invoked twice: the Immaculate Conception (1854) and the Assumption of Mary (1950)."
      },
      {
        id: 5,
        sectionTitle: "The hierarchy",
        teaching: "The Church has a specific hierarchical structure established by Christ. The Pope leads the universal Church. Bishops govern individual dioceses and are successors of the apostles. Priests serve parishes under their bishop's authority. Deacons serve in ministry of charity, word, and liturgy. The laity are called to sanctify the world through their daily lives. (CCC 871–887)",
        ccc: "CCC 871–887",
        mechanic: "sequence",
        prompt: "Arrange the Church's hierarchy from universal to local:",
        words: ["Priests (serve parishes)", "Pope (Bishop of Rome)", "Laity (sanctify the world)", "Bishops (govern dioceses)"],
        correct: ["Pope (Bishop of Rome)", "Bishops (govern dioceses)", "Priests (serve parishes)", "Laity (sanctify the world)"],
        feedback: "This is not a ranking of holiness — a layperson can be holier than a Pope. It is a structure of governance and authority that Christ himself established."
      }
    ],
    prayer: {
      title: "Prayer for the Church",
      text: [
        "Lord Jesus Christ,",
        "you built your Church on the rock of Peter's faith.",
        "Protect her from the storms of this age.",
        "Grant wisdom to our Pope and bishops,",
        "zeal to our priests and deacons,",
        "and holiness to all the faithful.",
        "May your Church be a sign of unity",
        "and an instrument of your peace",
        "in a divided world.",
        "Amen."
      ],
      source: "Traditional prayer for the Church",
      note: "Praying for the Church is not optional — it is a responsibility of every member. The Church is holy by God's gift but wounded by her members' sins. She needs your prayers."
    }
  },

  F0: {
    id: "F0",
    title: "The Seven Sacraments",
    subtitle: "Visible signs of invisible grace",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "F — The Sacraments",
    prereqs: ["E1"],
    ccc_primary: "CCC 1113–1134",
    doctors: "Augustine, Tractates on John; Aquinas, ST III Q.60–65",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "Ex opere operato",
        teaching: "A sacrament is a visible sign, instituted by Christ, that confers the grace it signifies. Water in Baptism, bread and wine in the Eucharist, oil in Anointing — these are not mere symbols. They actually accomplish what they represent. The technical term is ex opere operato: the sacrament works by the power of the rite itself, not by the holiness of the minister. A sinful priest validly baptizes. (CCC 1127–1128)",
        ccc: "CCC 1127–1128",
        mechanic: "multiple_choice",
        prompt: "The phrase ex opere operato means:",
        options: [
          "The sacrament works only if the minister is holy",
          "The sacrament depends on the faith of the person receiving it",
          "The sacrament confers grace by the power of the rite itself, regardless of the minister's holiness",
          "The sacrament is purely symbolic and depends on the community's belief"
        ],
        correct: "The sacrament confers grace by the power of the rite itself, regardless of the minister's holiness",
        feedback: "This protects the faithful from anxiety about their minister's worthiness. A baptism is valid regardless of the priest's personal holiness because it is Christ who acts in the sacrament, not the priest."
      },
      {
        id: 2,
        sectionTitle: "Seven — no more, no less",
        teaching: "There are exactly seven sacraments — no more, no less. Three are sacraments of initiation (Baptism, Confirmation, Eucharist), two are sacraments of healing (Reconciliation, Anointing of the Sick), and two are sacraments of service (Holy Orders, Matrimony). This number was formally defined at the Council of Trent (1547), though the Church had practiced all seven since the apostolic era. (CCC 1113–1121; 1210)",
        ccc: "CCC 1113–1121; 1210",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "The number of sacraments has varied throughout Church history, and seven was only decided at Trent.",
        correct: false,
        feedback: "Trent defined the number formally, but the Church did not invent new sacraments at Trent. All seven were practiced from the earliest centuries. What Trent did was close the debate definitively against Protestant reformers who wanted to reduce the number."
      },
      {
        id: 3,
        sectionTitle: "Baptismal character",
        teaching: "Baptism is the gateway to the sacramental life. It washes away original sin, makes us children of God, members of Christ and of his Church. It imprints an indelible spiritual mark (character) that can never be erased — which is why baptism can never be repeated. Even if you leave the Church and return, you are not re-baptized. The character remains. (CCC 1213–1274)",
        ccc: "CCC 1213–1274",
        mechanic: "fill_blank",
        prompt: "Complete the teaching:",
        sentence: "Baptism imprints an indelible spiritual [BLANK] that can never be erased, which is why it can never be [BLANK].",
        blanks: [
          { options: ["character", "feeling", "memory", "blessing"], correct: "character" },
          { options: ["repeated", "forgotten", "improved", "transferred"], correct: "repeated" }
        ],
        feedback: "The baptismal character is permanent. A baptized person who apostatizes and returns does not need re-baptism. The character is still there — the grace may need renewal through Reconciliation, but the mark itself is indelible."
      },
      {
        id: 4,
        sectionTitle: "Reconciliation",
        teaching: "Reconciliation (Confession) is Christ's gift of ongoing mercy. The priest acts in persona Christi — in the person of Christ — when he says 'I absolve you.' This is not the priest forgiving on his own authority. It is Christ forgiving through the priest. The seal of Confession is absolute: a priest may never, under any circumstances, reveal what is confessed. (CCC 1440–1470)",
        ccc: "CCC 1440–1470",
        mechanic: "multiple_choice",
        prompt: "When a priest absolves sins in Confession, he acts:",
        options: [
          "On his own authority as a spiritual counselor",
          "In persona Christi — in the person of Christ himself",
          "As a representative of the parish community",
          "On behalf of the bishop who delegated him"
        ],
        correct: "In persona Christi — in the person of Christ himself",
        feedback: "The priest is not the source of forgiveness — Christ is. The priest is the sacramental instrument through whom Christ acts."
      },
      {
        id: 5,
        sectionTitle: "Sacraments of initiation",
        teaching: "The seven sacraments follow the rhythm of human life. Baptism initiates you. Confirmation strengthens you. Eucharist nourishes you. Reconciliation heals your soul. Anointing heals in illness. Matrimony and Holy Orders direct your vocation. Together they accompany the Christian from birth to death. (CCC 1210–1211)",
        ccc: "CCC 1210–1211",
        mechanic: "sequence",
        prompt: "Arrange the three sacraments of initiation in the order they are received:",
        words: ["Eucharist", "Baptism", "Confirmation"],
        correct: ["Baptism", "Confirmation", "Eucharist"],
        feedback: "Born into the Church (Baptism), strengthened for mission (Confirmation), nourished for the journey (Eucharist). This is the order of the Easter Vigil, when catechumens receive all three in a single night."
      }
    ],
    prayer: {
      title: "Anima Christi",
      text: [
        "Soul of Christ, sanctify me.",
        "Body of Christ, save me.",
        "Blood of Christ, inebriate me.",
        "Water from the side of Christ, wash me.",
        "Passion of Christ, strengthen me.",
        "O good Jesus, hear me.",
        "Within thy wounds hide me.",
        "Permit me not to be separated from thee.",
        "From the wicked foe defend me.",
        "At the hour of my death call me,",
        "and bid me come to thee,",
        "that with thy saints I may praise thee",
        "for ever and ever. Amen."
      ],
      source: "Anima Christi (14th century)",
      note: "This prayer addresses Christ through the sacramental elements — soul, body, blood, water from his side. It is the sacraments prayed as poetry."
    }
  },

  F1: {
    id: "F1",
    title: "The Eucharist & the Mass",
    subtitle: "Source and summit of the Christian life",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "F — The Sacraments",
    prereqs: ["F0"],
    ccc_primary: "CCC 1322–1419",
    doctors: "Cyril of Jerusalem, Mystagogical Catechesis 5; Aquinas, ST III Q.73–83",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "Transubstantiation",
        teaching: "The Catholic Church teaches that in the Eucharist, the bread and wine become the actual Body and Blood of Jesus Christ. This is not a metaphor. The substance changes while the appearances (accidents) remain. This doctrine is called transubstantiation — defined at the Fourth Lateran Council (1215) and reaffirmed at Trent. What looks like bread is Christ. What tastes like wine is Christ. (CCC 1373–1377)",
        ccc: "CCC 1373–1377",
        mechanic: "multiple_choice",
        prompt: "The doctrine of transubstantiation teaches that:",
        options: [
          "Bread and wine symbolize Christ's body and blood",
          "Christ is spiritually present alongside the bread and wine",
          "The substance of bread and wine actually becomes Christ's Body and Blood",
          "The bread and wine become Christ only in the faith of the believer"
        ],
        correct: "The substance of bread and wine actually becomes Christ's Body and Blood",
        feedback: "This is the most radical claim in Catholic sacramental theology. It is not symbolism, not consubstantiation, and not purely subjective. The change is real, total, and objective."
      },
      {
        id: 2,
        sectionTitle: "Two tables, one banquet",
        teaching: "The Mass has two main parts: the Liturgy of the Word (readings from Scripture, homily, prayers of the faithful) and the Liturgy of the Eucharist (offertory, consecration, communion). These are not two separate events but two tables of one banquet — the table of God's Word and the table of Christ's Body. The pattern comes from Emmaus, where Jesus first explained the Scriptures and then broke bread. (CCC 1346–1355)",
        ccc: "CCC 1346–1355",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "The Liturgy of the Word and the Liturgy of the Eucharist are two separate services combined for convenience.",
        correct: false,
        feedback: "They are two halves of one integrated action. The Word prepares us to receive the Body. Separating them impoverishes both."
      },
      {
        id: 3,
        sectionTitle: "Source and summit",
        teaching: "Vatican II's Lumen Gentium called the Eucharist 'the source and summit of the Christian life.' Source because all grace flows from Christ's sacrifice made present in the Eucharist. Summit because the Eucharist is the highest act of worship the Church can offer — not our gift to God, but God's gift of himself to us, to which we respond with thanksgiving. (CCC 1324)",
        ccc: "CCC 1324",
        mechanic: "fill_blank",
        prompt: "Complete the teaching:",
        sentence: "The Eucharist is the [BLANK] and [BLANK] of the Christian life.",
        blanks: [
          { options: ["source", "beginning", "foundation", "center"], correct: "source" },
          { options: ["summit", "goal", "end", "peak"], correct: "summit" }
        ],
        feedback: "Source and summit — not one or the other. The Eucharist is where the Christian life comes from (source of grace) and where it is heading (the highest form of communion with God available this side of heaven)."
      },
      {
        id: 4,
        sectionTitle: "The Sunday obligation",
        teaching: "Catholics are obligated to attend Mass every Sunday and on holy days of obligation. This is not arbitrary rule-keeping. Sunday is the day of the resurrection — the 'Lord's Day.' The early Christians gathered for the breaking of bread on 'the first day of the week' (Acts 20:7). Deliberately missing Sunday Mass without serious reason is a grave matter. (CCC 1389; 2180–2183)",
        ccc: "CCC 1389; 2180–2183",
        mechanic: "multiple_choice",
        prompt: "Why are Catholics obligated to attend Mass on Sundays?",
        options: [
          "It is a Church rule that can be changed by the Pope",
          "Sunday Mass is the community's weekly social gathering",
          "Sunday is the day of the resurrection, and the Mass makes Christ's sacrifice present",
          "The obligation only applies during certain liturgical seasons"
        ],
        correct: "Sunday is the day of the resurrection, and the Mass makes Christ's sacrifice present",
        feedback: "The Sunday obligation flows from what the Eucharist IS. If the Mass truly makes present the sacrifice of Christ, then missing it voluntarily is refusing the most important thing God offers you each week."
      },
      {
        id: 5,
        sectionTitle: "The structure of the Mass",
        teaching: "The Mass follows a specific structure that dates to the earliest centuries of the Church. It begins with the Introductory Rites (gathering, penitential act, Gloria), moves to the Liturgy of the Word (readings, psalm, Gospel, homily, Creed, prayers), then to the Liturgy of the Eucharist (offertory, Eucharistic prayer, consecration, communion), and concludes with the Dismissal. (CCC 1348–1355)",
        ccc: "CCC 1348–1355",
        mechanic: "sequence",
        prompt: "Arrange the four main parts of the Mass in order:",
        words: ["Liturgy of the Eucharist", "Introductory Rites", "Dismissal", "Liturgy of the Word"],
        correct: ["Introductory Rites", "Liturgy of the Word", "Liturgy of the Eucharist", "Dismissal"],
        feedback: "Gather, hear, receive, go. The structure is not arbitrary — it is the shape of grace."
      }
    ],
    prayer: {
      title: "Prayer Before Communion",
      text: [
        "Lord, I am not worthy",
        "that you should enter under my roof,",
        "but only say the word",
        "and my soul shall be healed.",
        "Jesus, I believe that you are truly present",
        "in the Most Blessed Sacrament.",
        "I love you above all things",
        "and I desire to receive you into my soul.",
        "Amen."
      ],
      source: "Based on Matthew 8:8 and traditional communion prayers",
      note: "These words echo the centurion's faith. Every Catholic says a version of this at every Mass, just before receiving communion. It is the most honest prayer in the liturgy."
    }
  },

  M0: {
    id: "M0",
    title: "Mary & the Saints",
    subtitle: "The Mother of God and the communion of saints",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "M — Mary & the Saints",
    prereqs: ["C1"],
    ccc_primary: "CCC 484–511; 946–975",
    doctors: "Augustine, On Holy Virginity; John Paul II, Redemptoris Mater",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "Veneration, not worship",
        teaching: "Catholics do not worship Mary. They venerate her — which means they honor her as the greatest of all saints without placing her on the level of God. The distinction is precise: latria (worship) belongs to God alone. Hyperdulia (highest veneration) belongs to Mary. Dulia (veneration) belongs to the saints. Asking Mary to pray for you is no different in kind from asking a friend to pray for you — except that Mary is in the direct presence of God. (CCC 971; 2673–2679)",
        ccc: "CCC 971; 2673–2679",
        mechanic: "multiple_choice",
        prompt: "The Catholic distinction between worship and veneration of Mary is:",
        options: [
          "There is no distinction — Catholics worship Mary as divine",
          "Latria (worship) for God alone; hyperdulia (highest veneration) for Mary",
          "Mary receives the same worship as God but in a lesser degree",
          "Veneration of Mary was added at the Council of Trent and is optional"
        ],
        correct: "Latria (worship) for God alone; hyperdulia (highest veneration) for Mary",
        feedback: "This distinction has been in place since the early Church. Asking Mary to intercede is not worship — it is requesting prayer from a fellow member of the Body of Christ who happens to be in glory."
      },
      {
        id: 2,
        sectionTitle: "The Immaculate Conception",
        teaching: "The Immaculate Conception does not refer to Jesus' conception. It refers to Mary's. The doctrine, defined in 1854, teaches that Mary was preserved from the stain of original sin from the first moment of her conception — by a singular grace of God, in anticipation of Christ's merits. She was redeemed like all humans, but redeemed preventively rather than after the fact. (CCC 490–493)",
        ccc: "CCC 490–493",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "The Immaculate Conception refers to the virginal conception of Jesus in Mary's womb.",
        correct: false,
        feedback: "This is the most commonly confused Marian doctrine. The Immaculate Conception is about Mary, not Jesus. It means Mary was conceived without original sin — preserved by God's grace in advance of Christ's saving work."
      },
      {
        id: 3,
        sectionTitle: "The communion of saints",
        teaching: "The communion of saints is the belief that all members of the Church — those alive on earth (Church Militant), those being purified in purgatory (Church Suffering), and those in heaven (Church Triumphant) — are united in one Body. Death does not sever the bond. The saints in heaven pray for us. We pray for the souls in purgatory. The whole Church, living and dead, is one communion. (CCC 946–962)",
        ccc: "CCC 946–962",
        mechanic: "fill_blank",
        prompt: "Complete the three states:",
        sentence: "The three states of the Church are: Church [BLANK] (on earth), Church Suffering (in purgatory), and Church [BLANK] (in heaven).",
        blanks: [
          { options: ["Militant", "Active", "Visible", "Living"], correct: "Militant" },
          { options: ["Triumphant", "Glorious", "Eternal", "Perfected"], correct: "Triumphant" }
        ],
        feedback: "Militant does not mean aggressive — it means the Church on earth is still in spiritual combat. Triumphant means the Church in heaven has completed the journey."
      },
      {
        id: 4,
        sectionTitle: "The Assumption",
        teaching: "The Assumption of Mary (defined 1950) teaches that at the end of her earthly life, Mary was taken up body and soul into heavenly glory. She did not merely die and have her soul go to heaven — her body was assumed. This is a foretaste of what awaits all the redeemed at the final resurrection. Mary is the first to receive fully what every Christian hopes for. (CCC 966; 974)",
        ccc: "CCC 966; 974",
        mechanic: "multiple_choice",
        prompt: "The Assumption of Mary teaches that:",
        options: [
          "Mary never died but was taken directly to heaven while alive",
          "Mary's soul went to heaven while her body remained on earth",
          "Mary was taken up body and soul into heavenly glory",
          "Mary was given a special place among the angels"
        ],
        correct: "Mary was taken up body and soul into heavenly glory",
        feedback: "The Assumption is not just about Mary — it is about the destiny of all the redeemed. Mary is the prototype. What happened to her will happen to every Christian at the resurrection."
      },
      {
        id: 5,
        sectionTitle: "Four Marian dogmas",
        teaching: "The four Marian dogmas were defined across nearly fifteen centuries, each building on the last: Mary is Theotokos (Mother of God, Ephesus 431), Mary's perpetual virginity (Lateran Council 649), the Immaculate Conception (Pius IX, 1854), and the Assumption (Pius XII, 1950). Each responds to a Christological question: who is Christ, and what does his redemption accomplish? (CCC 484–511; 966)",
        ccc: "CCC 484–511; 966",
        mechanic: "sequence",
        prompt: "Arrange the four Marian dogmas in chronological order of definition:",
        words: ["Immaculate Conception (1854)", "Theotokos — Mother of God (431)", "Assumption (1950)", "Perpetual Virginity (649)"],
        correct: ["Theotokos — Mother of God (431)", "Perpetual Virginity (649)", "Immaculate Conception (1854)", "Assumption (1950)"],
        feedback: "Each dogma is ultimately about Christ, not Mary. Theotokos protects Christ's unity of person. Perpetual virginity protects Christ's unique conception. The Immaculate Conception shows the scope of Christ's redemptive power. The Assumption shows where Christ's redemption leads."
      }
    ],
    prayer: {
      title: "Hail Holy Queen",
      text: [
        "Hail, Holy Queen, Mother of Mercy,",
        "our life, our sweetness, and our hope.",
        "To thee do we cry,",
        "poor banished children of Eve.",
        "To thee do we send up our sighs,",
        "mourning and weeping in this valley of tears.",
        "Turn then, most gracious advocate,",
        "thine eyes of mercy toward us,",
        "and after this our exile,",
        "show unto us the blessed fruit of thy womb, Jesus.",
        "O clement, O loving, O sweet Virgin Mary.",
        "Amen."
      ],
      source: "Salve Regina (11th century)",
      note: "Prayed at the end of the Rosary and at Compline (Night Prayer). Notice the theology packed into the poetry: Mary is advocate, not savior; she shows us Jesus, not herself."
    }
  },

  L0: {
    id: "L0",
    title: "The Last Things",
    subtitle: "Death, judgment, heaven, hell — and why it matters now",
    tier: "Foundation",
    tierColor: "#2E6EA6",
    track: "L — The Last Things",
    prereqs: ["F1"],
    ccc_primary: "CCC 988–1060",
    doctors: "Augustine, City of God XX–XXII; Aquinas, ST Supp. Q.69–99",
    totalXP: 100,
    status: "complete",
    cards: [
      {
        id: 1,
        sectionTitle: "Two judgments",
        teaching: "Death is not the end. The Catholic Church teaches that immediately after death, each person faces the particular judgment — an individual accounting before God. This is distinct from the general judgment (Last Judgment) at the end of time. At the particular judgment, the soul is directed to heaven, purgatory, or hell based on the state of the person's relationship with God at the moment of death. (CCC 1021–1022)",
        ccc: "CCC 1021–1022",
        mechanic: "true_false",
        prompt: "True or false?",
        statement: "Catholics believe that judgment only happens once, at the end of the world.",
        correct: false,
        feedback: "There are two judgments: the particular judgment (immediately after death, for each individual) and the general judgment (at the end of time, for all humanity). The particular judgment determines where you go immediately."
      },
      {
        id: 2,
        sectionTitle: "The beatific vision",
        teaching: "Heaven is not a place in the sky or an eternal vacation. It is the beatific vision — the direct, face-to-face communion with God that fully satisfies every human desire. Augustine: 'You have made us for yourself, and our hearts are restless until they rest in you.' Heaven is the rest. It is not escape from creation but the perfection of it. In heaven, we are more fully ourselves, not less. (CCC 1023–1029)",
        ccc: "CCC 1023–1029",
        mechanic: "multiple_choice",
        prompt: "Heaven is best described as:",
        options: [
          "An eternal paradise of earthly pleasures",
          "The direct, face-to-face communion with God that fulfills every desire",
          "A reward reserved for those who lived perfectly moral lives",
          "A spiritual realm where souls lose their individual identity"
        ],
        correct: "The direct, face-to-face communion with God that fulfills every desire",
        feedback: "The beatific vision is not a reward tacked onto a virtuous life — it is the goal human nature was designed for from the beginning."
      },
      {
        id: 3,
        sectionTitle: "Purgatory",
        teaching: "Purgatory is not a second chance or a lesser hell. It is the final purification of those who die in God's friendship but still carry the effects of sin — attachments, habits, and the 'stain' that sin leaves even after forgiveness. The souls in purgatory are saved. Their destination is heaven. But they are not yet ready for the fullness of God's presence. (CCC 1030–1032)",
        ccc: "CCC 1030–1032",
        mechanic: "fill_blank",
        prompt: "Complete the teaching:",
        sentence: "Purgatory is the final [BLANK] of those who die in God's friendship but are not yet ready for the [BLANK] of God's presence.",
        blanks: [
          { options: ["purification", "punishment", "testing", "waiting"], correct: "purification" },
          { options: ["fullness", "judgment", "reward", "mercy"], correct: "fullness" }
        ],
        feedback: "Purgatory is not punishment — it is preparation. Think of it as the last stage of healing. A person can be forgiven for an injury but still need therapy to recover full health."
      },
      {
        id: 4,
        sectionTitle: "Hell is real",
        teaching: "Hell is real, and the Church takes it seriously. It is the state of definitive self-exclusion from communion with God. God does not send people to hell — people choose it by rejecting God finally and completely. The Catechism describes it as 'eternal separation from God, in whom alone man can possess the life and happiness for which he was created.' The Church has never declared that any specific person is in hell. (CCC 1033–1037)",
        ccc: "CCC 1033–1037",
        mechanic: "multiple_choice",
        prompt: "According to Catholic teaching, hell is:",
        options: [
          "A temporary punishment that eventually ends for everyone",
          "Definitive self-exclusion from communion with God",
          "A place where God sends people who fail to meet his standards",
          "A metaphor for the suffering caused by sin in this life"
        ],
        correct: "Definitive self-exclusion from communion with God",
        feedback: "Hell is not God's revenge. It is the logical consequence of a free creature choosing against God permanently. God respects human freedom — even the freedom to reject him forever."
      },
      {
        id: 5,
        sectionTitle: "The final articles of the Creed",
        teaching: "The Creed ends with three claims about the future: the resurrection of the body (our bodies will be raised and glorified, not discarded), the Last Judgment (Christ will judge all humanity, revealing the meaning of every life), and life everlasting (the new heaven and new earth, where God will be 'all in all'). These are not optional beliefs — they are articles of the Creed. (CCC 988–1060)",
        ccc: "CCC 988–1060",
        mechanic: "sequence",
        prompt: "Arrange the final three articles of the Creed in order:",
        words: ["Life everlasting", "The resurrection of the body", "The Last Judgment"],
        correct: ["The resurrection of the body", "The Last Judgment", "Life everlasting"],
        feedback: "Bodies raised, then judged, then eternal life. Christianity does not promise escape from the body but its transformation. 'Life everlasting' is not endless duration — it is the fullness of communion with God."
      }
    ],
    prayer: {
      title: "Eternal Rest",
      text: [
        "Eternal rest grant unto them, O Lord,",
        "and let perpetual light shine upon them.",
        "May the souls of the faithful departed,",
        "through the mercy of God,",
        "rest in peace.",
        "Amen."
      ],
      source: "Traditional prayer for the dead",
      note: "This prayer presupposes the communion of saints: the living can pray for the dead, and it matters. It is the Church Militant praying for the Church Suffering, trusting in the mercy of God."
    }
  },
};

// ═══════════════════════════════════════════════════════════════════
// SECTION & TIER CONFIG
// ═══════════════════════════════════════════════════════════════════

export const SECTION_CONFIG = [
  { id: "god-human", label: "God & the Human Person", lessons: ["K0", "A1", "A2", "A3", "B1"] },
  { id: "sin-scripture", label: "Sin, Scripture & Salvation", lessons: ["B2", "B3", "D1", "D2", "D3"] },
  { id: "jesus-christ", label: "Jesus Christ", lessons: ["C1", "C2", "C3", "C4", "C5"] },
  { id: "church-sacraments", label: "The Church & the Sacraments", lessons: ["E1", "F0", "F1", "M0", "L0"] },
];

export const TIER_CONFIG = {
  foundation: {
    label: "Foundation",
    lessons: ["K0", "A1", "A2", "A3", "B1", "B2", "B3", "D1", "D2", "D3", "C1", "C2", "C3", "C4", "C5", "E1", "F0", "F1", "M0", "L0"],
    color: "#2E6EA6",
    colorLight: "#E8F3FC"
  },
};

// Curriculum order for onboarding "skipped" logic and path screen.
// Flat array in unlock order — used to determine which lessons come before/after a starting point.
export const LESSON_ORDER = [
  "K0", "A1", "A2", "A3", "B1",
  "B2", "B3", "D1", "D2", "D3",
  "C1", "C2", "C3", "C4", "C5",
  "E1", "F0", "F1", "M0", "L0",
];

export const DAY_PLAN = [
  { day: 1,  learn: "K0",  title: "The Kerygma" },
  { day: 2,  learn: "A1",  title: "Who Is God?" },
  { day: 3,  learn: "A2",  title: "The Holy Trinity" },
  { day: 4,  learn: "A3",  title: "Creator & Creation" },
  { day: 5,  learn: "B1",  title: "Imago Dei" },
  { day: 6,  learn: "B2",  title: "Body, Soul & Free Will" },
  { day: 7,  learn: "B3",  title: "Sin & the Fall" },
  { day: 8,  learn: "D1",  title: "What Is Scripture?" },
  { day: 9,  learn: "D2",  title: "How to Read the Bible" },
  { day: 10, learn: "D3",  title: "Salvation History" },
  { day: 11, learn: "C1",  title: "The Incarnation" },
  { day: 12, learn: "C2",  title: "Life & Ministry of Jesus" },
  { day: 13, learn: "C3",  title: "The Paschal Mystery" },
  { day: 14, learn: "C4",  title: "Resurrection & Ascension" },
  { day: 15, learn: "C5",  title: "The Holy Spirit & Pentecost" },
  { day: 16, learn: "E1",  title: "What Is the Church?" },
  { day: 17, learn: "F0",  title: "The Seven Sacraments" },
  { day: 18, learn: "F1",  title: "The Eucharist & the Mass" },
  { day: 19, learn: "M0",  title: "Mary & the Saints" },
  { day: 20, learn: "L0",  title: "The Last Things" },
];

export default LESSONS;
