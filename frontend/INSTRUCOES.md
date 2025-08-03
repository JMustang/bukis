# 🚀 Instruções de Uso - Frontend Bukis

## Configuração Inicial

### 1. Backend Rails

Certifique-se de que o backend Rails está rodando:

```bash
cd /Users/junior/Documents/www/Ruby/rails/bukis
rails server
```

O backend deve estar rodando em: <http://localhost:3000>

### 2. Frontend Next.js

Em outro terminal, execute o frontend:

```bash
cd frontend
npm run dev
```

O frontend estará disponível em: <http://localhost:3001>

## Funcionalidades Disponíveis

### 📊 Dashboard

- Visão geral da biblioteca
- Estatísticas em tempo real
- Ações rápidas

### 📚 Gerenciamento de Livros

- Listar todos os livros
- Adicionar novo livro
- Buscar por título, autor ou estante
- Avaliar livros (1-5 estrelas)
- Adicionar comentários

### 👥 Gerenciamento de Autores

- Listar todos os autores
- Adicionar novo autor
- Buscar por nome
- Data de nascimento opcional

### 📦 Gerenciamento de Estantes

- Listar todas as estantes
- Criar nova estante
- Definir limite de livros
- Buscar por nome

## Fluxo de Uso Recomendado

1. **Primeiro, crie algumas estantes** (ex: "Ficção", "Não-ficção", "Técnico")
2. **Adicione alguns autores** (ex: "J.K. Rowling", "George R.R. Martin")
3. **Adicione livros** associando-os a autores e estantes
4. **Explore o dashboard** para ver as estatísticas

## Solução de Problemas

### Erro de CORS

Se aparecer erro de CORS, certifique-se de que:

- O backend Rails está rodando
- A gem `rack-cors` está instalada
- O arquivo `config/initializers/cors.rb` está configurado

### Erro de Conexão

Se o frontend não conseguir conectar com o backend:

- Verifique se o Rails está rodando na porta 3000
- Verifique se não há firewall bloqueando
- Tente acessar <http://localhost:3000> diretamente

### Erro de Script

Se aparecer "Missing script: dev":

- Certifique-se de estar no diretório `frontend`
- Execute `npm install` se necessário
- Verifique se o `package.json` está correto

## URLs Importantes

- **Frontend**: <http://localhost:3001>
- **Backend API**: <http://localhost:3000>
- **Dashboard**: <http://localhost:3001>
- **Livros**: <http://localhost:3001/books>
- **Autores**: <http://localhost:3001/authors>
- **Estantes**: <http://localhost:3001/bookcases>

## Desenvolvimento

Para desenvolvimento, ambos os servidores devem estar rodando:

- Rails na porta 3000
- Next.js na porta 3001

As mudanças no código são refletidas automaticamente (hot reload).
