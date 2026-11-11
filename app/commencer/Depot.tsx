"use client";

import { useState } from "react";
import { detecter, Prelevement } from "@/lib/detecter";

const euros = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

async function lire(fichier: File): Promise<string> {
  const octets = await fichier.arrayBuffer();
  try {
    return new TextDecoder("utf-8", { fatal: true }).decode(octets);
  } catch {
    return new TextDecoder("windows-1252").decode(octets);
  }
}

export default function Depot() {
  const [liste, setListe] = useState<Prelevement[] | null>(null);
  const [erreur, setErreur] = useState("");

  async function choisirFichier(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setErreur("");
    setListe(null);
    if (f.size > 5_000_000) {
      setErreur("Ce fichier est trop gros. Exporte une période plus courte.");
      return;
    }
    const resultat = detecter(await lire(f));
    if (resultat.length === 0) {
      setErreur(
        "Je n’ai trouvé aucun prélèvement régulier. Vérifie que c’est bien un export CSV avec au moins 3 mois d’historique."
      );
      return;
    }
    setListe(resultat);
  }

  if (liste) {
    const total = liste.reduce((s, p) => s + p.annuel, 0);
    return (
      <section className="mt-8">
        <h2 className="text-2xl font-extrabold">
          {liste.length} prélèvements réguliers trouvés
        </h2>
        <p className="mt-2 text-lg">
          Ensemble, ils coûtent{" "}
          <span className="font-bold text-[#E4572E]">{euros(total)} par an</span>.
        </p>
        <ul className="mt-6 space-y-3">
          {liste.map((p) => (
            <li
              key={p.nom}
              className="flex items-center justify-between rounded-xl border-2 border-[#1A2238] px-4 py-3"
            >
              <div>
                <p className="font-semibold capitalize">{p.nom}</p>
                <p className="text-sm">{euros(p.montant)} par mois</p>
              </div>
              <p className="text-lg font-extrabold text-[#E4572E]">
                {euros(p.annuel)}
                <span className="block text-right text-xs font-normal text-[#1A2238]">
                  par an
                </span>
              </p>
            </li>
          ))}
        </ul>
        <button
          onClick={() => setListe(null)}
          className="mt-6 text-sm underline"
        >
          Essayer avec un autre fichier
        </button>
      </section>
    );
  }

  return (
    <section className="mt-8">
      <label className="block cursor-pointer rounded-xl bg-[#E4572E] px-6 py-4 text-center text-lg font-semibold text-white">
        Déposer mon relevé (CSV)
        <input
          type="file"
          accept=".csv,text/csv,text/plain"
          onChange={choisirFichier}
          className="hidden"
        />
      </label>
      <p className="mt-3 text-sm">
        Ton relevé reste sur ton appareil : il n’est ni envoyé ni stocké.
      </p>
      {erreur && (
        <p className="mt-4 rounded-xl bg-[#E4572E]/10 px-4 py-3">{erreur}</p>
      )}
    </section>
  );
}
