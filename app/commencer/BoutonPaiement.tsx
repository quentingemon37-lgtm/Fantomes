"use client";

import { useState } from "react";

export default function BoutonPaiement() {
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  async function payer() {
    setChargement(true);
    setErreur("");
    try {
      const r = await fetch("/api/checkout", { method: "POST" });
      const d = await r.json();
      if (!r.ok || !d.url) throw new Error();
      window.location.href = d.url;
    } catch {
      setErreur("Le paiement n’a pas pu démarrer. Réessaie dans un instant.");
      setChargement(false);
    }
  }

  return (
    <div className="mt-4">
      <button
        onClick={payer}
        disabled={chargement}
        className="block w-full rounded-xl bg-[#E4572E] px-6 py-4 text-center text-lg font-semibold text-white disabled:opacity-60"
      >
        {chargement ? "Ouverture du paiement…" : "Débloquer mes lettres : 19 €"}
      </button>
      {erreur && (
        <p className="mt-3 rounded-xl bg-[#E4572E]/10 px-4 py-3">{erreur}</p>
      )}
    </div>
  );
}
