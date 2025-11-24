# Guia de Deploy

Este documento descreve como fazer o deploy do Painel de Ocorrências do NSP em diferentes plataformas.

## 📋 Pré-requisitos

- Node.js 18+ instalado
- Conta no serviço de hospedagem escolhido
- Chave API do Google Gemini

## 🚀 Deploy no Vercel

### Via CLI

```bash
# Instale a CLI do Vercel
npm i -g vercel

# Faça login
vercel login

# Deploy
vercel

# Deploy para produção
vercel --prod
```

### Via GitHub

1. Faça push do código para o GitHub
2. Acesse [vercel.com](https://vercel.com)
3. Clique em "Import Project"
4. Selecione seu repositório
5. Configure as variáveis de ambiente:
   - `GEMINI_API_KEY`: Sua chave API do Google Gemini
6. Clique em "Deploy"

## 🚀 Deploy no Netlify

### Via CLI

```bash
# Instale a CLI do Netlify
npm i -g netlify-cli

# Faça login
netlify login

# Build
npm run build

# Deploy
netlify deploy

# Deploy para produção
netlify deploy --prod
```

### Via GitHub

1. Faça push do código para o GitHub
2. Acesse [netlify.com](https://netlify.com)
3. Clique em "Add new site" > "Import an existing project"
4. Selecione seu repositório
5. Configure:
   - Build command: `npm run build`
   - Publish directory: `dist`
6. Adicione variáveis de ambiente:
   - `GEMINI_API_KEY`: Sua chave API do Google Gemini
7. Clique em "Deploy site"

## 🚀 Deploy no GitHub Pages

```bash
# Instale gh-pages
npm install -D gh-pages

# Adicione ao package.json:
# "homepage": "https://seu-usuario.github.io/painel-ocorrencias-nsp",
# "scripts": {
#   "predeploy": "npm run build",
#   "deploy": "gh-pages -d dist"
# }

# Deploy
npm run deploy
```

**Nota**: GitHub Pages não suporta variáveis de ambiente server-side. Você precisará configurar a API key de outra forma.

## 🐳 Deploy com Docker

### Criar Dockerfile

```dockerfile
FROM node:18-alpine as build

WORKDIR /app

COPY package*.json ./
RUN npm ci

COPY . .
RUN npm run build

FROM nginx:alpine
COPY --from=build /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
```

### Criar nginx.conf

```nginx
server {
    listen 80;
    server_name localhost;
    root /usr/share/nginx/html;
    index index.html;

    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### Build e Run

```bash
# Build da imagem
docker build -t painel-nsp .

# Run
docker run -p 8080:80 painel-nsp
```

## ⚙️ Variáveis de Ambiente

Certifique-se de configurar as seguintes variáveis de ambiente em produção:

- `GEMINI_API_KEY`: Chave API do Google Gemini (obrigatória para análise de IA)

## 🔒 Segurança

- **Nunca** commite o arquivo `.env.local` com suas chaves API
- Use variáveis de ambiente da plataforma de hospedagem
- Considere usar um backend proxy para proteger suas chaves API
- Habilite HTTPS em produção

## 📊 Monitoramento

Após o deploy, monitore:

- Tempo de carregamento da página
- Erros no console do navegador
- Taxa de sucesso das chamadas à API
- Uso de recursos (CPU, memória)

## 🔄 Atualizações

Para atualizar o projeto em produção:

```bash
# Pull das últimas mudanças
git pull origin main

# Instale dependências (se houver novas)
npm install

# Build
npm run build

# Deploy (comando varia por plataforma)
```

## 🆘 Troubleshooting

### Build falha

- Verifique se todas as dependências estão instaladas
- Limpe o cache: `rm -rf node_modules package-lock.json && npm install`
- Verifique a versão do Node.js: `node --version` (deve ser 18+)

### API não funciona

- Verifique se a variável `GEMINI_API_KEY` está configurada
- Teste a chave API diretamente na API do Google
- Verifique os logs de erro no console

### Página em branco

- Verifique o console do navegador para erros
- Verifique se o build foi concluído com sucesso
- Verifique se os arquivos estão sendo servidos corretamente

## 📞 Suporte

Para problemas ou dúvidas, abra uma issue no GitHub.
