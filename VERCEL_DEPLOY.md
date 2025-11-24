# 🚀 Deploy no Vercel - Guia Completo

Este guia mostra como fazer o deploy do Painel de Ocorrências do NSP no Vercel.

## 📋 Pré-requisitos

- Conta no GitHub (já configurada ✅)
- Conta no Vercel (gratuita)
- Chave API do Google Gemini (opcional, mas recomendada)

## 🎯 Método 1: Deploy via Interface Web (Recomendado)

### Passo 1: Acesse o Vercel

1. Acesse: https://vercel.com
2. Clique em **"Sign Up"** ou **"Login"**
3. Escolha **"Continue with GitHub"**
4. Autorize o Vercel a acessar sua conta GitHub

### Passo 2: Importe o Projeto

1. No dashboard do Vercel, clique em **"Add New..."**
2. Selecione **"Project"**
3. Encontre o repositório: **`OCORRENCIA-2025-SESI`**
4. Clique em **"Import"**

### Passo 3: Configure o Projeto

Na tela de configuração:

#### Framework Preset
- Selecione: **Vite**
- (Já detectado automaticamente)

#### Build and Output Settings
- Build Command: `npm run build` ✅ (já configurado)
- Output Directory: `dist` ✅ (já configurado)
- Install Command: `npm install` ✅ (já configurado)

#### Environment Variables (Opcional)

Clique em **"Environment Variables"** e adicione:

| Name | Value |
|------|-------|
| `GEMINI_API_KEY` | sua_chave_api_aqui |

> **Nota**: A chave API é opcional. O dashboard funciona sem ela, mas a análise de IA não estará disponível.

### Passo 4: Deploy

1. Clique em **"Deploy"**
2. Aguarde o build (leva ~2-3 minutos)
3. ✅ Pronto! Seu site está no ar!

### Passo 5: Acesse seu Site

Após o deploy, você receberá uma URL como:
```
https://ocorrencia-2025-sesi.vercel.app
```

## 🎯 Método 2: Deploy via CLI

### Instalar Vercel CLI

```bash
npm i -g vercel
```

### Login

```bash
vercel login
```

### Deploy

```bash
# Deploy de preview
vercel

# Deploy para produção
vercel --prod
```

### Configurar Variáveis de Ambiente

```bash
vercel env add GEMINI_API_KEY
```

## ⚙️ Configurações Adicionais

### Domínio Personalizado

1. No dashboard do Vercel, vá em **"Settings"** > **"Domains"**
2. Clique em **"Add"**
3. Digite seu domínio personalizado
4. Siga as instruções para configurar o DNS

### Variáveis de Ambiente

Para adicionar/editar variáveis:

1. Vá em **"Settings"** > **"Environment Variables"**
2. Adicione ou edite as variáveis
3. Clique em **"Save"**
4. Faça um novo deploy para aplicar as mudanças

### Proteção de Branch

Para proteger a branch main:

1. Vá em **"Settings"** > **"Git"**
2. Configure **"Production Branch"** como `main`
3. Habilite **"Automatic Deployments"**

## 🔄 Atualizações Automáticas

O Vercel está configurado para fazer deploy automático quando você:

1. Faz push para a branch `main` → Deploy em produção
2. Abre um Pull Request → Deploy de preview

### Como Atualizar o Site

```bash
# 1. Faça suas alterações no código
# 2. Commit
git add .
git commit -m "feat: sua alteração"

# 3. Push para o GitHub
git push origin main

# 4. O Vercel fará o deploy automaticamente! 🚀
```

## 📊 Monitoramento

### Analytics

1. No dashboard do Vercel, vá em **"Analytics"**
2. Veja métricas de:
   - Visitantes
   - Pageviews
   - Performance
   - Erros

### Logs

1. Vá em **"Deployments"**
2. Clique em um deployment
3. Veja os logs de build e runtime

## 🐛 Troubleshooting

### Build Falha

**Erro**: `npm install` falha

**Solução**:
```bash
# Localmente, delete e reinstale
rm -rf node_modules package-lock.json
npm install
git add package-lock.json
git commit -m "fix: update package-lock"
git push
```

### Variável de Ambiente Não Funciona

**Solução**:
1. Verifique se a variável está configurada corretamente
2. Faça um novo deploy (Deployments > ... > Redeploy)
3. Limpe o cache: Settings > General > Clear Cache

### Página em Branco

**Solução**:
1. Verifique os logs do deployment
2. Abra o console do navegador (F12)
3. Verifique se há erros JavaScript

### 404 em Rotas

**Solução**: O arquivo `vercel.json` já está configurado para redirecionar todas as rotas para `index.html`. Se ainda tiver problemas:

1. Verifique se o `vercel.json` está no repositório
2. Faça um novo deploy

## 🎉 Pronto!

Seu Painel de Ocorrências do NSP está no ar! 

### URLs Importantes

- **Produção**: https://ocorrencia-2025-sesi.vercel.app
- **Dashboard Vercel**: https://vercel.com/dashboard
- **Repositório GitHub**: https://github.com/pitterpaulinosilva-ops/OCORRENCIA-2025-SESI

### Próximos Passos

- [ ] Configure um domínio personalizado
- [ ] Adicione a chave API do Gemini
- [ ] Configure analytics
- [ ] Compartilhe com sua equipe!

## 📞 Suporte

- Documentação Vercel: https://vercel.com/docs
- Suporte Vercel: https://vercel.com/support
- Issues do Projeto: https://github.com/pitterpaulinosilva-ops/OCORRENCIA-2025-SESI/issues

---

**Desenvolvido com ❤️ para o NSP - Núcleo de Segurança do Paciente**
