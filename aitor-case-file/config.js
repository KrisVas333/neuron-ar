// AItor Case File — editable config (BrAIn Club L6, EN first).
// Mentors: change words here, not in index.html.
// The SAME keyword lists are copied into supabase/functions/aitor-case-file/index.ts
// (server side). If you edit them here, edit them there too (see README "Keyword lists").
window.CASE_CONFIG = {
  // Supabase Edge Function URL. Leave as-is until the owner deploys; ?mock=1 ignores it.
  endpoint: "https://iiekmeylpppczicrsxho.supabase.co/functions/v1/aitor-case-file",
  // Public anon key of the Supabase project (safe to ship in a browser). Owner fills in.
  anonKey: "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImlpZWttZXlscHBwY3ppY3JzeGhvIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NzM3MDcyNTIsImV4cCI6MjA4OTI4MzI1Mn0.TPzvQCR6fuhZtlqCouswdyjk3Hgr_OWebMmC1h5OHpo",   // public anon key (safe to ship)

  objective: "Brain Rot keeps pulling me back to the slop and I CAN'T STOP. Find out how he does it — and how I escape!",
  // Not shown on screen (start screen = objective + search only). Kept for the mentor's spoken intro.
  aitorIntro:"I'm AItor. I'm not a friend, I'm a tool. I'm the world's best guesser — I answer only what you ACTUALLY ask.",
  aiDisclosure: "AItor is an AI computer program, not a person.",

  // The 3 mission questions (shown on the start screen + as chips ① ? ② ? ③ ?).
  // A chip locks green with its label + the keyword AItor's answer used.
  slots: [
    {
      id: "trick",
      num: "①",
      question: "WHAT is Brain Rot's pull?",
      label: "TRICK",
      // answer must contain one of these (lower-case match, word parts ok)
      keywords: ["unpredictab", "random", "variable reward", "surprise", "slot machine", "never know", "don't know when", "do not know when", "jackpot", "lottery"],
      reveal: "Unpredictable rewards, like a slot machine — you never know when the good video comes."
    },
    {
      id: "brain",
      num: "②",
      question: "WHERE in the brain does it grab?",
      label: "BRAIN PART",
      keywords: ["reward system", "reward center", "reward centre", "reward circuit", "dopamine", "striatum"],
      reveal: "The reward system — dopamine reacts most to surprises."
    },
    {
      id: "counter",
      num: "③",
      question: "HOW does Neuron break free?",
      label: "COUNTER-MOVE",
      keywords: ["stopping point", "stop point", "limit", "timer", "before you start", "if-then", "if then", "notifications off", "turn off notification", "turn off the notification", "go outside", "exercise", "move your body", "get up and move", "go for a walk", "plan when to stop"],
      reveal: "Decide your stopping point before you start, and move your body."
    }
  ],

  // Prompt method: TASK + CONTEXT + OUTCOME. Same texts live in the server (TCO_TIPS) - edit both.
  // Tip names the first missing part (task -> context -> outcome), examples rotate.
  tcoTips: {
    task:    ["Missing TASK — say what you want: 'Explain why…'", "Missing TASK — give AItor a job: 'Tell me how…'", "Missing TASK — ask for something: 'List 3 ways…'"],
    context: ["Missing CONTEXT — tell AItor who it's for: 'I'm 11 and…'", "Missing CONTEXT — add your situation: 'I scroll at night…'", "Missing CONTEXT — say who's asking: 'For a kid who games…'"],
    outcome: ["Missing OUTCOME — say how the answer should look: 'in 3 short points'", "Missing OUTCOME — ask for a shape: 'in 2 sentences'", "Missing OUTCOME — say the format: 'in simple words'"],
    all: "All 3 lights! TASK + CONTEXT + OUTCOME."
  },
  // shown under a half-lit (2-light) chip moment
  flickerNote: "Almost! Add the missing light to lock it in.",

  // Nudge only when a prompt already has all 3 lights but hits no new question N times in a row.
  nudges: {
    after: 3,
    soft: {
      trick:   "Great prompts! Now aim at question ①: WHAT pulls you back to the slop?",
      brain:   "Great prompts! Now aim at question ②: WHERE in your brain does it grab?",
      counter: "Great prompts! Now aim at question ③: HOW can Neuron break free?"
    }
  },

  timerMinutes: 12,        // starts on the first prompt
  warnAtMinutes: 2,
  warnText: "2 minutes left — try one more great prompt!",
  // Shown at the end of the reveal AND the win screen. Kids stay in VR and play Dish It Out next.
  endMessage: "Case closed! Now press the Meta button and open DISH IT OUT — smash Brain Rot's slime with your hands!",
  reveal: {
    title: "TIME'S UP!"
  },

  win: {
    title: "CASE FILE COMPLETE",
    notebook: "Write all 3 in your notebook.",
    bonus: "Fast finisher? Explain the trick to AItor in one sentence."
  },

  sessionCap: 25,          // prompts per page load (server also enforces)
  clientMinGapMs: 3000,    // matches server per-session gap
  slowReplyMs: 12000       // after this, show "AItor is still thinking..."
};
