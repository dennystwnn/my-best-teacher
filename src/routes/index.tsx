import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Selamat Hari Guru, Yefi Indah Wahyuni" },
      { name: "description", content: "Ucapan Hari Guru interaktif penuh cinta untuk Yefi Indah Wahyuni." },
      { property: "og:title", content: "Selamat Hari Guru, Yefi" },
      { property: "og:description", content: "Ucapan Hari Guru interaktif penuh cinta untuk Yefi Indah Wahyuni." },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary" },
    ],
  }),
  component: Index,
});

const pages = [
  { emoji: "🍎", title: "Untuk Bu Guru terhebat", text: "Setiap pagi kamu berangkat membawa ilmu, sabar, dan senyum untuk murid-muridmu. Aku bangga sekali padamu." },
  { emoji: "📚", title: "Terima kasih", text: "Untuk setiap lelah yang kamu sembunyikan, setiap koreksian sampai larut malam, dan setiap anak yang kamu bantu tumbuh." },
  { emoji: "🌷", title: "Guru di rumah juga", text: "Kamu bukan hanya guru di kelas — kamu juga mengajariku arti sabar, tulus, dan cinta setiap hari." },
  { emoji: "💛", title: "Selamat Hari Guru, Sayang", text: "Semoga Allah selalu melimpahkan kesehatan, kebahagiaan, dan keberkahan untuk setiap ilmu yang kamu bagikan. Aku mencintaimu." },
];

const floaters = ["💖", "🌸", "⭐", "🍎", "✏️", "💛", "🌷"];

function Index() {
  const [opened, setOpened] = useState(false);
  const [step, setStep] = useState(0);
  const [bursts, setBursts] = useState<{ id: number; x: number; e: string; d: number }[]>([]);

  const burst = (n = 14) => {
    const now = Date.now();
    const items = Array.from({ length: n }, (_, i) => ({
      id: now + i,
      x: Math.random() * 100,
      e: floaters[Math.floor(Math.random() * floaters.length)] ?? "💖",
      d: Math.random() * 0.8,
    }));
    setBursts((b) => [...b, ...items]);
    setTimeout(() => setBursts((b) => b.filter((x) => !items.includes(x))), 5000);
  };

  const page = pages[step];
  const last = step === pages.length - 1;

  return (
    <main className="relative flex min-h-screen flex-col items-center justify-center overflow-hidden px-5 py-10 text-center">
      <div className="pointer-events-none fixed inset-0 z-50">
        {bursts.map((b) => (
          <span key={b.id} className="absolute bottom-0 text-3xl animate-float-up" style={{ left: `${b.x}%`, animationDelay: `${b.d}s` }}>
            {b.e}
          </span>
        ))}
      </div>

      <p className="font-hand text-2xl text-gold">25 November 2026</p>
      <h1 className="mt-1 font-display text-4xl text-chalk sm:text-6xl">Selamat Hari Guru</h1>
      <p className="mt-2 font-hand text-3xl text-rose sm:text-4xl">Yefi Indah Wahyuni</p>

      {!opened ? (
        <button
          onClick={() => { setOpened(true); burst(24); }}
          className="mt-12 flex flex-col items-center gap-4 rounded-3xl bg-card px-10 py-10 text-card-foreground shadow-2xl transition hover:scale-105"
        >
          <span className="text-7xl animate-wiggle">💌</span>
          <span className="font-display text-xl">Ada surat untukmu</span>
          <span className="font-hand text-xl text-accent">ketuk untuk membuka</span>
        </button>
      ) : page ? (
        <div key={step} className="mt-10 w-full max-w-md rounded-3xl bg-card p-8 text-card-foreground shadow-2xl animate-fade-up">
          <div className="text-6xl">{page.emoji}</div>
          <h2 className="mt-4 font-display text-2xl">{page.title}</h2>
          <p className="mt-4 text-lg leading-relaxed">{page.text}</p>
          {last && <p className="mt-6 font-hand text-2xl text-accent">— dari suamimu, Denny</p>}
          <div className="mt-6 flex justify-center gap-2">
            {pages.map((_, i) => (
              <span key={i} className={`h-2 rounded-full transition-all ${i === step ? "w-6 bg-accent" : "w-2 bg-muted-foreground/40"}`} />
            ))}
          </div>
          <div className="mt-6 flex justify-center gap-3">
            {step > 0 && (
              <button onClick={() => setStep(step - 1)} className="rounded-full border border-card-foreground/20 px-5 py-2 font-semibold">
                Kembali
              </button>
            )}
            {!last ? (
              <button onClick={() => { setStep(step + 1); burst(8); }} className="rounded-full bg-board px-6 py-2 font-semibold text-chalk">
                Lanjut →
              </button>
            ) : (
              <button onClick={() => burst(30)} className="rounded-full bg-accent px-6 py-2 font-semibold text-accent-foreground">
                Kirim peluk 🤗
              </button>
            )}
          </div>
        </div>
      ) : null}

      <p className="mt-10 font-hand text-xl text-muted-foreground">ketuk di mana saja untuk taburan cinta ✨</p>
      <div className="fixed inset-0 -z-10" onClick={() => burst(6)} />
    </main>
  );
}
