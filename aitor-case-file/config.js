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

  slots: [
    {
      id: "trick",
      label: "THE TRICK",
      // answer must contain one of these (lower-case match, word parts ok)
      keywords: ["unpredictab", "random", "variable reward", "surprise", "slot machine", "never know", "don't know when", "do not know when", "jackpot", "lottery"]
    },
    {
      id: "brain",
      label: "BRAIN PART",
      keywords: ["reward system", "reward center", "reward centre", "reward circuit", "dopamine", "striatum"]
    },
    {
      id: "counter",
      label: "COUNTER-MOVE",
      keywords: ["stopping point", "stop point", "limit", "timer", "before you start", "if-then", "if then", "notifications off", "turn off notification", "turn off the notification", "go outside", "exercise", "move your body", "get up and move", "go for a walk", "plan when to stop"]
    }
  ],

  // One tip per reply. kind -> text (<= 15 words). pose: which AItor image.
  tips: {
    vague:        { text: "Too vague! Say exactly WHAT you want to know.", pose: "shrug" },
    no_detail:    { text: "Add a detail: who, what, or when?", pose: "point" },
    no_context:   { text: "Give me context: whose brain? What app or game?", pose: "point" },
    not_question: { text: "That's not a question. Ask me something!", pose: "shrug" },
    two_questions:{ text: "Two questions at once! Ask one at a time.", pose: "point" },
    great:        { text: "Great — specific! That's how you ask an AI.", pose: "point" }
  },

  // Nudges replace the tip text after N prompts with no NEW slot. Keyed by missing slot.
  nudges: {
    after: 3,
    strongAfter: 6,
    soft: {
      trick:   "Ask what makes the slop so hard to stop watching.",
      brain:   "Ask what happens inside your head when you scroll.",
      counter: "Ask how someone could stop before they start scrolling."
    },
    strong: {
      trick:   "Try: \"Why is it hard to stop when you never know what comes next?\"",
      brain:   "Try: \"Which part of the brain likes surprise rewards?\"",
      counter: "Try: \"What plan helps a kid stop scrolling on time?\""
    }
  },

  win: {
    title: "CASE FILE COMPLETE",
    notebook: "Write all 3 in your notebook.",
    bonus: "Fast finisher? Explain the trick to AItor in one sentence."
  },

  sessionCap: 25,          // prompts per page load (server also enforces)
  clientMinGapMs: 3000,    // matches server per-IP rate limit
  slowReplyMs: 12000       // after this, show "AItor is still thinking..."
};
