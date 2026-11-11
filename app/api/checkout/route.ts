import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  const cle = process.env.STRIPE_SECRET_KEY;
  if (!cle) return NextResponse.json({ erreur: "config" }, { status: 500 });

  const origine = req.nextUrl.origin;
  const corps = new URLSearchParams({
    mode: "payment",
    "line_items[0][quantity]": "1",
    "line_items[0][price_data][currency]": "eur",
    "line_items[0][price_data][unit_amount]": "1900",
    "line_items[0][price_data][product_data][name]": "Fantômes : audit complet",
    success_url: `${origine}/merci?session_id={CHECKOUT_SESSION_ID}`,
    cancel_url: `${origine}/commencer`,
  });

  const r = await fetch("https://api.stripe.com/v1/checkout/sessions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${cle.trim()}`,
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: corps,
  });
  const s = await r.json();
  if (!r.ok || !s.url) {
    return NextResponse.json({ erreur: "stripe" }, { status: 502 });
  }
  return NextResponse.json({ url: s.url });
}
