import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import { type ExamPreset, loadExams } from "@/data/exams";

export const fetchExams = async (): Promise<ExamPreset[]> => {
  try {
    const snapshot = await getDocs(collection(db, "exams"));
    if (!snapshot.empty) {
      return snapshot.docs.map((doc) => ({
        ...doc.data(),
        id: doc.id,
      })) as ExamPreset[];
    }
  } catch (error) {
    console.warn("Firestore fetch error, falling back to local exams:", error);
  }

  // Fallback to local exams.json
  return loadExams();
};

export const getFilteredExams = async (
  year = "",
  grade = "",
  speciality = "",
  session = "",
  type = ""
): Promise<ExamPreset[]> => {
  try {
    const allExams = await fetchExams();

    return allExams.filter((exam) => {
      const yearMatch = !year || exam.year?.toString() === year;
      const gradeMatch = !grade || exam.grade === grade;
      const specialityMatch = !speciality || exam.speciality === speciality;
      const sessionMatch = !session || exam.session === session;
      const typeMatch = !type || exam.type === type;

      return yearMatch && gradeMatch && specialityMatch && sessionMatch && typeMatch;
    });
  } catch (error) {
    console.error("Error filtering exams:", error);
    return [];
  }
};
