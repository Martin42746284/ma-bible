import { Bible, Book } from "@/types/bible";
const data: Bible = require("../../assets/bible.json");

export const getBible = (): Bible => data;
export const getBooks = (): Book[] => data.livres;
export const getBook = (name: string): Book | undefined =>
  data.livres.find((b) => b.nom === name || b.abrev === name);
export const getChapter = (book: string, chapter: number) =>
  getBook(book)?.chapitres.find((c) => c.numero === chapter);

export const verseId = (book: string, ch: number, v: number) =>
  `${book.toLowerCase().replace(/\s+/g, "-")}-${ch}-${v}`;
