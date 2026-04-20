import { getBooks } from "@/services/bibleService";

export function useVerseOfDay() {
  const books = getBooks();
  const day = new Date();
  const seed = day.getFullYear()*1000 + day.getMonth()*40 + day.getDate();
  const b = books[seed % books.length];
  const c = b.chapitres[seed % b.chapitres.length];
  const v = c.versets[seed % c.versets.length];
  return { book: b.nom, chapter: c.numero, verse: v.numero, text: v.texte };
}
