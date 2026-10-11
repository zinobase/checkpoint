// Procedural Web Audio synthesis module for Checkpoint RFID & Turnstile HUD.
// Implemented as a pure object literal module with module-scoped state.

let sharedAudioCtx: AudioContext | null = null;
let audioArmed = true;

function acquireContext(): AudioContext | null {
  if (!audioArmed || typeof window === 'undefined') {
    return null;
  }
  if (!sharedAudioCtx) {
    const Ctor =
      window.AudioContext ||
      (window as unknown as { webkitAudioContext?: typeof AudioContext }).webkitAudioContext;
    if (Ctor) {
      sharedAudioCtx = new Ctor();
    }
  }
  if (sharedAudioCtx && sharedAudioCtx.state === 'suspended') {
    sharedAudioCtx.resume().catch(() => {});
  }
  return sharedAudioCtx;
}

export const piezoAudio = {
  isArmed(): boolean {
    return audioArmed;
  },

  flipPower(): boolean {
    audioArmed = !audioArmed;
    if (audioArmed) {
      this.solenoidClick();
    }
    return audioArmed;
  },

  // Pneumatic solenoid click for tactile controls and turnstile latch release
  solenoidClick(pitchHz = 920): void {
    const ctx = acquireContext();
    if (!ctx) return;
    try {
      const t0 = ctx.currentTime;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'triangle';
      osc.frequency.setValueAtTime(pitchHz, t0);
      osc.frequency.exponentialRampToValueAtTime(140, t0 + 0.032);
      env.gain.setValueAtTime(0.09, t0);
      env.gain.exponentialRampToValueAtTime(0.001, t0 + 0.032);
      osc.connect(env);
      env.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.034);
    } catch {
      // Ignore audio hardware restrictions
    }
  },

  // Contactless RFID reader inductive field ping
  rfidScanPing(): void {
    const ctx = acquireContext();
    if (!ctx) return;
    try {
      const t0 = ctx.currentTime;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(2100, t0);
      osc.frequency.setValueAtTime(2650, t0 + 0.035);
      env.gain.setValueAtTime(0.075, t0);
      env.gain.exponentialRampToValueAtTime(0.001, t0 + 0.095);
      osc.connect(env);
      env.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.1);
    } catch {
      // Ignore audio hardware restrictions
    }
  },

  // Zero-knowledge circuit witness evaluation carrier sweep
  circuitSweep(): void {
    const ctx = acquireContext();
    if (!ctx) return;
    try {
      const t0 = ctx.currentTime;
      const osc = ctx.createOscillator();
      const env = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(320, t0);
      osc.frequency.exponentialRampToValueAtTime(1280, t0 + 0.26);
      env.gain.setValueAtTime(0.035, t0);
      env.gain.exponentialRampToValueAtTime(0.001, t0 + 0.28);
      osc.connect(env);
      env.connect(ctx.destination);
      osc.start(t0);
      osc.stop(t0 + 0.29);
    } catch {
      // Ignore audio hardware restrictions
    }
  },

  // Dual-tone 2400Hz / 3200Hz high-tech RFID piezo chirp on passage grant
  grantPiezoChirp(): void {
    const ctx = acquireContext();
    if (!ctx) return;
    try {
      const t0 = ctx.currentTime;
      const tones: [number, number, number][] = [
        [2400, 0.0, 0.075],
        [3200, 0.07, 0.14],
      ];
      for (const [hz, offset, dur] of tones) {
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(hz, t0 + offset);
        env.gain.setValueAtTime(0.085, t0 + offset);
        env.gain.exponentialRampToValueAtTime(0.001, t0 + offset + dur);
        osc.connect(env);
        env.connect(ctx.destination);
        osc.start(t0 + offset);
        osc.stop(t0 + offset + dur + 0.01);
      }
      // Follow with pneumatic solenoid latch release click
      this.solenoidClick(540);
    } catch {
      // Ignore audio hardware restrictions
    }
  },

  // Low 160Hz security lockdown buzz on access denial or revocation
  denyLockdownBuzz(): void {
    const ctx = acquireContext();
    if (!ctx) return;
    try {
      const t0 = ctx.currentTime;
      for (const pulseOffset of [0, 0.13]) {
        const osc = ctx.createOscillator();
        const env = ctx.createGain();
        osc.type = 'sawtooth';
        osc.frequency.setValueAtTime(160, t0 + pulseOffset);
        env.gain.setValueAtTime(0.09, t0 + pulseOffset);
        env.gain.exponentialRampToValueAtTime(0.001, t0 + pulseOffset + 0.105);
        osc.connect(env);
        env.connect(ctx.destination);
        osc.start(t0 + pulseOffset);
        osc.stop(t0 + pulseOffset + 0.11);
      }
    } catch {
      // Ignore audio hardware restrictions
    }
  },
};
