export interface Author {
  id: number;
  name: string;
  birth?: string;
  created_at: string;
  updated_at: string;
}

export interface Bookcase {
  id: number;
  name: string;
  limit: number;
  created_at: string;
  updated_at: string;
}

export interface Book {
  id: number;
  title: string;
  rating?: number;
  comment?: string;
  bookcase_id: number;
  author_id: number;
  created_at: string;
  updated_at: string;
  bookcase?: Bookcase;
  author?: Author;
}

export interface CreateBookData {
  title: string;
  rating?: number;
  comment?: string;
  bookcase_id: number;
  author_id: number;
}

export interface CreateAuthorData {
  name: string;
  birth?: string;
}

export interface CreateBookcaseData {
  name: string;
  limit: number;
}
