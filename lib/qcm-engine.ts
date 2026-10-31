export type ScoringMethod =
  | "QCSs"
  | "allOrNothing"
  | "partiallyPositive"
  | "partiallyNegative";

export interface QuestionResult {
  questionNumber: number;
  userAnswers: string[];
  correctAnswers: string[][]; // Array of acceptable answer sets
  score: number;
  maxScore: number;
  status: "correct" | "partial" | "wrong" | "unanswered";
  note?: string;
}

export interface ExamEvaluationResult {
  totalScore: number;
  grade: number; // Scaled to /20
  totalQuestions: number;
  countedQuestions: number;
  correctCount: number;
  partialCount: number;
  wrongCount: number;
  unansweredCount: number;
  questions: QuestionResult[];
}

/**
 * Normalizes answer representation into an array of acceptable string arrays.
 * Supports:
 * - string format "A,B|C,D" (meaning either {A,B} or {C,D} is valid)
 * - array of strings ["A", "B"]
 * - array of arrays [["A"], ["B"]]
 */
export function normalizeAnswerSets(raw: any): string[][] {
  if (!raw) return [[]];
  if (Array.isArray(raw)) {
    if (raw.length === 0) return [[]];
    if (Array.isArray(raw[0])) {
      return raw.map((set) => set.map((s: string) => s.trim().toUpperCase()));
    }
    return [raw.map((s: string) => s.trim().toUpperCase())];
  }
  if (typeof raw === "string") {
    const trimmed = raw.trim();
    if (!trimmed) return [[]];
    return trimmed
      .split("|")
      .map((set) =>
        set
          .split(",")
          .map((item) => item.trim().toUpperCase())
          .filter(Boolean)
      )
      .filter((set) => set.length > 0);
  }
  return [[]];
}

/**
 * Evaluates exam answers against the answer key.
 */
export function evaluateExam(
  numQuestions: number,
  scoringMethod: ScoringMethod,
  correctAnswersMap: Record<number, any>,
  userAnswersMap: Record<number, string[]>
): ExamEvaluationResult {
  let totalScore = 0;
  let countedQuestions = 0;
  let correctCount = 0;
  let partialCount = 0;
  let wrongCount = 0;
  let unansweredCount = 0;

  const questions: QuestionResult[] = [];

  for (let i = 1; i <= numQuestions; i++) {
    const rawCorrect = correctAnswersMap[i];
    const correctSets = normalizeAnswerSets(rawCorrect);
    const userAns = (userAnswersMap[i] || []).map((a) => a.trim().toUpperCase()).filter(Boolean);

    // If no correct answers are defined for this question, it is discarded from grading
    if (correctSets.length === 0 || correctSets[0].length === 0) {
      continue;
    }

    countedQuestions++;
    const maxScore = 1;
    let questionScore = 0;
    const isUnanswered = userAns.length === 0;

    if (isUnanswered) {
      unansweredCount++;
      questions.push({
        questionNumber: i,
        userAnswers: [],
        correctAnswers: correctSets,
        score: 0,
        maxScore,
        status: "unanswered",
        note: "Non répondue",
      });
      continue;
    }

    switch (scoringMethod) {
      case "QCSs": {
        // Question à choix simple: if user picked at least one correct option, full mark
        const matched = correctSets.some((set) =>
          userAns.some((ans) => set.includes(ans))
        );
        questionScore = matched ? 1 : 0;
        break;
      }

      case "allOrNothing": {
        // Tout ou rien: exact match of all letters
        const matched = correctSets.some((set) => {
          if (set.length !== userAns.length) return false;
          return (
            set.every((ans) => userAns.includes(ans)) &&
            userAns.every((ans) => set.includes(ans))
          );
        });
        questionScore = matched ? 1 : 0;
        break;
      }

      case "partiallyNegative": {
        // Constantine system:
        // Any incorrect answer chosen -> 0 points.
        // If all chosen answers are correct, score = (number of correct picked) / (total correct in set).
        questionScore = Math.max(
          ...correctSets.map((set) => {
            if (set.length === 0) return 0;
            const hasWrong = userAns.some((ans) => !set.includes(ans));
            if (hasWrong) return 0;
            const correctPicked = userAns.filter((ans) => set.includes(ans)).length;
            return correctPicked / set.length;
          })
        );
        break;
      }

      case "partiallyPositive": {
        // American system:
        // Each correct picked = +1 / set.length
        // Each wrong picked = -1 / set.length
        questionScore = Math.max(
          ...correctSets.map((set) => {
            if (set.length === 0) return 0;
            let score = 0;
            for (const ans of userAns) {
              if (set.includes(ans)) {
                score += 1 / set.length;
              } else {
                score -= 1 / set.length;
              }
            }
            return score;
          })
        );
        break;
      }
    }

    // Clamp question score at 0
    questionScore = Math.max(0, questionScore);
    totalScore += questionScore;

    let status: QuestionResult["status"] = "wrong";
    if (questionScore >= 0.999) {
      status = "correct";
      correctCount++;
    } else if (questionScore > 0) {
      status = "partial";
      partialCount++;
    } else {
      status = "wrong";
      wrongCount++;
    }

    questions.push({
      questionNumber: i,
      userAnswers: userAns,
      correctAnswers: correctSets,
      score: questionScore,
      maxScore,
      status,
    });
  }

  const gradePerQuestion = countedQuestions > 0 ? 20 / countedQuestions : 0;
  const grade = Number((totalScore * gradePerQuestion).toFixed(2));

  return {
    totalScore: Number(totalScore.toFixed(2)),
    grade,
    totalQuestions: numQuestions,
    countedQuestions,
    correctCount,
    partialCount,
    wrongCount,
    unansweredCount,
    questions,
  };
}

