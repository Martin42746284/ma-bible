import { getBooks, getBook, getChapter } from "@/services/bibleService";
export const useBible = () => ({ books: getBooks(), getBook, getChapter });
