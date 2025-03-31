export const template = (1
  // Template to make adding new exams easier
    // {
    //   id: "module-MXX-xeme", doesn't show and have to be super unique
    //   name: "U01: année", shows as the biggest title possible
    //   description: "Controle d'Unité module année", shows smaller but still big
    //   year: "xème année", shows in the filter
    //   subject: "module-module", shows in the filter
    //   numQuestions: x, shows small
    //   testType: "partiallyNegative", shows small
    //   correctAnswers: {
    //     1:  ['A', 'B', 'C', 'D', 'E'],
    //     2:  ['A', 'B', 'C', 'D', 'E'],
    //     3:  ['A', 'B', 'C', 'D', 'E'],
    //     4:  ['A', 'B', 'C', 'D', 'E'],
    //     5:  ['A', 'B', 'C', 'D', 'E'],
    //     6:  ['A', 'B', 'C', 'D', 'E'],
    //     7:  ['A', 'B', 'C', 'D', 'E'],
    //     8:  ['A', 'B', 'C', 'D', 'E'],
    //     9:  ['A', 'B', 'C', 'D', 'E'],
    //     10: ['A', 'B', 'C', 'D', 'E'],
    //     11: ['A', 'B', 'C', 'D', 'E'],
    //     12: ['A', 'B', 'C', 'D', 'E'],
    //     13: ['A', 'B', 'C', 'D', 'E'],
    //     14: ['A', 'B', 'C', 'D', 'E'],
    //     15: ['A', 'B', 'C', 'D', 'E'],
    //     16: ['A', 'B', 'C', 'D', 'E'],
    //     17: ['A', 'B', 'C', 'D', 'E'],
    //     18: ['A', 'B', 'C', 'D', 'E'],
    //     19: ['A', 'B', 'C', 'D', 'E'],
    //     20: ['A', 'B', 'C', 'D', 'E'],
    //     21: ['A', 'B', 'C', 'D', 'E'],
    //     22: ['A', 'B', 'C', 'D', 'E'],
    //     23: ['A', 'B', 'C', 'D', 'E'],
    //     24: ['A', 'B', 'C', 'D', 'E'],
    //     25: ['A', 'B', 'C', 'D', 'E'],
    //     26: ['A', 'B', 'C', 'D', 'E'],
    //     27: ['A', 'B', 'C', 'D', 'E'],
    //     28: ['A', 'B', 'C', 'D', 'E'],
    //     29: ['A', 'B', 'C', 'D', 'E'],
    //     30: ['A', 'B', 'C', 'D', 'E'],
    //     31: ['A', 'B', 'C', 'D', 'E'],
    //     32: ['A', 'B', 'C', 'D', 'E'],
    //     33: ['A', 'B', 'C', 'D', 'E'],
    //     34: ['A', 'B', 'C', 'D', 'E'],
    //     35: ['A', 'B', 'C', 'D', 'E'],
    //     36: ['A', 'B', 'C', 'D', 'E'],
    //     37: ['A', 'B', 'C', 'D', 'E'],
    //     38: ['A', 'B', 'C', 'D', 'E'],
    //     39: ['A', 'B', 'C', 'D', 'E'],
    //     40: ['A', 'B', 'C', 'D', 'E'],
    //   },
    // },
)

