export function todayKey() {
  return new Date().toISOString().slice(0, 10);
}

export function readableDate(date = new Date()) {
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "short",
    day: "numeric"
  });
}

export function createId(prefix: string) {
  return `${prefix}_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
}

export function isToday(isoDate: string) {
  return isoDate.slice(0, 10) === todayKey();
}
