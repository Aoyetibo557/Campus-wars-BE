export type SessionLike = { started_at?: string | null };

/**
 * Calculate streaks from an array of sessions that contain `created_at`.
 * - current: consecutive days up to today (or yesterday), else 0
 * - best: longest consecutive-day streak in history
 */
export function calculateStreaks(sessions: SessionLike[] | undefined | null): {
  current: number;
  best: number;
} {
  if (!sessions || sessions.length === 0) return { current: 0, best: 0 };

  // Normalize sessions into day numbers
  const daySet = new Set<number>();
  for (const s of sessions) {
    const ts = s?.started_at;
    if (!ts) continue;
    const d = new Date(ts);
    if (isNaN(d.getTime())) continue;

    const dayNum =
      Date.UTC(d.getUTCFullYear(), d.getUTCMonth(), d.getUTCDate()) /
      (1000 * 60 * 60 * 24);
    daySet.add(dayNum);
  }

  const days = Array.from(daySet).sort((a, b) => a - b);
  if (days.length === 0) return { current: 0, best: 0 };

  // --- Best streak ---
  let best = 1;
  let temp = 1;
  for (let i = 1; i < days.length; i++) {
    const prev = days[i - 1];
    const curr = days[i];
    if (prev !== undefined && curr === prev + 1) {
      temp++;
      if (temp > best) best = temp;
    } else {
      temp = 1;
    }
  }

  // --- Tail streak (ending at last recorded day) ---
  let tail = 1;
  for (let i = days.length - 1; i > 0; i--) {
    const prev = days[i - 1];
    const curr = days[i];
    if (prev !== undefined && curr === prev + 1) {
      tail++;
    } else {
      break;
    }
  }

  // --- Current streak ---
  const now = new Date();
  const todayDay =
    Date.UTC(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate()) /
    (1000 * 60 * 60 * 24);

  const lastDay = days[days.length - 1];
  if (lastDay === undefined) return { current: 0, best }; // safety

  const diff = todayDay - lastDay;
  const current = diff === 0 || diff === 1 ? tail : 0;

  return { current, best };
}
