import { Bible, Book, SegondBible, RawVerse } from "@/types/bible";

const rawData: SegondBible = require("../../segond_1910.json");

// Transformer les données du format verses en format livres/chapitres/versets
const transformBibleData = (rawData: SegondBible): Bible => {
  const booksMap = new Map<number, any>();

  // Grouper les versets par livre et chapitre
  rawData.verses.forEach((verse: RawVerse) => {
    if (!booksMap.has(verse.book)) {
      booksMap.set(verse.book, {
        book_name: verse.book_name,
        book: verse.book,
        chapters: new Map<number, any>(),
      });
    }

    const book = booksMap.get(verse.book);
    if (!book.chapters.has(verse.chapter)) {
      book.chapters.set(verse.chapter, {
        numero: verse.chapter,
        versets: [],
      });
    }

    book.chapters.get(verse.chapter).versets.push({
      numero: verse.verse,
      texte: verse.text,
    });
  });

  // Convertir en structure Bible
  const livres = Array.from(booksMap.values()).map((book: any) => ({
    nom: book.book_name,
    abrev: book.book_name.substring(0, 3), // Utiliser les 3 premières lettres
    testament: book.book <= 39 ? "ancien" : "nouveau", // Ancien testament: livres 1-39
    chapitres: Array.from(book.chapters.values()),
  }));

  return { livres };
};

const data = transformBibleData(rawData);

export const getBible = (): Bible => data;
export const getBooks = (): Book[] => data.livres;
export const getBook = (name: string): Book | undefined =>
  data.livres.find((b) => b.nom === name || b.abrev === name);
export const getChapter = (book: string, chapter: number) =>
  getBook(book)?.chapitres.find((c) => c.numero === chapter);

export const verseId = (book: string, ch: number, v: number) =>
  `${book.toLowerCase().replace(/\s+/g, "-")}-${ch}-${v}`;
