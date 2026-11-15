import { ENTREPRISE as E } from "@/lib/entreprise";

export const metadata = { title: "Politique de confidentialité · Fantômes" };

export default function Page() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10 leading-relaxed">
      <a href="/" className="text-sm underline">
        ← Accueil
      </a>
      <h1 className="mt-4 text-3xl font-extrabold">
        Politique de confidentialité
      </h1>

      <h2 className="mt-6 text-xl font-semibold">Responsable</h2>
      <p className="mt-2">
        {E.NOM}, {E.ADRESSE}. Contact : {E.EMAIL}.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Ton relevé bancaire</h2>
      <p className="mt-2">
        Ton relevé est lu et analysé uniquement dans ton navigateur. Il n’est
        jamais envoyé à nos serveurs ni stocké.
      </p>

      <h2 className="mt-6 text-xl font-semibold">
        Ce qui reste sur ton appareil
      </h2>
      <p className="mt-2">
        Le résultat de l’analyse (noms et montants des prélèvements détectés)
        est conservé dans la mémoire de ton navigateur, pour que tu le
        retrouves après le paiement. Il ne quitte pas ton appareil. Tu peux
        l’effacer en vidant les données du site dans ton navigateur.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Paiement</h2>
      <p className="mt-2">
        Le paiement est géré par Stripe, qui collecte ton adresse email et tes
        données de carte. Nous recevons uniquement la confirmation du paiement
        et ton adresse email. Base légale : exécution du contrat. Les
        justificatifs de vente sont conservés le temps imposé par la loi (en
        principe 10 ans).
      </p>

      <h2 className="mt-6 text-xl font-semibold">Hébergement</h2>
      <p className="mt-2">
        Le site est hébergé par Vercel, qui peut enregistrer des données
        techniques de connexion (adresse IP, type d’appareil). Des transferts
        hors de l’Union européenne peuvent avoir lieu, encadrés par les
        garanties prévues par le RGPD.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Tes droits</h2>
      <p className="mt-2">
        Tu peux demander l’accès, la rectification ou l’effacement de tes
        données, et t’opposer à leur traitement, en écrivant à {E.EMAIL}. Tu
        peux aussi saisir la CNIL (cnil.fr).
      </p>
    </main>
  );
}
