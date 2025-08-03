#!/bin/bash

echo "🚀 Iniciando Bukis - Sistema de Biblioteca"
echo "=========================================="

# Verificar se o Rails está rodando
echo "📋 Verificando servidor Rails..."
if curl -s http://localhost:3000/up > /dev/null; then
    echo "✅ Rails está rodando em http://localhost:3000"
else
    echo "❌ Rails não está rodando"
    echo "🔄 Iniciando servidor Rails..."
    cd /Users/junior/Documents/www/Ruby/rails/bukis
    rails server &
    sleep 5
fi

# Verificar se o Next.js está rodando
echo "📋 Verificando servidor Next.js..."
if curl -s http://localhost:3001 > /dev/null; then
    echo "✅ Next.js está rodando em http://localhost:3001"
else
    echo "❌ Next.js não está rodando"
    echo "🔄 Iniciando servidor Next.js..."
    cd frontend
    npm run dev &
    sleep 5
fi

echo ""
echo "🎉 Ambos os servidores estão rodando!"
echo "📱 Frontend: http://localhost:3001"
echo "🔧 Backend: http://localhost:3000"
echo ""
echo "💡 Para parar os servidores, pressione Ctrl+C"
echo "💡 Para reiniciar, execute: ./dev.sh"

# Manter o script rodando
wait 