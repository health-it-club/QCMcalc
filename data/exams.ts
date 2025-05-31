export interface ExamPreset {
  id: string;
  name: string;
  description: string;
  speciality: string;
  grade: string;
  year: string | number;
  subject: string;
  numQuestions: string | number;
  testType: "QCSs" | "allOrNothing" | "partiallyPositive" | "partiallyNegative";
  correctAnswers: {
    [key: number]: string;
  };
  session: "Normal" | "Rattrapage";
  type: "Théorique" | "Clinique";
}

// Cache for exam data
let examCache: ExamPreset[] = [];

// Import the JSON directly
import examsData from "./exams.json";

// Type guard to validate testType
function isValidTestType(type: string): type is ExamPreset["testType"] {
  return [
    "QCSs",
    "allOrNothing",
    "partiallyPositive",
    "partiallyNegative",
  ].includes(type);
}

// Validate and transform imported data
function validateExam(exam: any): ExamPreset {
  // Ensure all required fields exist and are of correct type
  if (!exam.id || typeof exam.id !== "string")
    throw new Error(`Invalid id for exam: ${exam.name}`);
  if (!exam.name || typeof exam.name !== "string")
    throw new Error(`Invalid name for exam: ${exam.id}`);
  if (!exam.description || typeof exam.description !== "string")
    throw new Error(`Invalid description for exam: ${exam.id}`);
  if (!exam.speciality || typeof exam.speciality !== "string")
    throw new Error(`Invalid speciality for exam: ${exam.id}`);
  if (!exam.grade || typeof exam.grade !== "string")
    throw new Error(`Invalid grade for exam: ${exam.id}`);
  if (!exam.subject || typeof exam.subject !== "string")
    throw new Error(`Invalid subject for exam: ${exam.id}`);

  // Validate testType
  if (!exam.testType || !isValidTestType(exam.testType)) {
    console.warn(`Invalid testType for exam ${exam.id}, defaulting to "QCSs"`);
    exam.testType = "QCSs";
  }

  // Transform and validate year and numQuestions
  const year = exam.year?.toString() || "";
  const numQuestions = exam.numQuestions?.toString() || "";
  // Validate correctAnswers structure
  const correctAnswers: ExamPreset["correctAnswers"] = {};
  if (exam.correctAnswers && typeof exam.correctAnswers === "object") {
    Object.entries(exam.correctAnswers).forEach(([key, value]) => {
      if (Array.isArray(value) && value.every((arr) => Array.isArray(arr))) {
        // Convert array format to string format
        const stringValue = value
          .map((answerSet) => answerSet.join(","))
          .join("|");
        correctAnswers[parseInt(key)] = stringValue;
      } else if (typeof value === "string") {
        // If it's already in string format, validate it
        const isValidFormat = value
          .split("|")
          .every((set) =>
            set.split(",").every((answer) => /^[A-E]$/.test(answer))
          );
        if (isValidFormat) {
          correctAnswers[parseInt(key)] = value;
        }
      }
    });
  }

  return {
    id: exam.id,
    name: exam.name,
    description: exam.description,
    speciality: exam.speciality,
    grade: exam.grade,
    year,
    type: exam.type,
    session: exam.session,
    subject: exam.subject,
    numQuestions,
    testType: exam.testType as ExamPreset["testType"],
    correctAnswers,
  };
}

// Load exams from imported JSON
export async function loadExams(): Promise<ExamPreset[]> {
  // Return cached data if available
  if (examCache.length > 0) {
    return examCache;
  }

  try {
    const validatedExams = (examsData.exams || [])
      .map((exam) => {
        try {
          return validateExam(exam);
        } catch (error) {
          console.error("Error validating exam:", error);
          return null;
        }
      })
      .filter((exam): exam is ExamPreset => exam !== null);

    examCache = validatedExams;
    return examCache;
  } catch (error) {
    console.error("Error loading exams:", error);
    return []; // Return empty array on error
  }
}

// Get unique years from exams
export async function getUniqueYears(): Promise<string[]> {
  const exams = await loadExams();
  const years = new Set(exams.map((exam) => exam.year.toString()));
  return Array.from(years).sort((a, b) => b.localeCompare(a)); // Sort descending (newest first)
}

// Get unique grades from exams
export async function getUniqueGrades(): Promise<string[]> {
  const exams = await loadExams();
  const grades = new Set(
    exams.filter((exam) => exam.grade).map((exam) => exam.grade)
  );
  return Array.from(grades).sort();
}

// Get unique specialities from exams
export async function getUniqueSpecialities(): Promise<string[]> {
  const exams = await loadExams();
  const specialities = new Set(
    exams.filter((exam) => exam.speciality).map((exam) => exam.speciality)
  );
  return Array.from(specialities).sort();
}

// Get unique subjects from exams
export async function getUniqueSubjects(): Promise<string[]> {
  const exams = await loadExams();
  const subjects = new Set(
    exams.filter((exam) => exam.subject).map((exam) => exam.subject)
  );
  return Array.from(subjects).sort();
}

// Filter exams by year, grade, and/or speciality
export async function getFilteredExams(
  year = "",
  grade = "",
  speciality = "",
  subject = ""
): Promise<ExamPreset[]> {
  try {
    const exams = await loadExams();

    return exams.filter((exam) => {
      const yearMatch = !year || exam.year.toString() === year;
      const gradeMatch = !grade || exam.grade === grade;
      const specialityMatch = !speciality || exam.speciality === speciality;
      const subjectMatch = !subject || exam.subject === subject;

      return yearMatch && gradeMatch && specialityMatch && subjectMatch;
    });
  } catch (error) {
    console.error("Error filtering exams:", error);
    return [];
  }
}
