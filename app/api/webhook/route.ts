import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";

export async function POST(req: NextRequest) {
  const secret = process.env.STRIPE_WEBHOOK_SECRET;
  if (!secret) return NextResponse.json({ erreur: "config" }, { status: 500 });

  const corps = await req.text();
  const entete = req.headers.get("stripe-signature") ?? "";

  let t = "";
  const v1: string[] = [];
  for (const morceau of entete.split(",")) {
    const [k, v] = morceau.split("=");
    if (k === "t") t = v;
    if (k === "v1") v1.push(v);
  }
  if (!t || v1.length === 0) {
    return NextResponse.json({ erreur: "signature" }, { status: 400 });
  }
  if (Math.abs(Date.now() / 1000 - Number(t)) > 300) {
    return NextResponse.json({ erreur: "trop ancien" }, { status: 400 });
  }

  const attendu = createHmac("sha256", secret.trim())
    .update(`${t}.${corps}`)
    .digest("hex");
  const valide = v1.some(
    (s) =>
      s.length === attendu.length &&
      timingSafeEqual(Buffer.from(s), Buffer.from(attendu))
  );
  if (!valide) {
    return NextResponse.json({ erreur: "signature" }, { status: 400 });
  }

  let evenement;
  try {
    evenement = JSON.parse(corps);
  } catch {
    return NextResponse.json({ erreur: "format" }, { status: 400 });
  }

  if (
    evenement.type === "checkout.session.completed" &&
    evenement.data?.object?.payment_status === "paid"
  ) {
    const s = evenement.data.object;
    console.log("PAIEMENT_CONFIRME", s.id, s.amount_total, s.customer_details?.email);
  }

  return NextResponse.json({ recu: true });
}
