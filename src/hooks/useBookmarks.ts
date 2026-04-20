import { useEffect, useState, useCallback } from "react";
import { getJSON, setJSON, KEYS } from "@/services/storage";
import { Bookmark } from "@/types/bible";
import { verseId } from "@/services/bibleService";

export function useBookmarks() {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  useEffect(() => { getJSON<Bookmark[]>(KEYS.bookmarks, []).then(setBookmarks); }, []);

  const persist = (list: Bookmark[]) => { setBookmarks(list); setJSON(KEYS.bookmarks, list); };

  const isBookmarked = useCallback(
    (book: string, ch: number, v: number) =>
      bookmarks.some((b) => b.id === verseId(book, ch, v)),
    [bookmarks]
  );

  const toggle = useCallback((b: Omit<Bookmark, "id" | "addedAt">) => {
    const id = verseId(b.book, b.chapter, b.verse);
    const exists = bookmarks.find((x) => x.id === id);
    persist(exists
      ? bookmarks.filter((x) => x.id !== id)
      : [{ ...b, id, addedAt: new Date().toISOString() }, ...bookmarks]);
  }, [bookmarks]);

  const remove = useCallback((id: string) => persist(bookmarks.filter((b) => b.id !== id)), [bookmarks]);
  const clear = useCallback(() => persist([]), []);

  return { bookmarks, isBookmarked, toggle, remove, clear };
}
