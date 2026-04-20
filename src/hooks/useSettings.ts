import { useEffect, useState, useCallback } from "react";
import { getJSON, setJSON, KEYS } from "@/services/storage";
import { Settings } from "@/types/bible";

const DEFAULT: Settings = { theme: "system", fontSize: 17 };

export function useSettings() {
  const [settings, setSettings] = useState<Settings>(DEFAULT);
  useEffect(() => { getJSON(KEYS.settings, DEFAULT).then(setSettings); }, []);
  const update = useCallback(async (patch: Partial<Settings>) => {
    setSettings((prev) => {
      const next = { ...prev, ...patch };
      setJSON(KEYS.settings, next);
      return next;
    });
  }, []);
  return { settings, update };
}
