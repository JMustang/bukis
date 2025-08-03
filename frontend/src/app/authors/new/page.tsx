'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { ArrowLeft, Save } from 'lucide-react';
import Link from 'next/link';
import { authorsApi } from '@/services/api';
import { CreateAuthorData } from '@/types';
import { Button } from '@/components/ui/Button';

export default function NewAuthorPage() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState<CreateAuthorData>({
    name: '',
    birth: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await authorsApi.create(formData);
      router.push('/authors');
    } catch (error) {
      console.error('Erro ao criar autor:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: keyof CreateAuthorData, value: string) => {
    setFormData(prev => ({
      ...prev,
      [field]: value,
    }));
  };

  return (
    <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      {/* Header */}
      <div className="mb-8">
        <Link href="/authors" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-4">
          <ArrowLeft className="h-4 w-4 mr-2" />
          Voltar para Autores
        </Link>
        <h1 className="text-3xl font-bold text-gray-900">Adicionar Novo Autor</h1>
        <p className="mt-2 text-gray-600">
          Preencha as informações do autor
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow-sm border p-6">
        <div className="space-y-6">
          {/* Name */}
          <div>
            <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
              Nome *
            </label>
            <input
              type="text"
              id="name"
              required
              value={formData.name}
              onChange={(e) => handleInputChange('name', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              placeholder="Digite o nome do autor"
            />
          </div>

          {/* Birth Date */}
          <div>
            <label htmlFor="birth" className="block text-sm font-medium text-gray-700 mb-2">
              Data de Nascimento (opcional)
            </label>
            <input
              type="date"
              id="birth"
              value={formData.birth}
              onChange={(e) => handleInputChange('birth', e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>

          {/* Submit Button */}
          <div className="flex justify-end space-x-4 pt-6 border-t">
            <Link href="/authors">
              <Button variant="outline" type="button">
                Cancelar
              </Button>
            </Link>
            <Button type="submit" loading={loading}>
              <Save className="h-4 w-4 mr-2" />
              Salvar Autor
            </Button>
          </div>
        </div>
      </form>
    </div>
  );
} 