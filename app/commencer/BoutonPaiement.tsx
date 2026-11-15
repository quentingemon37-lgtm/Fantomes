"use client";

import { useState } from "react";

export default function BoutonPaiement() {
  const [accord, setAccord] = useState(false);
  const [chargement, setChargement] = useState(false);
  const [erreur, setErreur] = useState("");

  async function payer() {
    setChargement(true);
    setErreur("");
    try {
      const r = await fetch("/api/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ accord }),
      });
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
      <label className="flex items-start gap-3 text-sm">
        <input
          type="checkbox"
          checked={accord}
          onChange={(e) => setAccord(e.target.checked)}
          className="mt-1 h-5 w-5 shrink-0"
        />
        <span>
          Je demande l’accès immédiat à mon audit et je renonce à mon droit de
          rétractation de 14 jours. J’ai lu les{" "}
          <a href="/cgv" target="_blank" className="underline">
            CGV
          </a>
          .
        </span>
      </label>

      <button
        onClick={payer}
        disabled={!accord || chargement}
        className="mt-4 block w-full rounded-xl bg-[#E4572E] px-6 py-4 text-center text-lg font-semibold text-white disabled:opacity-40"
      >
        {chargement ? "Ouverture du paiement…" : "Débloquer mes lettres : 19 €"}
      </button>

      <p className="mt-2 text-center text-sm">
        Paiement unique, aucun abonnement. Remboursé sous 30 jours si ça ne te
        convient pas.
      </p>

      {erreur && (
        <p className="mt-3 rounded-xl bg-[#E4572E]/10 px-4 py-3">{erreur}</p>
      )}
    </div>
  );
}
