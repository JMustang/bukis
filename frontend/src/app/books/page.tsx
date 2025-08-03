'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { BookOpen, Plus, Search, Edit, Trash2, Star } from 'lucide-react';
import { booksApi } from '@/services/api';
import { Book } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function BooksPage() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; book: Book | null }>({
    isOpen: false,
    book: null,
  });

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const data = await booksApi.getAll();
      setBooks(data);
    } catch (error) {
      console.error('Erro ao carregar livros:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (book: Book) => {
    try {
      await booksApi.delete(book.id);
      setBooks(books.filter(b => b.id !== book.id));
      setDeleteModal({ isOpen: false, book: null });
    } catch (error) {
      console.error('Erro ao deletar livro:', error);
    }
  };

  const filteredBooks = books.filter(book =>
    book.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.author?.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    book.bookcase?.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between mb-8">
        <div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Livros</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gerencie sua coleção de livros
          </p>
        </div>
        <Link href="/books/new">
          <Button className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Livro
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 dark:text-gray-500 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar por título, autor ou estante..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent bg-white dark:bg-gray-800 text-gray-900 dark:text-white placeholder-gray-500 dark:placeholder-gray-400"
          />
        </div>
      </div>

      {/* Books Grid */}
      {filteredBooks.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBooks.map((book) => (
            <div key={book.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{book.title}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Autor:</span> {book.author?.name}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Estante:</span> {book.bookcase?.name}
                  </p>
                  {book.rating && (
                    <div className="flex items-center mt-2">
                      <Star className="h-4 w-4 text-yellow-500 mr-1" />
                      <span className="text-sm text-gray-600">{book.rating}/5</span>
                    </div>
                  )}
                  {book.comment && (
                    <p className="text-sm text-gray-500 mt-2 italic">"{book.comment}"</p>
                  )}
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Link href={`/books/${book.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteModal({ isOpen: true, book })}
                >
                  <Trash2 className="h-4 w-4 mr-1" />
                  Excluir
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <BookOpen className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Nenhum livro encontrado' : 'Nenhum livro adicionado'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? 'Tente ajustar sua busca'
              : 'Comece adicionando seu primeiro livro à biblioteca'
            }
          </p>
          {!searchTerm && (
            <Link href="/books/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Livro
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, book: null })}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 dark:text-gray-400 mb-6">
            Tem certeza que deseja excluir o livro &quot;{deleteModal.book?.title}&quot;?
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ isOpen: false, book: null })}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteModal.book && handleDelete(deleteModal.book)}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 