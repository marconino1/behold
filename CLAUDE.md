# CLAUDE.md — Behold Project Rules

## What This Is
Catholic faith formation app. Duolingo-style daily 5-card lessons grounded in the Catechism of the Catholic Church. Next.js 14 App Router + TypeScript + Tailwind + Supabase.

## Stack Rules
- Fonts: Playfair Display (headings), Nunito (everything else). NEVER use Inter, Roboto, or system fonts.
- No component libraries. No shadcn, Radix, MUI, Heroicons, Lucide.
- All icons are custom SVG in /components/icons/Icon.tsx.
- All lesson content lives in /content/behold_lesson_content.js (and behold_lesson_content_FULL_COPY.txt as backup). Do not restructure these files.
- Session page renders all card mechanics inline in /app/(app)/session/[lessonId]/page.tsx. No separate interaction component files.
- Supabase for auth + database. Client-side auth checks (no middleware SSR).
- Deployed on Vercel. Auto-deploys from main branch.

## Design Rules
- Gold (#C8932A) only for CTAs, progress fills, selected states. Never as large backgrounds.
- Shadows ALWAYS warm: rgba(60,40,10,0.08). Never Tailwind default shadow-*.
- Buttons are pills (rounded-full). Cards are rounded-2xl.
- No pure white card on white page. Use --color-surface-warm (#FDF9F3) or --color-stone (#F2EDE4).
- Zero emojis anywhere in the app.
- Mobile-first. Max content width 520px on app screens.
- App screens use deep sky-blue gradient background.

## Card Mechanics
4 active mechanics:
- "multiple_choice": prompt, options[], correct
- "true_false": statement, correct (boolean)
- "fill_blank": sentence, blanks[{options[], correct}]
- "sequence": prompt, words[], correct[]
- Legacy "tap_correct" in older lessons renders identically to multiple_choice.

Card flow: teaching shows first → "I'm Ready" button → teaching hides → question shows → feedback appears on same screen after answering. Forward-only navigation between cards. Back button on question screen returns to teaching for same card.

Progress saves to localStorage after each card (24hr expiry), clears on lesson completion.

## Leo Mascot
- 4 states: idle, celebrating, thinking, oops
- 5 sizes: nav (34px), card (58px), session (100px), hero (148px), icon (220px)
- CSS animations defined in globals.css.
- Do NOT modify Leo.tsx or globals.css Leo animations unless the issue explicitly asks for it.

## Color Tokens
```
--color-bg: #FAF7F2          --color-gold: #C8932A
--color-bg-warm: #F5EFE4     --color-gold-light: #F0C96A
--color-surface: #FFFFFF      --color-gold-pale: #FDF3DC
--color-surface-warm: #FDF9F3 --color-amber: #E8A020
--color-stone: #F2EDE4        --color-green: #5FAD6B
--color-text: #2C2016         --color-sage: #EAF0E8
--color-text-muted: #8C7A62   --color-border: #E8DDD0
--color-text-light: #B8A898   --color-border-warm: #D4C4A8
--color-shadow: rgba(60,40,10,0.08)
--color-shadow-md: rgba(60,40,10,0.13)
```

## Do NOT
- Modify existing lesson content unless the issue specifically asks for it.
- Add npm dependencies without stating why in the PR description.
- Change globals.css or Leo.tsx unless explicitly asked.
- Break the mobile-first layout.
- Use Tailwind default shadows (cold grey). Always use warm shadows.
- Use emoji anywhere in the UI.
