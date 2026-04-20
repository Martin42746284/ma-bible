import { getBooks } from "./bibleService";
import { SearchResult, Testament } from "@/types/bible";

export function search(
  q: string,
  filter: "all" | Testament = "all",
  limit = 200
): SearchResult[] {
  const term = q.trim().toLowerCase();
  if (term.length < 2) return [];
  const out: SearchResult[] = [];
  for (const b of getBooks()) {
    if (filter !== "all" && b.testament !== filter) continue;
    for (const c of b.chapitres) {
      for (const v of c.versets) {
        if (v.texte.toLowerCase().includes(term)) {
          out.push({
            book: b.nom, abrev: b.abrev, testament: b.testament,
            chapter: c.numero, verse: v.numero, text: v.texte,
          });
          if (out.length >= limit) return out;
        }
      }
    }
  }
  return out;
}
