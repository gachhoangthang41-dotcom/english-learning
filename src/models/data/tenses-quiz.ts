export type TenseQuizQuestion = {
  id: string;
  tense: string;
  level: "A1" | "A2" | "B1";
  prompt: string;
  options: string[];
  correctIndex: number;
  explanation: string;
};

export const TENSE_QUIZ_QUESTIONS: TenseQuizQuestion[] = [
  {
    id: "present-simple-1",
    tense: "Present Simple",
    level: "A1",
    prompt: "She ___ to school every day.",
    options: ["go", "goes", "is going", "went"],
    correctIndex: 1,
    explanation: "Use Present Simple for habits. With he/she/it, add -s or -es to the verb.",
  },
  {
    id: "present-continuous-1",
    tense: "Present Continuous",
    level: "A1",
    prompt: "Listen! The baby ___.",
    options: ["cries", "cry", "is crying", "cried"],
    correctIndex: 2,
    explanation: "Use Present Continuous for actions happening now: am/is/are + verb-ing.",
  },
  {
    id: "past-simple-1",
    tense: "Past Simple",
    level: "A1",
    prompt: "We ___ a movie last night.",
    options: ["watch", "watched", "are watching", "have watched"],
    correctIndex: 1,
    explanation: "Use Past Simple for a finished action in the past. 'Last night' is a clear past time marker.",
  },
  {
    id: "future-simple-1",
    tense: "Future Simple",
    level: "A1",
    prompt: "I think it ___ tomorrow.",
    options: ["rains", "rained", "will rain", "is raining"],
    correctIndex: 2,
    explanation: "Use will + base verb for predictions, especially after 'I think'.",
  },
  {
    id: "present-perfect-1",
    tense: "Present Perfect",
    level: "A2",
    prompt: "They ___ here since 2020.",
    options: ["live", "lived", "have lived", "are living"],
    correctIndex: 2,
    explanation: "Use Present Perfect with 'since' to show an action or state that started in the past and continues now.",
  },
  {
    id: "past-continuous-1",
    tense: "Past Continuous",
    level: "A2",
    prompt: "At 8 p.m. yesterday, I ___ dinner.",
    options: ["cook", "cooked", "was cooking", "have cooked"],
    correctIndex: 2,
    explanation: "Use Past Continuous for an action in progress at a specific time in the past: was/were + verb-ing.",
  },
  {
    id: "going-to-1",
    tense: "Be Going To",
    level: "A2",
    prompt: "Look at those clouds. It ___ rain.",
    options: ["will", "is going to", "goes to", "was going to"],
    correctIndex: 1,
    explanation: "Use be going to for predictions based on present evidence, like dark clouds.",
  },
  {
    id: "past-perfect-1",
    tense: "Past Perfect",
    level: "B1",
    prompt: "When I arrived, the meeting ___ already ___.",
    options: ["has / started", "was / starting", "had / started", "did / start"],
    correctIndex: 2,
    explanation: "Use Past Perfect for an action that happened before another past action: had + past participle.",
  },
];