/**
 * Parses user or admin text input into question answers map.
 * Supports multiple formats:
 * Format 1: "1: A,B 2: C 3: D,E" or "1: AB, 2: C, 3: DE"
 * Format 2: "1. A 2. BC 3. D"
 * Format 3: "Q1: A\nQ2: B\nQ3: CD"
 * Format 4: Comma-separated or whitespace list e.g. "A, BC, D, E, AB"
 */
export function parseAnswersText(
  text: string,
  maxQuestions = 200
): Record<number, string[]> {
  const result: Record<number, string[]> = {};
  if (!text || !text.trim()) return result;

  const cleaned = text.trim();

  // Pattern 1: Matches "Q1: A,B" or "1: ABC" or "1. AC" or "1- ABC"
  const numberedRegex = /(?:Q|q)?\s*(\d{1,3})\s*[:.\-)\/]\s*([A-Ea-e,\s]+)/g;
  let match: RegExpExecArray | null;
  let foundAnyNumbered = false;

  while ((match = numberedRegex.exec(cleaned)) !== null) {
    foundAnyNumbered = true;
    const qNum = parseInt(match[1], 10);
    if (qNum > 0 && qNum <= maxQuestions) {
      const letters = match[2]
        .toUpperCase()
        .replace(/[^A-E]/g, "")
        .split("")
        .filter((v, i, a) => a.indexOf(v) === i); // unique
      if (letters.length > 0) {
        result[qNum] = letters.sort();
      }
    }
  }

  if (foundAnyNumbered && Object.keys(result).length > 0) {
    return result;
  }

  // Pattern 2: Sequential list separated by newlines, commas, or semicolons
  // e.g. "A\nBC\nD\nAE" or "A, BC, D, AE"
  const tokens = cleaned
    .split(/[\n,;]+/)
    .map((t) => t.trim().toUpperCase())
    .filter(Boolean);

  let currentQuestion = 1;
  for (const token of tokens) {
    if (currentQuestion > maxQuestions) break;
    // Extract only letters A-E
    const letters = token
      .replace(/[^A-E]/g, "")
      .split("")
      .filter((v, i, a) => a.indexOf(v) === i);
    if (letters.length > 0) {
      result[currentQuestion] = letters.sort();
    }
    currentQuestion++;
  }

  return result;
}
