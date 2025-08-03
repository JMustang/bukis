import axios from "axios";
import {
  Book,
  Author,
  Bookcase,
  CreateBookData,
  CreateAuthorData,
  CreateBookcaseData,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:3000";

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Books API
export const booksApi = {
  getAll: async (): Promise<Book[]> => {
    const response = await api.get("/books.json");
    return response.data;
  },

  getById: async (id: number): Promise<Book> => {
    const response = await api.get(`/books/${id}.json`);
    return response.data;
  },

  create: async (data: CreateBookData): Promise<Book> => {
    const response = await api.post("/books.json", { book: data });
    return response.data;
  },

  update: async (id: number, data: Partial<CreateBookData>): Promise<Book> => {
    const response = await api.patch(`/books/${id}.json`, { book: data });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/books/${id}.json`);
  },
};

// Authors API
export const authorsApi = {
  getAll: async (): Promise<Author[]> => {
    const response = await api.get("/authors.json");
    return response.data;
  },

  getById: async (id: number): Promise<Author> => {
    const response = await api.get(`/authors/${id}.json`);
    return response.data;
  },

  create: async (data: CreateAuthorData): Promise<Author> => {
    const response = await api.post("/authors.json", { author: data });
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<CreateAuthorData>
  ): Promise<Author> => {
    const response = await api.patch(`/authors/${id}.json`, { author: data });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/authors/${id}.json`);
  },
};

// Bookcases API
export const bookcasesApi = {
  getAll: async (): Promise<Bookcase[]> => {
    const response = await api.get("/bookcases.json");
    return response.data;
  },

  getById: async (id: number): Promise<Bookcase> => {
    const response = await api.get(`/bookcases/${id}.json`);
    return response.data;
  },

  create: async (data: CreateBookcaseData): Promise<Bookcase> => {
    const response = await api.post("/bookcases.json", { bookcase: data });
    return response.data;
  },

  update: async (
    id: number,
    data: Partial<CreateBookcaseData>
  ): Promise<Bookcase> => {
    const response = await api.patch(`/bookcases/${id}.json`, {
      bookcase: data,
    });
    return response.data;
  },

  delete: async (id: number): Promise<void> => {
    await api.delete(`/bookcases/${id}.json`);
  },
};
