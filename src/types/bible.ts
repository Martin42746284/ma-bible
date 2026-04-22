export type Testament = "ancien" | "nouveau";

export interface Verse { numero: number; texte: string; }
export interface Chapter { numero: number; versets: Verse[]; }
export interface Book {
  nom: string;
  abrev: string;
  testament: Testament;
  chapitres: Chapter[];
}
export interface Bible { livres: Book[]; }

// Types pour segond_1910.json
export interface BibleMetadata {
  name: string;
  shortname: string;
  module: string;
  year: string;
  lang_short: string;
  copyright_statement: string;
}

export interface RawVerse {
  book_name: string;
  book: number;
  chapter: number;
  verse: number;
  text: string;
}

export interface SegondBible {
  metadata: BibleMetadata;
  verses: RawVerse[];
}

export interface Bookmark {
  id: string;
  book: string;
  chapter: number;
  verse: number;
  text: string;
  addedAt: string;
  category?: string;
}

export interface LastPosition {
  book: string;
  chapter: number;
  verse?: number;
  updatedAt: string;
}

export interface Settings {
  theme: "light" | "dark" | "system";
  fontSize: number;
}

export interface SearchResult {
  book: string;
  abrev: string;
  testament: Testament;
  chapter: number;
  verse: number;
  text: string;
}
