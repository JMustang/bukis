# 🧪 Teste da API Bukis

## Status dos Servidores

### ✅ Backend Rails

- **URL**: <http://localhost:3000>
- **Status**: ✅ Funcionando
- **Health Check**: ✅ Respondendo

### ✅ Frontend Next.js

- **URL**: <http://localhost:3001>
- **Status**: ✅ Funcionando
- **Interface**: ✅ Carregando

## Testes da API

### 1. Teste de Health Check

```bash
curl http://localhost:3000/up
# Resposta esperada: <!DOCTYPE html><html><body style="background-color: green"></body></html>
```

### 2. Teste de CORS

```bash
curl -H "Origin: http://localhost:3001" \
     -H "Access-Control-Request-Method: GET" \
     -H "Access-Control-Request-Headers: Content-Type" \
     -X OPTIONS http://localhost:3000/books.json
```

### 3. Teste de Endpoints

#### Autores

```bash
# Listar autores
curl http://localhost:3000/authors.json

# Criar autor
curl -X POST http://localhost:3000/authors.json \
     -H "Content-Type: application/json" \
     -d '{"author": {"name": "J.K. Rowling", "birth": "1965-07-31"}}'
```

#### Estantes

```bash
# Listar estantes
curl http://localhost:3000/bookcases.json

# Criar estante
curl -X POST http://localhost:3000/bookcases.json \
     -H "Content-Type: application/json" \
     -d '{"bookcase": {"name": "Ficção", "limit": 50}}'
```

#### Livros

```bash
# Listar livros
curl http://localhost:3000/books.json

# Criar livro (após criar autor e estante)
curl -X POST http://localhost:3000/books.json \
     -H "Content-Type: application/json" \
     -d '{"book": {"title": "Harry Potter", "author_id": 1, "bookcase_id": 1, "rating": 5}}'
```

## Próximos Passos

1. **Acesse o frontend**: <http://localhost:3001>
2. **Crie algumas estantes** primeiro
3. **Adicione alguns autores**
4. **Adicione livros** à sua biblioteca
5. **Explore o dashboard**

## Solução de Problemas

### Se a API não responder

1. Verifique se o Rails está rodando: `rails server`
2. Verifique os logs: `tail -f log/development.log`
3. Teste o health check: `curl http://localhost:3000/up`

### Se o frontend não carregar

1. Verifique se o Next.js está rodando: `npm run dev`
2. Verifique se não há erros no console
3. Tente acessar: <http://localhost:3001>

### Se houver erro de CORS

1. Verifique se a gem `rack-cors` está instalada
2. Verifique se o arquivo `config/initializers/cors.rb` está configurado
3. Reinicie o servidor Rails
