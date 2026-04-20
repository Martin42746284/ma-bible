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
