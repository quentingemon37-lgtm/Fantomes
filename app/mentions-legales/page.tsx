import { ENTREPRISE as E } from "@/lib/entreprise";

export const metadata = { title: "Mentions légales · Fantômes" };

export default function Page() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10 leading-relaxed">
      <a href="/" className="text-sm underline">
        ← Accueil
      </a>
      <h1 className="mt-4 text-3xl font-extrabold">Mentions légales</h1>

      <h2 className="mt-6 text-xl font-semibold">Éditeur du site</h2>
      <p className="mt-2">
        {E.NOM}, {E.STATUT}.<br />
        SIRET : {E.SIRET}
        <br />
        Adresse : {E.ADRESSE}
        <br />
        Email : {E.EMAIL}
        <br />
        {E.TVA}.
      </p>

      <h2 className="mt-6 text-xl font-semibold">
        Directeur de la publication
      </h2>
      <p className="mt-2">{E.NOM}.</p>

      <h2 className="mt-6 text-xl font-semibold">Hébergeur</h2>
      <p className="mt-2">
        Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.
        Site : vercel.com.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Paiement</h2>
      <p className="mt-2">
        Les paiements sont traités par Stripe. L’éditeur n’a jamais accès à ton
        numéro de carte bancaire.
      </p>

      <h2 className="mt-6 text-xl font-semibold">Propriété intellectuelle</h2>
      <p className="mt-2">
        Les textes, la marque et le code de Fantômes appartiennent à l’éditeur.
        Toute reproduction sans accord est interdite.
      </p>
    </main>
  );
}
