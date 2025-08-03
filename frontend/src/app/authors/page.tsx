'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Users, Plus, Search, Edit, Trash2, BookOpen } from 'lucide-react';
import { authorsApi } from '@/services/api';
import { Author } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function AuthorsPage() {
  const [authors, setAuthors] = useState<Author[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; author: Author | null }>({
    isOpen: false,
    author: null,
  });

  useEffect(() => {
    fetchAuthors();
  }, []);

  const fetchAuthors = async () => {
    try {
      const data = await authorsApi.getAll();
      setAuthors(data);
    } catch (error) {
      console.error('Erro ao carregar autores:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (author: Author) => {
    try {
      await authorsApi.delete(author.id);
      setAuthors(authors.filter(a => a.id !== author.id));
      setDeleteModal({ isOpen: false, author: null });
    } catch (error) {
      console.error('Erro ao deletar autor:', error);
    }
  };

  const filteredAuthors = authors.filter(author =>
    author.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900">Autores</h1>
          <p className="mt-2 text-gray-600">
            Gerencie os autores da sua biblioteca
          </p>
        </div>
        <Link href="/authors/new">
          <Button className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Adicionar Autor
          </Button>
        </Link>
      </div>

      {/* Search */}
      <div className="mb-6">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <input
            type="text"
            placeholder="Buscar por nome..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      {/* Authors Grid */}
      {filteredAuthors.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAuthors.map((author) => (
            <div key={author.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{author.name}</h3>
                  {author.birth && (
                    <p className="text-sm text-gray-600 mb-1">
                      <span className="font-medium">Nascimento:</span> {new Date(author.birth).toLocaleDateString('pt-BR')}
                    </p>
                  )}
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">ID:</span> {author.id}
                  </p>
                </div>
                <div className="flex items-center text-gray-400">
                  <BookOpen className="h-5 w-5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Link href={`/authors/${author.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteModal({ isOpen: true, author })}
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
          <Users className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Nenhum autor encontrado' : 'Nenhum autor adicionado'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? 'Tente ajustar sua busca'
              : 'Comece adicionando seu primeiro autor à biblioteca'
            }
          </p>
          {!searchTerm && (
            <Link href="/authors/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Adicionar Primeiro Autor
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, author: null })}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Tem certeza que deseja excluir o autor "{deleteModal.author?.name}"?
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ isOpen: false, author: null })}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteModal.author && handleDelete(deleteModal.author)}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 