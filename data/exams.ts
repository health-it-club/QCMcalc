export interface ExamPreset {
  id: string
  name: string
  description: string
  year: string
  subject: string
  numQuestions: number
  testType: "QCSs" | "allOrNothing" | "partiallyNegative" | "partiallyPositive"
  correctAnswers: Record<number | string, string[]>
}

// Cache for exam data
let examCache: ExamPreset[] | null = null

// Load exams from JSON file
export async function loadExams(): Promise<ExamPreset[]> {
  // Return cached data if available
  if (examCache) {
    return examCache
  }
  
  try {
    const response = await fetch("/data/exams.json")
    if (!response.ok) {
      throw new Error(`Failed to fetch exams: ${response.status}`)
    }
    const data = await response.json()
    let examCache
    examCache = data.exams || [] // Ensure we always have an array
    return examCache
  } catch (error) {
    console.error("Error loading exams:", error)
    return [] // Return empty array on error, not null
  }
}

// Get unique years from exams
export async function getUniqueYears(): Promise<string[]> {
  const exams = await loadExams()
  const years = new Set(exams.map((exam) => exam.year))
  return Array.from(years).sort((a, b) => b.localeCompare(a)) // Sort descending (newest first)
}

// Get unique subjects from exams
export async function getUniqueSubjects(): Promise<string[]> {
  const exams = await loadExams()
  const subjects = new Set(exams.map((exam) => exam.subject))
  return Array.from(subjects).sort()
}

// Filter exams by year and/or subject
export async function getFilteredExams(year?: string, subject?: string): Promise<ExamPreset[]> {
  const exams = await loadExams()
  return exams.filter((exam) => {
    const yearMatch = !year || exam.year === year
    const subjectMatch = !subject || exam.subject === subject
    return yearMatch && subjectMatch
  })
}

