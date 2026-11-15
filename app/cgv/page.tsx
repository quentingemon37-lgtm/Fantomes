import { ENTREPRISE as E } from "@/lib/entreprise";

export const metadata = { title: "Conditions générales de vente · Fantômes" };

export default function Page() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10 leading-relaxed">
      <a href="/" className="text-sm underline">
        ← Accueil
      </a>
      <h1 className="mt-4 text-3xl font-extrabold">
        Conditions générales de vente
      </h1>

      <h2 className="mt-6 text-xl font-semibold">1. Vendeur</h2>
      <p className="mt-2">
        {E.NOM}, {E.STATUT}, SIRET {E.SIRET}, {E.ADRESSE}. Contact : {E.EMAIL}.
      </p>

      <h2 className="mt-6 text-xl font-semibold">2. Service vendu</h2>
      <p className="mt-2">
        Fantômes analyse un relevé bancaire au format CSV pour repérer les
        prélèvements réguliers, les classe par coût annuel et fournit un modèle
        de lettre de résiliation pour chacun. L’analyse est réalisée sur
        l’appareil du client. Elle repose sur une détection automatique et peut
        comporter des erreurs ou des oublis : le client vérifie chaque résultat
        avant de résilier.
      </p>

      <h2 className="mt-6 text-xl font-semibold">3. Prix et paiement</h2>
      <p className="mt-2">
        Le prix de l’audit complet est de 19 €, payable en une seule fois.{" "}
        {E.TVA}. Aucun abonnement n’est souscrit. Le paiement s’effectue par
        carte bancaire via Stripe.
      </p>

      <h2 className="mt-6 text-xl font-semibold">4. Livraison</h2>
      <p className="mt-2">
        Le contenu est accessible immédiatement après la confirmation du
        paiement, sur la page affichée à l’issue du paiement.
      </p>

      <h2 className="mt-6 text-xl font-semibold">5. Droit de rétractation</h2>
      <p className="mt-2">
        Le client dispose en principe de 14 jours pour se rétracter.
        Toutefois, pour un contenu numérique fourni immédiatement, le client
        demande l’exécution immédiate du service avant la fin de ce délai et
        reconnaît renoncer à son droit de rétractation, conformément à
        l’article L221-28 du Code de la consommation. Cet accord est recueilli
        avant le paiement.
      </p>

      <h2 className="mt-6 text-xl font-semibold">
        6. Garantie satisfait ou remboursé
      </h2>
      <p className="mt-2">
        Indépendamment de ce qui précède, le vendeur offre une garantie
        commerciale de 30 jours à compter de l’achat. Pour en bénéficier, le
        client écrit à {E.EMAIL} en indiquant l’adresse email utilisée lors du
        paiement, sans avoir à se justifier. Le remboursement intervient sous 5
        jours ouvrés, sur le moyen de paiement utilisé.
      </p>

      <h2 className="mt-6 text-xl font-semibold">7. Responsabilité</h2>
      <p className="mt-2">
        Les lettres sont des modèles. Le vendeur ne garantit pas leur
        acceptation par les services concernés. Sa responsabilité est limitée
        au prix payé, sauf faute lourde ou dispositions légales contraires.
      </p>

      <h2 className="mt-6 text-xl font-semibold">8. Données personnelles</h2>
      <p className="mt-2">
        Voir la{" "}
        <a href="/confidentialite" className="underline">
          politique de confidentialité
        </a>
        .
      </p>

      <h2 className="mt-6 text-xl font-semibold">9. Médiation</h2>
      <p className="mt-2">
        En cas de litige, le client peut contacter d’abord le vendeur à{" "}
        {E.EMAIL}. À défaut de solution, il peut saisir gratuitement le
        médiateur de la consommation : {E.MEDIATEUR}.
      </p>

      <h2 className="mt-6 text-xl font-semibold">10. Droit applicable</h2>
      <p className="mt-2">
        Les présentes conditions sont soumises au droit français.
      </p>
    </main>
  );
}
