'use client';

import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { booksApi, authorsApi, bookcasesApi } from '@/services/api';
import { CreateBookData, Author, Bookcase } from '@/types';
import { Button } from '@/components/ui/Button';

export default function NewBookPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [authors, setAuthors] = useState<Author[]>([]);
  const [bookcases, setBookcases] = useState<Bookcase[]>([]);
  const [formData, setFormData] = useState<CreateBookData>({
    title: '',
    rating: undefined,
    comment: '',
    bookcase_id: 0,
    author_id: 0,
  });

  useEffect(() => {
    fetchFormData();
  }, []);

  const fetchFormData = async () => {
    try {
      const [authorsData, bookcasesData] = await Promise.all([
        authorsApi.getAll(),
        bookcasesApi.getAll(),
      ]);
      setAuthors(authorsData);
      setBookcases(bookcasesData);
      
      // Set default values if available
      if (authorsData.length > 0 && bookcasesData.length > 0) {
        setFormData(prev => ({
          ...prev,
          author_id: authorsData[0].id,
          bookcase_id: bookcasesData[0].id,
        }));
      }
    } catch (error) {
      console.error('Erro ao carregar dados do formulário:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await booksApi.create(formData);
      router.push('/books');
    } catch (error) {
      console.error('Erro ao criar livro:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateBookData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/books" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Livros
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Adicionar Novo Livro</h1>
        <p className="mt-2 text-gray-600">
          Preencha as informações do livro
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-6">
          {/* Title */}
          <div>
            <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
              Título *
            </label>
            <input
              type="text"
              id="title"
              required
              value={formData.title}
              onChange={(e) => handleInputChange('title', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o título do livro"
            />
          </div>

          {/* Author */}
          <div>
            <label htmlFor="author" className="block text-sm font-medium text-gray-700 mb-2">
              Autor *
            </label>
            <select
              id="author"
              required
              value={formData.author_id}
              onChange={(e) => handleInputChange('author_id', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione um autor</option>
              {authors.map((author) => (
                <option key={author.id} value={author.id}>
                  {author.name}
                </option>
              ))}
            </select>
            <Link href="/authors/new" className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block">
              + Adicionar novo autor
            </Link>
          </div>

          {/* Bookcase */}
          <div>
            <label htmlFor="bookcase" className="block text-sm font-medium text-gray-700 mb-2">
              Estante *
            </label>
            <select
              id="bookcase"
              required
              value={formData.bookcase_id}
              onChange={(e) => handleInputChange('bookcase_id', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Selecione uma estante</option>
              {bookcases.map((bookcase) => (
                <option key={bookcase.id} value={bookcase.id}>
                  {bookcase.name} (Limite: {bookcase.limit})
                </option>
              ))}
            </select>
            <Link href="/bookcases/new" className="text-sm text-blue-600 hover:text-blue-800 mt-1 inline-block">
              + Criar nova estante
            </Link>
          </div>

          {/* Rating */}
          <div>
            <label htmlFor="rating" className="block text-sm font-medium text-gray-700 mb-2">
              Avaliação (opcional)
            </label>
            <select
              id="rating"
              value={formData.rating || ''}
              onChange={(e) => handleInputChange('rating', e.target.value ? parseInt(e.target.value) : undefined)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            >
              <option value="">Sem avaliação</option>
              {[1, 2, 3, 4, 5].map((rating) => (
                <option key={rating} value={rating}>
                  {rating} {rating === 1 ? 'estrela' : 'estrelas'}
                </option>
              ))}
            </select>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Comentário (opcional)
            </label>
            <textarea
              id="comment"
              rows={4}
              value={formData.comment}
              onChange={(e) => handleInputChange('comment', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Adicione um comentário sobre o livro..."
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link href="/books">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" loading={loading}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Livro
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 