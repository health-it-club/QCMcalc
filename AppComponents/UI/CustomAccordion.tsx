import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

export function CustomAccodion() {
  return (
    <Accordion
      type="single"
      collapsible
      className="md:w-8/12 md:mx-0 mx-2 my-5">
      <AccordionItem value="item-1">
        <AccordionTrigger>
          Est-ce que l’utilisation de QCMcalc est gratuite ?
        </AccordionTrigger>
        <AccordionContent>
          Oui, la plateforme est entièrement gratuite et accessible à tous les
          étudiants en médecine.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-2">
        <AccordionTrigger>
          Puis-je corriger mes propres examens ?
        </AccordionTrigger>
        <AccordionContent>
          Oui ! Vous pouvez ajouter les réponses correctes d’un QCM, puis entrer
          vos propres réponses pour calculer votre note. Cette fonctionnalité
          est accessible directement depuis l’Accueil.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-3">
        <AccordionTrigger>
          QCMcalc prend-il en charge tous les types de correction ?
        </AccordionTrigger>
        <AccordionContent>
          Oui ! Actuellement, nous prenons en charge plusieurs systèmes de
          correction : QCS (Questions à Choix Simple), QCM Tout ou Rien, QCM
          Partiel et QCM à correction selon le système américain.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-4">
        <AccordionTrigger>
          Puis-je ajouter mes propres examens ?
        </AccordionTrigger>
        <AccordionContent>
          Pour le moment, seuls les administrateurs peuvent ajouter de nouveaux
          examens à la base de données, mais une option de contribution sera
          bientôt disponible.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-5">
        <AccordionTrigger>Qui a créé QCMcalc ?</AccordionTrigger>
        <AccordionContent>
          QCMcalc a été conçu et développé par l’équipe du club Health IT dans
          le but d’aider les étudiants en médecine à mieux gérer leur
          apprentissage et à calculer leurs notes rapidement et efficacement.
        </AccordionContent>
      </AccordionItem>
      <AccordionItem value="item-6">
        <AccordionTrigger>
          Puis-je suggérer des améliorations pour le site ?
        </AccordionTrigger>
        <AccordionContent>
          Bien sûr ! Toute suggestion est la bienvenue. Vous pouvez nous
          contacter via nos réseaux sociaux ou notre section "Contactez-nous".
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  );
}
