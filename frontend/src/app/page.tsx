'use client';

import React, { useEffect, useState } from 'react';
import { BookOpen, Users, Archive, Plus, TrendingUp } from 'lucide-react';
import Link from 'next/link';
import { booksApi, authorsApi, bookcasesApi } from '@/services/api';
import { Book, Author, Bookcase } from '@/types';
import { Button } from '@/components/ui/Button';

export default function HomePage() {
  const [stats, setStats] = useState({
    totalBooks: 0,
    totalAuthors: 0,
    totalBookcases: 0,
    recentBooks: [] as Book[],
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const [books, authors, bookcases] = await Promise.all([
          booksApi.getAll(),
          authorsApi.getAll(),
          bookcasesApi.getAll(),
        ]);

        setStats({
          totalBooks: books.length,
          totalAuthors: authors.length,
          totalBookcases: bookcases.length,
          recentBooks: books.slice(0, 5), // Últimos 5 livros
        });
      } catch (error) {
        console.error('Erro ao carregar estatísticas:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    {
      name: 'Total de Livros',
      value: stats.totalBooks,
      icon: BookOpen,
      href: '/books',
      color: 'bg-blue-500',
    },
    {
      name: 'Total de Autores',
      value: stats.totalAuthors,
      icon: Users,
      href: '/authors',
      color: 'bg-green-500',
    },
    {
      name: 'Total de Estantes',
      value: stats.totalBookcases,
      icon: Archive,
      href: '/bookcases',
      color: 'bg-purple-500',
    },
  ];

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Dashboard</h1>
          <p className="mt-2 text-gray-600 dark:text-gray-400">
            Gerencie sua biblioteca pessoal de forma simples e eficiente
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
          {statCards.map((stat) => (
            <Link key={stat.name} href={stat.href}>
              <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer">
                <div className="flex items-center">
                  <div className={`p-3 rounded-lg ${stat.color}`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <div className="ml-4">
                    <p className="text-sm font-medium text-gray-600 dark:text-gray-400">{stat.name}</p>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Quick Actions */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Ações Rápidas</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Link href="/books/new">
              <Button className="w-full justify-center">
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Livro
              </Button>
            </Link>
            <Link href="/authors/new">
              <Button variant="outline" className="w-full justify-center">
                <Users className="h-4 w-4 mr-2" />
                Adicionar Autor
              </Button>
            </Link>
            <Link href="/bookcases/new">
              <Button variant="outline" className="w-full justify-center">
                <Archive className="h-4 w-4 mr-2" />
                Criar Estante
              </Button>
            </Link>
          </div>
        </div>

        {/* Recent Books */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 p-6">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-white">Livros Recentes</h2>
            <Link href="/books">
              <Button variant="outline" size="sm">
                Ver Todos
              </Button>
            </Link>
          </div>
          
          {stats.recentBooks.length > 0 ? (
            <div className="space-y-4">
              {stats.recentBooks.map((book) => (
                <div key={book.id} className="flex items-center justify-between p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <div>
                    <h3 className="font-medium text-gray-900 dark:text-white">{book.title}</h3>
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      {book.author?.name} • {book.bookcase?.name}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {book.rating && (
                      <div className="flex items-center text-yellow-500">
                        <TrendingUp className="h-4 w-4 mr-1" />
                        <span className="text-sm">{book.rating}/5</span>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8">
              <BookOpen className="h-12 w-12 text-gray-400 dark:text-gray-500 mx-auto mb-4" />
              <p className="text-gray-500 dark:text-gray-400">Nenhum livro adicionado ainda</p>
              <Link href="/books/new">
                <Button className="mt-4">
                  <Plus className="h-4 w-4 mr-2" />
                  Adicionar Primeiro Livro
                </Button>
              </Link>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
