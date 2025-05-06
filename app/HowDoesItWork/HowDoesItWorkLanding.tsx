import { CustomAccodion } from "@/AppComponents/UI/CustomAccordion";
import Background from "../../AppComponents/UI/background";

export default function HowDoesItWorkLanding() {
  return (
    <div className="w-full font-semibold">
      <Background />
      <div className="relative z-10 flex justify-start items-center flex-col">
        <h1 className="text-yellow text-left md:text-2xl font-bold text-lg mt-4 mb-2 mx-10 ">
          Comment fonctionne QCMcalc ?
        </h1>
        <p className="text-justify mx-10 md:mx-30 text-light text-md md:text-lg">
          QCMcalc est une plateforme intuitive développée par l’équipe du club
          Health IT, permettant aux étudiants en médecine de calculer facilement
          leur note aux QCM et d’accéder aux examens passés. Que vous souhaitiez
          vérifier votre score, réviser ou tester vos connaissances, QCMcalc
          vous offre une solution rapide et fiable pour faciliter votre
          apprentissage.
        </p>
      </div>
      <div className="relative z-10 flex justify-center items-center flex-col">
        <h1 className="text-yellow text-justify md:text-2xl font-bold text-lg mt-4 mb-2 mx-10">
          Les étapes pour utiliser QCMcalc
        </h1>
        <ol>
          <li className="text-center mx-10 md:mx-30 text-light text-md md:text-lg">
            <b className="">1- Sélectionnez un examen</b> en choisissant l’année
            et le module concerné.
          </li>
          <li className="text-center mx-10 md:mx-30 text-light text-md md:text-lg">
            <b className="">2- Remplissez votre QCM</b> en répondant aux
            questions.
          </li>
          <li className="text-center mx-10 md:mx-30 text-light text-md md:text-lg">
            <b className="">3- Soumettez vos réponses</b> pour obtenir votre
            note automatiquement.
          </li>
        </ol>
      </div>
      <div className="relative z-10 flex justify-center items-center flex-col">
        <h1 className="text-yellow md:text-2xl font-bold text-lg mt-6 mx-10">
          FAQ - Questions Fréquentes
        </h1>
        <CustomAccodion />
      </div>
    </div>
  );
}
