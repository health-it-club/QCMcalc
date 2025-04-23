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
    [key: number]: string[][]; // Changed from string[] to string[][] for multiple answer sets
  };
}

// Cache for exam data
let examCache: ExamPreset[] | null = null;

// Load exams from JSON file
export async function loadExams(): Promise<ExamPreset[]> {
  let examCache;
  // Return cached data if available
  if (examCache) {
    return examCache;
  }

  try {
    const response = await fetch("/data/exams.json");
    if (!response.ok) {
      throw new Error(`Failed to fetch exams: ${response.status}`);
    }
    const data = await response.json();
    examCache = data.exams || []; // Ensure we always have an arra
    return examCache;
  } catch (error) {
    console.error("Error loading exams:", error);
    return []; // Return empty array on error, not null
  }
}

// Get unique years from exams
export async function getUniqueYears(): Promise<string[]> {
  const exams = await loadExams();
  const years = new Set(exams.map((exam) => exam.year));
  return Array.from(years)
    .map((year) => year.toString())
    .sort((a, b) => b.localeCompare(a)); // Sort descending (newest first)
}

// Get unique subjects from exams
export async function getUniqueSubjects(): Promise<string[]> {
  const exams = await loadExams();
  const subjects = new Set(exams.map((exam) => exam.subject));
  return Array.from(subjects).sort();
}

// Get unique grades from exams
export async function getUniqueGrades(): Promise<string[]> {
  const exams = await loadExams();
  const grades = new Set(
    exams.filter((exam) => exam.grade).map((exam) => exam.grade as string)
  );
  return Array.from(grades).sort();
}

// Get unique specialities from exams
export async function getUniqueSpecialities(): Promise<string[]> {
  const exams = await loadExams();
  const specialities = new Set(
    exams
      .filter((exam) => exam.speciality)
      .map((exam) => exam.speciality as string)
  );
  return Array.from(specialities).sort();
}

// Filter exams by year, subject, grade, and/or speciality
export async function getFilteredExams(
  year?: string,
  subject?: string,
  grade?: string,
  speciality?: string
): Promise<ExamPreset[]> {
  const exams = await loadExams();
  return exams.filter((exam) => {
    const yearMatch = !year || exam.year === year;
    const subjectMatch = !subject || exam.subject === subject;
    const gradeMatch = !grade || exam.grade === grade;
    const specialityMatch = !speciality || exam.speciality === speciality;
    return yearMatch && subjectMatch && gradeMatch && specialityMatch;
  });
}
