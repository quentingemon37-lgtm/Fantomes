import BoutonPaiement from "./BoutonPaiement";

const EMAIL_CONTACT = "quentin.gemon37@gmail.com";
const PRIX = 19;

const euros = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

const faq = [
  {
    q: "Est-ce que ça marche pour mon cas ?",
    r: "Si ta banque permet d’exporter tes opérations en CSV sur au moins 3 mois, oui. Le premier fantôme offert te montre le résultat avant de payer.",
  },
  {
    q: "Combien de temps ça me prend ?",
    r: "Environ 10 minutes : tes lettres sont déjà rédigées, tu remplaces quelques champs et tu les envoies.",
  },
  {
    q: "Et si je veux arrêter ?",
    r: "Il n’y a rien à arrêter : tu paies une seule fois, sans abonnement. Et si ça ne te convient pas, tu es remboursé sous 30 jours.",
  },
  {
    q: "À quoi sert exactement ce que je paie ?",
    r: "À débloquer tous tes prélèvements détectés, avec leur nom, leur coût annuel et une lettre de résiliation prête à envoyer pour chacun.",
  },
];

export default function Paywall({
  totalCache,
  nbCaches,
}: {
  totalCache: number;
  nbCaches: number;
}) {
  const parJour = totalCache / 365;

  return (
    <div className="mt-6">
      <h2 className="text-2xl font-extrabold">Voilà ton plan, prêt.</h2>
      <p className="mt-2 text-lg">
        {nbCaches} lettre{nbCaches > 1 ? "s" : ""} de résiliation t’attend
        {nbCaches > 1 ? "ent" : ""}. Il ne reste qu’à les débloquer.
      </p>

      <div className="mt-5 rounded-xl bg-[#1A2238] p-5 text-white">
        <p className="text-lg">
          Ces lignes te coûtent{" "}
          <strong className="text-[#E4572E]">{euros(parJour)} par jour</strong>
          , soit {euros(totalCache)} par an.
        </p>
        <p className="mt-2">
          Ton audit : {euros(PRIX)}, une seule fois.
        </p>
      </div>

      <div className="mt-5 rounded-xl border-2 border-[#E4572E] p-5">
        <p className="text-sm font-semibold uppercase tracking-wide text-[#E4572E]">
          Audit complet
        </p>
        <p className="mt-1 text-4xl font-extrabold">{euros(PRIX)}</p>
        <p className="mt-1">Paiement unique. Aucun abonnement, rien à résilier.</p>

        <BoutonPaiement />

        <p className="mt-4 text-sm">
          <strong>Satisfait ou remboursé pendant 30 jours.</strong> Écris à{" "}
          {EMAIL_CONTACT} avec ton adresse email d’achat, sans avoir à te
          justifier. Tu es remboursé sous 5 jours ouvrés.
        </p>
      </div>

      <h3 className="mt-8 text-xl font-semibold">Questions fréquentes</h3>
      <div className="mt-3 space-y-2">
        {faq.map((f) => (
          <details
            key={f.q}
            className="rounded-xl border-2 border-[#1A2238]/30 px-4 py-3"
          >
            <summary className="cursor-pointer font-semibold">{f.q}</summary>
            <p className="mt-2">{f.r}</p>
          </details>
        ))}
      </div>
    </div>
  );
}
