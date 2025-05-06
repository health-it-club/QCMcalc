// "use client";

// import { useEffect, useState, type ChangeEvent } from "react";
// import { getUniqueSubjects } from "@/data/exams";

// interface ExamSelectorProps {
//   selectedSubject: string;
//   onChange: (subject: string) => void;
// }

// export default function ExamSelector({
//   selectedSubject,
//   onChange,
// }: ExamSelectorProps) {
//   const [subjects, setSubjects] = useState<string[]>([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     async function fetchSubjects() {
//       try {
//         const uniqueSubjects = await getUniqueSubjects();
//         setSubjects(uniqueSubjects.sort()); // Sort subjects alphabetically
//       } catch (error) {
//         console.error("Error fetching subjects:", error);
//       } finally {
//         setLoading(false);
//       }
//     }
//     fetchSubjects();
//   }, []);

//   const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
//     const value = e.target.value;
//     onChange(value);
//   };

//   if (loading) {
//     return (
//       <div className="flex flex-col items-center my-6">
//         <p>Chargement des modules...</p>
//       </div>
//     );
//   }

//   return (
//     <div className="flex flex-col items-center mb-1.5">
//       <label
//         htmlFor="subjectSelector"
//         className="text-md md:text-xl font-bold mt-4 mb-2 text-center">
//         Module / Unité
//       </label>
//       <select
//         id="subjectSelector"
//         value={selectedSubject}
//         onChange={handleChange}
//         className="w-8/12 p-4 text-sm md:text-xl font-semibold bg-light rounded-full text-center text-dark
//         appearance-none
//         [-moz-appearance:textfield]
//         [&::-webkit-inner-spin-button]:appearance-none
//         [&::-webkit-outer-spin-button]:appearance-none
//         px-3
//         py-2
//         border-solid
//         border-4
//         border-light-200
//         focus:outline-none
//         focus:border-blue">
//         <option value="">Tous les modules</option>
//         {subjects.map((subject) => (
//           <option key={subject} value={subject}>
//             {subject}
//           </option>
//         ))}
//       </select>
//     </div>
//   );
// }