export interface ExamPreset {
    id: string
    name: string
    description: string
    year: string
    subject: string
    numQuestions: number
    testType: "QCSs" | "allOrNothing" | "partiallyNegative" | "partiallyPositive"
    correctAnswers: Record<number, string[]>
  }


  
  // EXAM DATA
  export const examPresets: ExamPreset[] = [
    //PLACE HOLDERS
    {
      id: "cardio-resp-M22",
      name: "U01: 2025",
      description: "Controle d'Unité Cardio-Respiratoire 2025",
      year: "3ème année",
      subject: "Cardio-Respiratoire",
      numQuestions: 10,
      testType: "partiallyNegative",
      correctAnswers: {
        1: ['A', 'C', 'D'],
        2: ['A', 'B', 'C', 'E'],
        3: ['B'],
        4: ['B'],
        5: ["B"],
        6: ['B'],
        7: ['A', 'B', 'D'],
        8: ['A', 'B'],
        9: ['B', 'C', 'D', 'E'],
        10: ['B', 'C', 'D'],
      },
    },
    {
      id: "immuno-M22",
      name: "M02: 2025",
      description: "Controle d'Immunologie 2025",
      year: "3ème année",
      subject: "Immunologie",
      numQuestions: 10,
      testType: "partiallyNegative",
      correctAnswers: {
        1: ['A', 'D', 'E'],
        2: ['C', 'E'],
        3: ['A', 'B'],
        4: ['A', 'B', 'E'],
        5: ['A', 'C'],
        6: ['A', 'D'],
        7: ['B', 'C'],
        8: ['A', 'B'],
        9: ['A', 'C', 'D', 'E'],
        10: [],
      },
    },
    {
      id: "immuno-M21",
      name: "M02: 2025",
      description: "Controle d'Immunologie 2025",
      year: "4ème année",
      subject: "Cardio-Resp",
      numQuestions: 10,
      testType: "partiallyNegative",
      correctAnswers: {
        1: ['A', 'D', 'E'],
        2: ['C', 'E'],
        3: ['A', 'B'],
        4: ['A', 'B', 'E'],
        5: ['A', 'C'],
        6: ['A', 'D'],
        7: ['B', 'C'],
        8: ['A', 'B'],
        9: ['A', 'C', 'D', 'E'],
        10: [],
      },
    },
    {
      id: "immuno-M20",
      name: "M02: 2025",
      description: "Controle d'Immunologie 2025",
      year: "5ème année",
      subject: "Immunologie",
      numQuestions: 10,
      testType: "partiallyNegative",
      correctAnswers: {
        1: ['A', 'D', 'E'],
        2: ['C', 'E'],
        3: ['A', 'B'],
        4: ['A', 'B', 'E'],
        5: ['A', 'C'],
        6: ['A', 'D'],
        7: ['B', 'C'],
        8: ['A', 'B'],
        9: ['A', 'C', 'D', 'E'],
        10: [],
      },
    },
    {
      id: "test-M22",
      name: "M02: 2025",
      description: "Controle d'Immunologie 2025",
      year: "6ème année",
      subject: "geriatrie",
      numQuestions: 10,
      testType: "partiallyNegative",
      correctAnswers: {
        1: ['A', 'D', 'E'],
        2: ['C', 'E'],
        3: ['A', 'B'],
        4: ['A', 'B', 'E'],
        5: ['A', 'C'],
        6: ['A', 'D'],
        7: ['B', 'C'],
        8: ['A', 'B'],
        9: ['A', 'C', 'D', 'E'],
        10: [],
      },
    },
    {
      id: "zest-M22",
      name: "M02: 2025",
      description: "Controle d'Immunologie 2025",
      year: "3ème année",
      subject: "Anapath",
      numQuestions: 10,
      testType: "partiallyNegative",
      correctAnswers: {
        1: ['A', 'D', 'E'],
        2: ['C', 'E'],
        3: ['A', 'B'],
        4: ['A', 'B', 'E'],
        5: ['A', 'C'],
        6: ['A', 'D'],
        7: ['B', 'C'],
        8: ['A', 'B'],
        9: ['A', 'C', 'D', 'E'],
        10: [],
      },
    },
  ]
  
  //FILTER FUNCTIONS

export const getUniqueYears = (): string[] => {
  const years = new Set(examPresets.map((exam) => exam.year))
  return Array.from(years).sort((a, b) => b.localeCompare(a)) // Sort descending (newest first)
}

export const getUniqueSubjects = (): string[] => {
  const subjects = new Set(examPresets.map((exam) => exam.subject))
  return Array.from(subjects).sort()
}

// Fixed filter function - this is likely the issue
export const getFilteredExams = (year?: string, subject?: string): ExamPreset[] => {
  const filtered = examPresets.filter((exam) => {
    const yearMatch = !year || exam.year === year
    const subjectMatch = !subject || exam.subject === subject
    return yearMatch && subjectMatch
  })
  return filtered
}
  
  