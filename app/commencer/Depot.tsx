"use client";

import { useState } from "react";
import { detecter, Prelevement } from "@/lib/detecter";
import { lettre } from "@/lib/lettre";
import Paywall from "./Paywall";

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
  const [ouverte, setOuverte] = useState(false);
  const [copie, setCopie] = useState(false);

  async function choisirFichier(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (!f) return;
    setErreur("");
    setListe(null);
    setOuverte(false);
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

  async function copier(texte: string) {
    try {
      await navigator.clipboard.writeText(texte);
      setCopie(true);
      setTimeout(() => setCopie(false), 2000);
    } catch {
      setCopie(false);
    }
  }

  if (!liste) {
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

  const total = liste.reduce((s, p) => s + p.annuel, 0);
  const caches = liste.slice(1);
  const totalCache = caches.reduce((s, p) => s + p.annuel, 0);
  const premier = liste[0];
  const s = liste.length > 1 ? "s" : "";

  return (
    <section className="mt-8">
      <h2 className="text-2xl font-extrabold">
        {liste.length} prélèvement{s} régulier{s} trouvé{s}
      </h2>
      <p className="mt-2 text-lg">
        Ensemble, ils coûtent{" "}
        <span className="font-bold text-[#E4572E]">{euros(total)} par an</span>.
      </p>

      <p className="mt-6 text-sm font-semibold uppercase tracking-wide">
        Ton premier fantôme, offert
      </p>
      <div className="mt-2 rounded-xl border-2 border-[#1A2238] px-4 py-3">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-semibold capitalize">{premier.nom}</p>
            <p className="text-sm">{euros(premier.montant)} par mois</p>
          </div>
          <p className="text-lg font-extrabold text-[#E4572E]">
            {euros(premier.annuel)}
            <span className="block text-right text-xs font-normal text-[#1A2238]">
              par an
            </span>
          </p>
        </div>

        {!ouverte ? (
          <button
            onClick={() => setOuverte(true)}
            className="mt-4 block w-full rounded-xl bg-[#E4572E] px-4 py-3 text-center font-semibold text-white"
          >
            Voir ma lettre de résiliation
          </button>
        ) : (
          <div className="mt-4">
            <textarea
              readOnly
              value={lettre(premier)}
              rows={16}
              className="w-full rounded-xl border-2 border-[#1A2238]/30 bg-white p-3 text-sm"
            />
            <button
              onClick={() => copier(lettre(premier))}
              className="mt-2 block w-full rounded-xl bg-[#1A2238] px-4 py-3 text-center font-semibold text-white"
            >
              {copie ? "Lettre copiée" : "Copier la lettre"}
            </button>
            <p className="mt-2 text-sm">
              Remplace les champs entre crochets, puis envoie-la par courrier
              recommandé ou depuis l’espace client du service.
            </p>
          </div>
        )}
      </div>

      {caches.length > 0 && (
        <>
          <p className="mt-8 text-sm font-semibold uppercase tracking-wide">
            Les {caches.length} autres, verrouillés
          </p>
          <ul className="mt-2 space-y-3">
            {caches.map((p) => (
              <li
                key={p.nom}
                className="flex items-center justify-between rounded-xl border-2 border-dashed border-[#1A2238]/40 bg-[#1A2238]/5 px-4 py-3"
              >
                <div>
                  <p className="select-none font-semibold tracking-widest">
                    ••••••••
                  </p>
                  <p className="text-sm">Verrouillé</p>
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

          <div className="mt-6 rounded-xl border-2 border-[#1A2238] p-5">
            <p className="text-lg">
              Derrière ces lignes :{" "}
              <span className="font-extrabold text-[#E4572E]">
                {euros(totalCache)} par an
              </span>
              , avec une lettre de résiliation prête pour chacune.
            </p>
            <Paywall totalCache={totalCache} nbCaches={caches.length} />
          </div>
        </>
      )}

      <button
        onClick={() => {
          setListe(null);
          setOuverte(false);
        }}
        className="mt-6 text-sm underline"
      >
        Essayer avec un autre fichier
      </button>
    </section>
  );
}
