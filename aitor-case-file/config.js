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

  // The 2 mission questions (shown on the start screen + as chips ① ? ② ?).
  // ① = fixed answer (keywords). ② = OPEN and PERSONAL: a specific offline activity built on the kid's OWN stated
  // interest (generic timer / go-outside never counts); the model returns `counter_move` (<=5-word label),
  // `interest` and `uses_interest`; the keyword list is only a server sanity check.
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
      id: "counter",
      num: "②",
      question: "ONE way YOU could break free — with something YOU love",
      label: "COUNTER-MOVE",
      open: true,
      keywords: ["stopping point", "stop point", "limit", "timer", "alarm", "before you start", "if-then", "if then", "notification", "phone out of", "another room", "leave your phone", "leave the phone", "charge your phone", "plan when to stop", "schedule",
        "hobby", "draw", "paint", "read", "book", "lego", "build", "music", "guitar", "piano", "sing", "dance", "cook", "bake", "puzzle", "board game", "write", "journal", "craft",
        "football", "soccer", "basketball", "sport", "run", "bike", "cycl", "swim", "skate", "exercise", "move your body", "get up and move", "stretch", "go for a walk", "walk", "play outside", "go outside", "outside", "fresh air",
        "friend", "family", "talk to", "meet", "play with", "game with", "pet", "dog", "garden", "replace"],
      reveal: "Your own counter-move!",
      testMove: "Draw a comic instead"
    }
  ],
  counterMoveFallback: "tell AItor what you love next time!",

  // Prompt method: TASK + CONTEXT + OUTCOME. Same texts live in the server (TCO_TIPS) - edit both.
  // Tip names the first missing part (task -> context -> outcome), examples rotate.
  tcoTips: {
    task:    ["Missing TASK — say what you want: 'Explain why…'", "Missing TASK — give AItor a job: 'Tell me how…'", "Missing TASK — ask for something: 'List 3 ways…'"],
    context: ["Missing CONTEXT — tell AItor who it's for: 'I'm 11 and…'", "Missing CONTEXT — add your situation: 'I scroll at night…'", "Missing CONTEXT — say who's asking: 'For a kid who games…'"],
    outcome: ["Missing OUTCOME — say how the answer should look: 'in 3 short points'", "Missing OUTCOME — ask for a shape: 'in 2 sentences'", "Missing OUTCOME — say the format: 'in simple words'"],
    // asks how to break free but names no interest (rotates; ② needs YOUR hobby / interest)
    missing_interest: ["Missing CONTEXT — what do YOU love doing? 'I love football…'", "Missing CONTEXT — tell AItor what you like: 'I love drawing…'", "Missing CONTEXT — what are YOU into? 'I'm into Minecraft…'"],
    all: "All 3 lights! TASK + CONTEXT + OUTCOME."
  },
  missionReminder: "3 lights = a great prompt. It unlocks a question only if you ASK about that question. For ②, tell AItor what YOU like.",
  // shown under a half-lit (2-light) chip moment
  flickerNote: "Almost! Add the missing light to lock it in.",

  // Nudge only when a prompt already has all 3 lights but hits no new question N times in a row.
  nudges: {
    after: 3,
    soft: {
      trick:   "Great prompts! Now aim at question ①: WHAT pulls you back to the slop?",
      counter: "Great prompts! Now aim at question ②: what is ONE way YOU could break free?"
    }
  },

  timerMinutes: 10,        // starts on the first prompt
  warnAtMinutes: 2,
  warnText: "2 minutes left — try one more great prompt!",
  // Shown at the end of the reveal AND the win screen.
  endMessage: "Case closed! Take your headset off and come back to the class — tell everyone your counter-move.",
  reveal: {
    title: "TIME'S UP!"
  },

  win: {
    title: "CASE FILE COMPLETE",
    notebook: "Write both answers in your notebook.",
    bonus: "Fast finisher? Explain the trick to AItor in one sentence."
  },

  sessionCap: 25,          // prompts per page load (server also enforces)
  clientMinGapMs: 3000,    // matches server per-session gap
  slowReplyMs: 12000       // after this, show "AItor is still thinking..."
};

