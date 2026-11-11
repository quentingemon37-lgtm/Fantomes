import Resultat from "./Resultat";

async function paye(id: string): Promise<boolean> {
  if (!/^cs_(test|live)_[A-Za-z0-9]+$/.test(id)) return false;
  const cle = process.env.STRIPE_SECRET_KEY;
  if (!cle) return false;
  const r = await fetch(`https://api.stripe.com/v1/checkout/sessions/${id}`, {
    headers: { Authorization: `Bearer ${cle}` },
    cache: "no-store",
  });
  if (!r.ok) return false;
  const s = await r.json();
  return s.payment_status === "paid";
}

export default async function Merci({
  searchParams,
}: {
  searchParams: Promise<{ session_id?: string }>;
}) {
  const { session_id } = await searchParams;
  const ok = session_id ? await paye(session_id) : false;

  return (
    <main className="mx-auto max-w-xl px-5 py-8">
      {ok ? (
        <>
          <h1 className="text-3xl font-extrabold leading-tight">
            Merci, tout est débloqué.
          </h1>
          <Resultat />
        </>
      ) : (
        <>
          <h1 className="text-3xl font-extrabold leading-tight">
            Paiement non confirmé
          </h1>
          <p className="mt-4 text-lg">
            Nous n’avons pas pu confirmer ton paiement. Si tu as été débité,
            écris à quentin.gemon37@gmail.com.
          </p>
          <a
            href="/commencer"
            className="mt-6 block rounded-xl bg-[#E4572E] px-6 py-4 text-center text-lg font-semibold text-white"
          >
            Retour
          </a>
        </>
      )}
    </main>
  );
}
