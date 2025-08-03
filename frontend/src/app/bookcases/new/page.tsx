'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { bookcasesApi } from '@/services/api';
import { CreateBookcaseData } from '@/types';
import { Button } from '@/components/ui/Button';

export default function NewBookcasePage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateBookcaseData>({
    name: '',
    limit: 10,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await bookcasesApi.create(formData);
      router.push('/bookcases');
    } catch (error) {
      console.error('Erro ao criar estante:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateBookcaseData, value: string | number) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/bookcases" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Estantes
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Criar Nova Estante</h1>
        <p className="mt-2 text-gray-600">
          Configure uma nova estante para organizar seus livros
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome da Estante *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Ex: Ficção, Não-ficção, Técnico..."
            />
          </div>

          {/* Limit */}
          <div>
            <label htmlFor="limit" className="block text-sm font-medium text-gray-700 mb-2">
              Limite de Livros *
            </label>
            <input
              type="number"
              id="limit"
              required
              min="1"
              max="1000"
              value={formData.limit}
              onChange={(e) => handleInputChange('limit', parseInt(e.target.value))}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            <p className="text-sm text-gray-500 mt-1">
              Número máximo de livros que esta estante pode conter
            </p>
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link href="/bookcases">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" loading={loading}>
              <Save className="h-4 w-4 mr-2" />
              Criar Estante
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 