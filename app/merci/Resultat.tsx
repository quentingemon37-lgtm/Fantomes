"use client";

import { useEffect, useState } from "react";
import type { Prelevement } from "@/lib/detecter";
import { lettre } from "@/lib/lettre";

const euros = (n: number) =>
  n.toLocaleString("fr-FR", { style: "currency", currency: "EUR" });

export default function Resultat() {
  const [liste, setListe] = useState<Prelevement[] | null>(null);
  const [pret, setPret] = useState(false);
  const [copie, setCopie] = useState("");

  useEffect(() => {
    try {
      const brut = localStorage.getItem("fantomes_liste");
      if (brut) setListe(JSON.parse(brut));
    } catch {}
    setPret(true);
  }, []);

  async function copier(p: Prelevement) {
    try {
      await navigator.clipboard.writeText(lettre(p));
      setCopie(p.nom);
      setTimeout(() => setCopie(""), 2000);
    } catch {}
  }

  if (!pret) return null;

  if (!liste) {
    return (
      <p className="mt-6 rounded-xl bg-[#E4572E]/10 px-4 py-3">
        Ton paiement est bien reçu, mais ton résultat n’est plus sur cet
        appareil. Écris à quentin.gemon37@gmail.com et je te le renvoie.
      </p>
    );
  }

  const total = liste.reduce((s, p) => s + p.annuel, 0);

  return (
    <div className="mt-6">
      <p className="text-lg">
        {liste.length} prélèvement{liste.length > 1 ? "s" : ""}, soit{" "}
        <strong className="text-[#E4572E]">{euros(total)} par an</strong>.
      </p>
      <div className="mt-4 space-y-3">
        {liste.map((p) => (
          <details
            key={p.nom}
            className="rounded-xl border-2 border-[#1A2238] px-4 py-3"
          >
            <summary className="flex cursor-pointer items-center justify-between">
              <span className="font-semibold capitalize">{p.nom}</span>
              <span className="font-extrabold text-[#E4572E]">
                {euros(p.annuel)}
              </span>
            </summary>
            <textarea
              readOnly
              value={lettre(p)}
              rows={16}
              className="mt-3 w-full rounded-xl border-2 border-[#1A2238]/30 bg-white p-3 text-sm"
            />
            <button
              onClick={() => copier(p)}
              className="mt-2 block w-full rounded-xl bg-[#1A2238] px-4 py-3 text-center font-semibold text-white"
            >
              {copie === p.nom ? "Lettre copiée" : "Copier la lettre"}
            </button>
          </details>
        ))}
      </div>
    </div>
  );
}
