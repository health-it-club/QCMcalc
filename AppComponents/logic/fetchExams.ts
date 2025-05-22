import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/lib/firebase";
import type { ExamPreset } from "@/data/exams";

export const fetchExams = async () => {
  const snapshot = await getDocs(collection(db, "exams"));
  return snapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  })) as ExamPreset[];
};

export const getFilteredExams = async (
  year = "",
  grade = "",
  speciality = "",
  session = "",
  type = ""
): Promise<ExamPreset[]> => {
  try {
    const examsRef = collection(db, "exams");
    let q = query(examsRef);

    // Add filters if values are provided
    if (year) {
      q = query(q, where("year", "==", year));
    }
    if (grade) {
      q = query(q, where("grade", "==", grade));
    }
    if (speciality) {
      q = query(q, where("speciality", "==", speciality));
    }
    if (session) {
      q = query(q, where("session", "==", session));
    }
    if (type) {
      q = query(q, where("type", "==", type));
    }

    const snapshot = await getDocs(q);
    return snapshot.docs.map((doc) => ({
      ...doc.data(),
      id: doc.id,
    })) as ExamPreset[];
  } catch (error) {
    console.error("Error filtering exams:", error);
    return [];
  }
};

// Helper functions to get unique values
export const getUniqueValues = async (
  field: keyof ExamPreset
): Promise<string[]> => {
  try {
    const snapshot = await getDocs(collection(db, "exams"));
    const values = new Set(
      snapshot.docs
        .map((doc) => doc.data()[field]?.toString() || "")
        .filter(Boolean)
    );
    return Array.from(values).sort();
  } catch (error) {
    console.error(`Error fetching unique ${field}:`, error);
    return [];
  }
};

export const getUniqueGrades = () => getUniqueValues("grade");
export const getUniqueSpecialities = () => getUniqueValues("speciality");
export const getUniqueYears = () => getUniqueValues("year");
