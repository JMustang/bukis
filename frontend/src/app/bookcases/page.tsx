'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { Archive, Plus, Search, Edit, Trash2, BookOpen } from 'lucide-react';
import { bookcasesApi } from '@/services/api';
import { Bookcase } from '@/types';
import { Button } from '@/components/ui/Button';
import { Modal } from '@/components/ui/Modal';

export default function BookcasesPage() {
  const [bookcases, setBookcases] = useState<Bookcase[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [deleteModal, setDeleteModal] = useState<{ isOpen: boolean; bookcase: Bookcase | null }>({
    isOpen: false,
    bookcase: null,
  });

  useEffect(() => {
    fetchBookcases();
  }, []);

  const fetchBookcases = async () => {
    try {
      const data = await bookcasesApi.getAll();
      setBookcases(data);
    } catch (error) {
      console.error('Erro ao carregar estantes:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async (bookcase: Bookcase) => {
    try {
      await bookcasesApi.delete(bookcase.id);
      setBookcases(bookcases.filter(b => b.id !== bookcase.id));
      setDeleteModal({ isOpen: false, bookcase: null });
    } catch (error) {
      console.error('Erro ao deletar estante:', error);
    }
  };

  const filteredBookcases = bookcases.filter(bookcase =>
    bookcase.name.toLowerCase().includes(searchTerm.toLowerCase())
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
          <h1 className="text-3xl font-bold text-gray-900">Estantes</h1>
          <p className="mt-2 text-gray-600">
            Gerencie as estantes da sua biblioteca
          </p>
        </div>
        <Link href="/bookcases/new">
          <Button className="mt-4 sm:mt-0">
            <Plus className="h-4 w-4 mr-2" />
            Criar Estante
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

      {/* Bookcases Grid */}
      {filteredBookcases.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredBookcases.map((bookcase) => (
            <div key={bookcase.id} className="bg-white rounded-lg shadow-sm border p-6 hover:shadow-md transition-shadow">
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 mb-2">{bookcase.name}</h3>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-medium">Limite:</span> {bookcase.limit} livros
                  </p>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">ID:</span> {bookcase.id}
                  </p>
                </div>
                <div className="flex items-center text-gray-400">
                  <Archive className="h-5 w-5" />
                </div>
              </div>

              <div className="flex items-center justify-between pt-4 border-t">
                <Link href={`/bookcases/${bookcase.id}/edit`}>
                  <Button variant="outline" size="sm">
                    <Edit className="h-4 w-4 mr-1" />
                    Editar
                  </Button>
                </Link>
                <Button
                  variant="danger"
                  size="sm"
                  onClick={() => setDeleteModal({ isOpen: true, bookcase })}
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
          <Archive className="h-16 w-16 text-gray-400 mx-auto mb-4" />
          <h3 className="text-lg font-medium text-gray-900 mb-2">
            {searchTerm ? 'Nenhuma estante encontrada' : 'Nenhuma estante criada'}
          </h3>
          <p className="text-gray-500 mb-6">
            {searchTerm 
              ? 'Tente ajustar sua busca'
              : 'Comece criando sua primeira estante para organizar os livros'
            }
          </p>
          {!searchTerm && (
            <Link href="/bookcases/new">
              <Button>
                <Plus className="h-4 w-4 mr-2" />
                Criar Primeira Estante
              </Button>
            </Link>
          )}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      <Modal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, bookcase: null })}
        title="Confirmar Exclusão"
        size="sm"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-6">
            Tem certeza que deseja excluir a estante &quot;{deleteModal.bookcase?.name}&quot;?
          </p>
          <div className="flex justify-center space-x-4">
            <Button
              variant="outline"
              onClick={() => setDeleteModal({ isOpen: false, bookcase: null })}
            >
              Cancelar
            </Button>
            <Button
              variant="danger"
              onClick={() => deleteModal.bookcase && handleDelete(deleteModal.bookcase)}
            >
              Excluir
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
} 