// ---------------------------------------------------------------------------
// LIETUVIŠKA VERSIJA (LT). Mentors: edit the Lithuanian words here.
// Only what is written below changes in LT; anything missing falls back to the English config above.
// slots[i] overrides the i-th slot above. `keywords` here are EXTRA Lithuanian stems (matched anywhere in a word,
// so "pieš" also hits "nupiešk"); the English list above still counts. The SAME LT lists are copied into
// supabase/functions/aitor-case-file/index.ts (SLOT_KEYWORDS_LT, TCO_TIPS_LT) - edit both, then redeploy.
// The page switches with the EN | LT button at the top, or with ?lang=lt in the link.
// ---------------------------------------------------------------------------
window.CASE_CONFIG_LT = {
  objective: "Brain Rot vis tempia mane atgal į šlamštą, ir AŠ NEGALIU SUSTOTI. Išsiaiškink, kaip jis tai daro — ir kaip man ištrūkti!",
  aitorIntro: "Aš AItor. Aš ne draugas, aš įrankis. Aš geriausias pasaulio spėliotojas — atsakau tik į tai, ko TIKRAI paklausi.",
  aiDisclosure: "AItor yra DI kompiuterio programa, ne žmogus.",
  slots: [
    {
      question: "KUO Brain Rot tave taip traukia?",
      label: "TRIUKAS",
      keywords: ["nenuspėjam", "nenuspėj", "atsitiktin", "netikėt", "lošimo automat", "loterij", "niekada nežinai", "nežinai, kada", "nežinai kada", "džekpot", "staigmen", "siurpriz"],
      reveal: "Nenuspėjami prizai, kaip lošimo automate — niekada nežinai, kada pasirodys geras video."
    },
    {
      question: "VIENAS būdas TAU ištrūkti — su tuo, ką TU mėgsti",
      label: "PLANAS",
      keywords: ["sustojimo", "ribą", "limit", "laikmat", "žadintuv", "pranešim", "kitame kambaryje", "kitą kambarį", "jei-tai", "jei – tai", "pomėg", "hobi",
        "pieš", "spalvin", "skait", "knyg", "lego", "statyk", "statyt", "pastatyk", "muzik", "gitar", "pianin", "dainuo", "šokt", "šokių", "gamin", "kepk", "kept", "dėlion", "stalo žaidim", "rašyk", "rašyt", "dienoraš",
        "futbol", "krepšin", "tinklin", "sport", "treniruot", "bėgt", "bėgiok", "dvirat", "plauk", "riedlent", "riedučiai", "mankšt", "judėk", "pasivaikšč", "vaikšč", "į lauką", "lauke", "gryname ore",
        "draug", "šeim", "pasikalbėk", "susitik", "žaisk su", "šun", "augint", "sode", "darž", "pakeisk"],
      reveal: "Tavo ištrūkimo planas!",
      testMove: "Nupiešk komiksą"
    }
  ],
  counterMoveFallback: "kitą kartą pasakyk AItor, ką mėgsti!",
  // how a found ① keyword is shown on the chip (LT stem -> nice words)
  kwLabels: { "nenuspėjam": "nenuspėjami prizai", "nenuspėj": "nenuspėjami prizai", "atsitiktin": "atsitiktiniai prizai", "netikėt": "netikėti prizai",
    "lošimo automat": "lošimo automatas", "loterij": "loterija", "niekada nežinai": "niekada nežinai, kada", "nežinai, kada": "niekada nežinai, kada",
    "nežinai kada": "niekada nežinai, kada", "džekpot": "džekpotas", "staigmen": "staigmenos", "siurpriz": "siurprizai" },

  tcoTips: {
    task:    ["Trūksta UŽDUOTIES — pasakyk, ko nori: „Paaiškink, kodėl…“", "Trūksta UŽDUOTIES — duok AItor darbą: „Pasakyk, kaip…“", "Trūksta UŽDUOTIES — paprašyk: „Išvardink 3 būdus…“"],
    context: ["Trūksta KONTEKSTO — kam tai? „Man 11 metų ir…“", "Trūksta KONTEKSTO — papasakok apie save: „Aš scrollinu naktį…“", "Trūksta KONTEKSTO — kas klausia? „Vaikui, kuris žaidžia…“"],
    outcome: ["Trūksta REZULTATO — kokio atsakymo nori? „3 trumpais punktais“", "Trūksta REZULTATO — kokios formos? „2 sakiniais“", "Trūksta REZULTATO — kaip parašyti? „paprastais žodžiais“"],
    missing_interest: ["Trūksta KONTEKSTO — ką TU mėgsti veikti? „Aš mėgstu futbolą…“", "Trūksta KONTEKSTO — kas tau patinka? „Man patinka piešti…“", "Trūksta KONTEKSTO — kuo TU domiesi? „Aš žaidžiu Minecraft…“"],
    all: "Visos 3 lemputės! UŽDUOTIS + KONTEKSTAS + REZULTATAS."
  },
  missionReminder: "3 lemputės = puikus klausimas. Bet atsakymas atsirakina tik tada, kai KLAUSI būtent apie jį. Prie ② pasakyk AItor, ką TU mėgsti.",
  flickerNote: "Beveik! Pridėk trūkstamą lemputę ir užrakink.",
  nudges: {
    soft: {
      trick:   "Puikūs klausimai! Dabar taikyk į ①: KAS tave traukia atgal prie šlamšto?",
      counter: "Puikūs klausimai! Dabar taikyk į ②: koks VIENAS būdas TAU ištrūkti?"
    }
  },
  warnText: "Liko 2 minutės — pabandyk dar vieną gerą klausimą!",
  endMessage: "Byla uždaryta! Nusiimk VR akinius ir grįžk pas klasę — papasakok visiems savo ištrūkimo planą.",
  reveal: { title: "LAIKAS BAIGĖSI!" },
  win: {
    title: "BYLA IŠSPRĘSTA",
    notebook: "Užsirašyk abu atsakymus į sąsiuvinį.",
    bonus: "Baigei greitai? Paaiškink AItor triuką vienu sakiniu."
  },

  // buttons, labels and short messages on the page
  ui: {
    demo: "DEMO REŽIMAS — iš anksto parašyti atsakymai, ne tikras DI",
    mission: "MISIJA",
    done: "BYLA IŠSPRĘSTA — pažiūrėk",
    neuron: "Neuron:",
    method: "Geras klausimas uždega 3 lemputes:",
    lights: { task: "UŽDUOTIS", context: "KONTEKSTAS", outcome: "REZULTATAS" },
    placeholder: "Paklausk AItor...",
    inputLabel: "Tavo klausimas AItor",
    ask: "Klausti",
    tookYou: "Prireikė klausimų:",
    keepAsking: "Klausti toliau",
    close: "Uždaryti",
    promptOne: "klausimas", promptFew: "klausimai", promptMany: "klausimų",
    free: "Neuron laisvas:",
    followUp: "Klausk dar",
    goDeeper: "GILIAU",
    goingDeeper: "Giliau: {title} — dabar parašyk savo klausimą.",
    askAbout: "Klausk apie: ",
    timesUp: "Laikas baigėsi",
    yourMove: "Tavo ištrūkimo planas:",
    oneAtATime: "Po vieną klausimą — palauk sekundę...",
    needsRest: "AItor reikia pailsėti. Paprašyk mentoriaus iš naujo atidaryti bylą.",
    slow: "Dar spėlioju... palauk.",
    fuzzy: "AItor signalas trūkinėja. Pabandyk paklausti dar kartą!",
    fuzzyTip: "Paklausk dar kartą po kelių sekundžių.",
    altStuck: "Neuron įstrigęs šlamšte",
    altBackflip: "Neuron daro salto ir ištrūksta iš šlamšto",
    altShake: "Neuron purto AItor",
    altAitor: "AItor"
  }
};
