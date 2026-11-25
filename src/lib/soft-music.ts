// Gentle music-box melody generated with Web Audio (no audio file needed).
const notes = [523.25, 659.25, 783.99, 659.25, 587.33, 698.46, 880, 698.46, 523.25, 659.25, 783.99, 1046.5, 987.77, 783.99, 659.25, 587.33];
const bass = [261.63, 349.23, 261.63, 196];

export function createSoftMusic() {
  let ctx: AudioContext | null = null;
  let master: GainNode | null = null;
  let timer: ReturnType<typeof setInterval> | null = null;
  let step = 0;

  const tone = (f: number, t: number, dur: number, vol: number) => {
    if (!ctx || !master) return;
    const o = ctx.createOscillator();
    const g = ctx.createGain();
    o.type = "sine";
    o.frequency.value = f;
    g.gain.setValueAtTime(0, t);
    g.gain.linearRampToValueAtTime(vol, t + 0.03);
    g.gain.exponentialRampToValueAtTime(0.0001, t + dur);
    o.connect(g).connect(master);
    o.start(t);
    o.stop(t + dur + 0.05);
  };

  const tick = () => {
    if (!ctx) return;
    const t = ctx.currentTime + 0.05;
    tone(notes[step % notes.length] ?? 523.25, t, 1.6, 0.18);
    if (step % 4 === 0) tone(bass[(step / 4) % bass.length] ?? 261.63, t, 3, 0.12);
    step++;
  };

  return {
    play() {
      if (!ctx) {
        ctx = new AudioContext();
        master = ctx.createGain();
        master.gain.value = 0.5;
        master.connect(ctx.destination);
      }
      void ctx.resume();
      if (!timer) { tick(); timer = setInterval(tick, 450); }
    },
    pause() {
      if (timer) clearInterval(timer);
      timer = null;
      void ctx?.suspend();
    },
  };
}
