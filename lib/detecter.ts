export type Prelevement = {
  nom: string;
  montant: number;
  annuel: number;
  occurrences: number;
};

function decouper(ligne: string, sep: string): string[] {
  const out: string[] = [];
  let cur = "";
  let guillemets = false;
  for (const c of ligne) {
    if (c === '"') guillemets = !guillemets;
    else if (c === sep && !guillemets) {
      out.push(cur.trim());
      cur = "";
    } else cur += c;
  }
  out.push(cur.trim());
  return out;
}

function nombre(s: string): number | null {
  const t = s.replace(/[\s€\u00a0]/g, "").replace(",", ".");
  if (!t) return null;
  const n = parseFloat(t);
  return isNaN(n) ? null : n;
}

function date(s: string): number | null {
  const iso = s.match(/(\d{4})-(\d{2})-(\d{2})/);
  if (iso) return Date.UTC(+iso[1], +iso[2] - 1, +iso[3]);
  const fr = s.match(/(\d{1,2})[/.-](\d{1,2})[/.-](\d{4})/);
  if (fr) return Date.UTC(+fr[3], +fr[2] - 1, +fr[1]);
  return null;
}

function sansAccents(s: string): string {
  return s.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLowerCase();
}

function nettoyer(libelle: string): string {
  return sansAccents(libelle)
    .replace(
      /\b(prlv|prelevement|sepa|cb|carte|paiement|vir|virement|facture|fact)\b/g,
      " "
    )
    .replace(/[^a-z ]/g, " ")
    .split(/\s+/)
    .filter((m) => m.length > 2)
    .slice(0, 3)
    .join(" ");
}

function mediane(v: number[]): number {
  const s = [...v].sort((a, b) => a - b);
  const m = Math.floor(s.length / 2);
  return s.length % 2 ? s[m] : (s[m - 1] + s[m]) / 2;
}

export function detecter(texte: string): Prelevement[] {
  const lignes = texte.split(/\r?\n/).filter((l) => l.trim());
  const sepPour = (l: string) =>
    [";", "\t", ","].sort(
      (a, b) => l.split(b).length - l.split(a).length
    )[0];

  const idxEntete = lignes.findIndex(
    (l) =>
      sansAccents(l).includes("date") && decouper(l, sepPour(l)).length >= 3
  );
  if (idxEntete === -1) return [];

  const sep = sepPour(lignes[idxEntete]);
  const entete = decouper(lignes[idxEntete], sep).map(sansAccents);
  const iDate = entete.findIndex((h) => h.includes("date"));
  const iLib = entete.findIndex((h) =>
    /libell|intitul|description|label|detail|nom/.test(h)
  );
  const iMont = entete.findIndex((h) => /montant|amount/.test(h));
  const iDeb = entete.findIndex((h) => h.includes("debit"));
  if (iLib === -1 || (iMont === -1 && iDeb === -1)) return [];

  const groupes = new Map<string, { t: number; m: number }[]>();
  for (const ligne of lignes.slice(idxEntete + 1)) {
    const c = decouper(ligne, sep);
    const t = date(c[iDate] ?? "");
    const brut = nombre(c[iMont !== -1 ? iMont : iDeb] ?? "");
    if (t === null || brut === null || brut === 0) continue;
    if (iMont !== -1 && brut > 0) continue;
    const nom = nettoyer(c[iLib] ?? "");
    if (!nom) continue;
    const liste = groupes.get(nom) ?? [];
    liste.push({ t, m: Math.abs(brut) });
    groupes.set(nom, liste);
  }

  const resultat: Prelevement[] = [];
  for (const [nom, items] of groupes) {
    if (items.length < 3) continue;
    items.sort((a, b) => a.t - b.t);
    const ecarts = items
      .slice(1)
      .map((x, i) => (x.t - items[i].t) / 86400000);
    const med = mediane(ecarts);
    if (med < 26 || med > 35) continue;
    const montant = mediane(items.map((x) => x.m));
    if (items.some((x) => Math.abs(x.m - montant) > montant * 0.15)) continue;
    resultat.push({
      nom,
      montant: Math.round(montant * 100) / 100,
      annuel: Math.round(montant * 12 * 100) / 100,
      occurrences: items.length,
    });
  }
  return resultat.sort((a, b) => b.annuel - a.annuel);
      }
