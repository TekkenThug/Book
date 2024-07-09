interface OpenLibraryItem extends Record<string, string | string[]> {
  key: string;
  author_name: string[];
  title: string;
}

export interface OpenLibraryResponse {
  docs: OpenLibraryItem[];
}

export interface SearchingBook {
  id: string;
  author: string[];
  title: string;
}
