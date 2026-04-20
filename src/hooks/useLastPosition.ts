import { useEffect, useState, useCallback } from "react";
import { getJSON, setJSON, KEYS } from "@/services/storage";
import { LastPosition } from "@/types/bible";

export function useLastPosition() {
  const [last, setLast] = useState<LastPosition | null>(null);
  useEffect(() => { getJSON<LastPosition | null>(KEYS.lastPosition, null).then(setLast); }, []);
  const save = useCallback(async (p: Omit<LastPosition, "updatedAt">) => {
    const next = { ...p, updatedAt: new Date().toISOString() };
    setLast(next); await setJSON(KEYS.lastPosition, next);
    const hist = await getJSON<string[]>(KEYS.history, []);
    const day = next.updatedAt.slice(0, 10);
    if (!hist.includes(day)) await setJSON(KEYS.history, [...hist, day]);
  }, []);
  return { last, save };
}
