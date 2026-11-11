"use client";

import { useState } from "react";

type Reponse = { label: string; valeur: number };

const questions = [
  {
    titre: "Combien d’abonnements penses-tu avoir ?",
    options: [
      { label: "1 à 3", valeur: 2 },
      { label: "4 à 6", valeur: 5 },
      { label: "7 ou plus", valeur: 8 },
    ],
  },
  {
    titre: "Quand as-tu vérifié tes prélèvements pour la dernière fois ?",
    options: [
      { label: "Ce mois-ci", valeur: 0 },
      { label: "Il y a quelques mois", valeur: 1 },
      { label: "Jamais", valeur: 2 },
    ],
  },
  {
    titre: "Combien paies-tu par mois en moyenne pour un abonnement ?",
    options: [
      { label: "Moins de 8 €", valeur: 5 },
      { label: "8 à 15 €", valeur: 11 },
      { label: "Plus de 15 €", valeur: 18 },
    ],
  },
];

const phraseVerification = [
  "Tu as vérifié tes prélèvements ce mois-ci : bien joué. Mais un petit prélèvement oublié passe vite entre les mailles.",
  "Tu n’as pas regardé tes prélèvements depuis quelques mois. C’est exactement le temps qu’il faut à un essai oublié pour devenir un abonnement.",
  "Tu n’as jamais vérifié tes prélèvements. Rien d’étonnant : ils sont petits, donc invisibles sur un relevé.",
];

export default function Commencer() {
  const [etape, setEtape] = useState(0);
  const [reponses, setReponses] = useState<Reponse[]>([]);

  function choisir(option: Reponse) {
    setReponses([...reponses, option]);
    setEtape(etape + 1);
  }

  function retour() {
    setReponses(reponses.slice(0, -1));
    setEtape(etape - 1);
  }

  if (etape < questions.length) {
    const q = questions[etape];
    const pourcentage = ((etape + 1) / (questions.length + 1)) * 100;
    return (
      <main className="mx-auto max-w-xl px-5 py-8">
        <div className="h-2 w-full overflow-hidden rounded-full bg-[#1A2238]/10">
          <div
            className="h-full rounded-full bg-[#E4572E] transition-all"
            style={{ width: `${pourcentage}%` }}
          />
        </div>
        <p className="mt-3 text-sm">
          Question {etape + 1} sur {questions.length}
        </p>

        <h1 className="mt-8 text-3xl font-extrabold leading-tight">
          {q.titre}
        </h1>

        <div className="mt-8 space-y-3">
          {q.options.map((o) => (
            <button
              key={o.label}
              onClick={() => choisir(o)}
              className="block w-full rounded-xl border-2 border-[#1A2238] px-5 py-4 text-left text-lg font-semibold active:bg-[#1A2238] active:text-white"
            >
              {o.label}
            </button>
          ))}
        </div>

        {etape > 0 && (
          <button onClick={retour} className="mt-8 text-sm underline">
            ← Retour
          </button>
        )}
      </main>
    );
  }

  const nombre = reponses[0].valeur;
  const prix = reponses[2].valeur;
  const annuel = nombre * prix * 12;
  const tiers = Math.round(annuel / 3);

  return (
    <main className="mx-auto max-w-xl px-5 py-8">
      <div className="h-2 w-full overflow-hidden rounded-full bg-[#1A2238]/10">
        <div className="h-full w-full rounded-full bg-[#E4572E]" />
      </div>
      <p className="mt-3 text-sm">Ton résultat</p>

      <h1 className="mt-8 text-3xl font-extrabold leading-tight">
        Environ {nombre} abonnements à {prix} € par mois, c’est{" "}
        <span className="text-[#E4572E]">{annuel} € par an.</span>
      </h1>

      <p className="mt-5 text-lg leading-relaxed">
        {phraseVerification[reponses[1].valeur]}
      </p>

      <p className="mt-5 text-lg leading-relaxed">
        Même si seulement un abonnement sur trois est oublié, ça fait{" "}
        <strong>{tiers} € par an</strong> qui partent pour rien.
      </p>

      <div className="mt-8 rounded-xl border-2 border-[#1A2238] p-5">
        <h2 className="text-xl font-semibold">Ce que Fantômes change</h2>
        <p className="mt-2">
          Tu déposes ton relevé. Chaque prélèvement régulier est retrouvé et
          classé par coût annuel, avec une lettre de résiliation prête à
          envoyer.
        </p>
      </div>

      <p className="mt-8 rounded-xl bg-[#1A2238]/10 px-6 py-4 text-center text-lg font-semibold">
        Dépôt du relevé : bientôt disponible
      </p>
    </main>
  );
        }
