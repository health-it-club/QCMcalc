export type ExamPreset = {
  id: string;
  name: string;
  description: string;
  speciality: string;
  grade: string;
  year: string;
  subject: string;
  numQuestions: number | string;
  testType: "QCSs" | "allOrNothing" | "partiallyPositive" | "partiallyNegative";
  correctAnswers: Record<string, string[][]>;
};
