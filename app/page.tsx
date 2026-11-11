export default function Home() {
  return (
    <main className="mx-auto max-w-xl px-5 py-10">
      <p className="text-sm font-semibold tracking-wide text-[#E4572E]">
        FANTÔMES
      </p>

      <h1 className="mt-4 text-4xl font-extrabold leading-tight">
        Retrouve les abonnements que tu paies sans t’en servir.
      </h1>

      <p className="mt-5 text-lg leading-relaxed">
        Trois abonnements oubliés à 9 € par mois, c’est{" "}
        <strong>324 € par an</strong>. Petits prélèvements, invisibles sur un
        relevé, qui tournent pendant des années.
      </p>

      <a
        href="/commencer"
        className="mt-8 block rounded-xl bg-[#E4572E] px-6 py-4 text-center text-lg font-semibold text-white"
      >
        Commencer, c’est gratuit
      </a>

      <ul className="mt-12 space-y-6">
        <li>
          <h2 className="text-xl font-semibold">Tu déposes ton relevé</h2>
          <p className="mt-1">
            L’analyse se fait sur ton appareil. Ton relevé n’est jamais
            stocké.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">Tu vois tout, classé</h2>
          <p className="mt-1">
            Chaque prélèvement régulier, du plus coûteux par an au plus
            petit.
          </p>
        </li>
        <li>
          <h2 className="text-xl font-semibold">Tu résilies en un clic</h2>
          <p className="mt-1">
            Une lettre de résiliation est prête pour chaque abonnement.
          </p>
        </li>
      </ul>
    </main>
  );
}
