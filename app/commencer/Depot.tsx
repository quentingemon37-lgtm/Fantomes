"use client";

import { useState } from "react";
import { detecter, Prelevement } from "@/lib/detecter";
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

function lettre(p: Prelevement): string {
  const nom = p.nom.replace(/\b\w/g, (c) => c.toUpperCase());
  const date = new Date().toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
  return `[Ton prénom et ton nom]
[Ton adresse]
[Ton code postal et ta ville]

${nom}
[Adresse du service client : à retrouver sur leur site]

Le ${date}

Objet : résiliation de mon abonnement
Référence client : [ton numéro client ou ton adresse email]

Madame, Monsieur,

Par la présente, je vous informe de ma décision de résilier mon abonnement ${nom}, prélevé ${euros(p.montant)} par mois, avec effet à la première date possible.

Je vous demande de mettre fin à tout prélèvement dès réception de ce courrier et de me confirmer la résiliation par écrit, en précisant la date de fin effective.

Dans l’attente de votre confirmation, je vous prie d’agréer, Madame, Monsieur, mes salutations distinguées.

[Ta signature]`;
}

export default function Depot() {
  const [liste, setListe] = useState<Prelevement[] | null>(null);
  const [erreur, setErreur] = useState("");
  const [lettreOuverte, setLettreOuverte] = useState(false);
  const [copie, setCopie] = useState(false);

  async function choisirFichier(e: React.ChangeEvent<HTMLInputElement>) {
    const f = e.target.files?.[0];
    if (
