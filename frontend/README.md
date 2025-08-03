# Bukis Frontend

Frontend Next.js para o sistema de gerenciamento de biblioteca Bukis.

## Funcionalidades

- **Dashboard**: Visão geral com estatísticas e livros recentes
- **Gerenciamento de Livros**: Adicionar, editar, excluir e buscar livros
- **Gerenciamento de Autores**: Adicionar, editar e excluir autores
- **Gerenciamento de Estantes**: Criar e gerenciar estantes com limites
- **Interface Responsiva**: Design moderno e adaptável

## Tecnologias Utilizadas

- **Next.js 14**: Framework React com App Router
- **TypeScript**: Tipagem estática
- **Tailwind CSS**: Estilização utilitária
- **Axios**: Cliente HTTP para API
- **Lucide React**: Ícones
- **Headless UI**: Componentes acessíveis

## Estrutura do Projeto

```
frontend/
├── src/
│   ├── app/                 # Páginas da aplicação
│   │   ├── books/          # Páginas de livros
│   │   ├── authors/        # Páginas de autores
│   │   ├── bookcases/      # Páginas de estantes
│   │   └── layout.tsx      # Layout principal
│   ├── components/         # Componentes reutilizáveis
│   │   ├── ui/            # Componentes de UI
│   │   └── layout/        # Componentes de layout
│   ├── services/          # Serviços de API
│   ├── types/             # Tipos TypeScript
│   └── lib/               # Utilitários
```

## Configuração

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Backend Rails rodando na porta 3000

### Instalação

1. Instale as dependências:

```bash
npm install
```

2. Configure a variável de ambiente (opcional):

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3000
```

3. Execute o servidor de desenvolvimento:

```bash
npm run dev
```

4. Acesse <http://localhost:3001>

## API Endpoints

O frontend se comunica com o backend Rails através dos seguintes endpoints:

### Livros

- `GET /books.json` - Listar todos os livros
- `POST /books.json` - Criar novo livro
- `PATCH /books/:id.json` - Atualizar livro
- `DELETE /books/:id.json` - Excluir livro

### Autores

- `GET /authors.json` - Listar todos os autores
- `POST /authors.json` - Criar novo autor
- `PATCH /authors/:id.json` - Atualizar autor
- `DELETE /authors/:id.json` - Excluir autor

### Estantes

- `GET /bookcases.json` - Listar todas as estantes
- `POST /bookcases.json` - Criar nova estante
- `PATCH /bookcases/:id.json` - Atualizar estante
- `DELETE /bookcases/:id.json` - Excluir estante

## Funcionalidades Principais

### Dashboard

- Estatísticas em tempo real
- Ações rápidas para adicionar conteúdo
- Lista dos livros mais recentes

### Gerenciamento de Livros

- Listagem com busca por título, autor ou estante
- Formulário completo para adicionar livros
- Avaliação por estrelas (1-5)
- Comentários opcionais
- Validação de limite de estantes

### Gerenciamento de Autores

- Listagem com busca por nome
- Formulário para adicionar autores
- Data de nascimento opcional

### Gerenciamento de Estantes

- Listagem com busca por nome
- Configuração de limite de livros
- Validação automática de capacidade

## Scripts Disponíveis

```bash
npm run dev          # Servidor de desenvolvimento
npm run build        # Build de produção
npm run start        # Servidor de produção
npm run lint         # Verificação de código
```

## Deploy

Para fazer deploy em produção:

1. Configure a variável `NEXT_PUBLIC_API_URL` com a URL do seu backend
2. Execute `npm run build`
3. Execute `npm run start`

## Contribuição

1. Faça um fork do projeto
2. Crie uma branch para sua feature
3. Commit suas mudanças
4. Push para a branch
5. Abra um Pull Request
