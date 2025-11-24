# 🚀 Quick Start

Guia rápido para começar a usar o Painel de Ocorrências do NSP.

## ⚡ Início Rápido (5 minutos)

### 1. Clone o repositório

```bash
git clone https://github.com/seu-usuario/painel-ocorrencias-nsp.git
cd painel-ocorrencias-nsp
```

### 2. Instale as dependências

```bash
npm install
```

### 3. Configure a API Key (Opcional)

```bash
# Copie o arquivo de exemplo
cp .env.example .env.local

# Edite .env.local e adicione sua chave do Google Gemini
# GEMINI_API_KEY=sua_chave_aqui
```

> **Nota**: A chave API é opcional. O dashboard funciona sem ela, mas a análise de IA não estará disponível.

### 4. Inicie o servidor

```bash
npm run dev
```

### 5. Abra no navegador

Acesse: `http://localhost:3000`

## 🎯 Primeiros Passos

### Visualizar Dados

O dashboard já vem com dados de exemplo carregados. Você verá:

- **KPIs**: Total de ocorrências, concluídas, em andamento e % de conclusão
- **Gráficos**: Análise por mês, tipo, severidade, unidade, etc.
- **Filtros**: Use os filtros no topo para refinar os dados

### Importar Seus Dados

1. Clique em **"Importar CSV/Excel"**
2. Selecione seu arquivo (formato esperado abaixo)
3. Os dados serão carregados automaticamente

#### Formato do Arquivo

Seu arquivo deve ter estas colunas:

| Coluna | Exemplo |
|--------|---------|
| Código | 233 |
| Data | 13/06/2024 |
| Tipo de Ocorrência | Identificação Errada do Paciente |
| Notificada | Unidade Sesi Cambona |
| Severidade/Gravidade | Evento com Nenhum Dano (Saúde) |
| Tipo de Incidente - OMS por Mês | Não Classificado |
| Status | Concluído |
| Responsável | carolina.albuquerque |
| Fase | Concluída |
| Processo | Administrar Consultas/ Exames de Saúde |

### Exportar Relatório

1. Aplique os filtros desejados
2. Clique em **"Exportar"**
3. Um arquivo CSV será baixado

### Análise de IA (Requer API Key)

1. Configure a `GEMINI_API_KEY` no `.env.local`
2. Clique no botão **"Gerar Insights"** na sidebar
3. Aguarde a análise ser gerada
4. Leia os insights na área destacada

## 📱 Testando Responsividade

### Desktop
- Abra normalmente no navegador
- Teste a sidebar colapsável

### Tablet
- Pressione `F12` para abrir DevTools
- Clique no ícone de dispositivo móvel
- Selecione "iPad" ou similar

### Mobile
- Pressione `F12` para abrir DevTools
- Clique no ícone de dispositivo móvel
- Selecione "iPhone" ou similar
- Teste o menu hambúrguer

## 🎨 Personalizando

### Cores

Edite `tailwind.config.js` para mudar as cores:

```javascript
colors: {
  primary: '#004080',  // Sua cor primária
  success: '#10b981',  // Cor de sucesso
  // ...
}
```

### Logo

Substitua o ícone na sidebar em `components/layout/Sidebar.tsx`:

```tsx
<LayoutDashboard className="text-blue-500" />
// Por:
<img src="/seu-logo.png" alt="Logo" />
```

### Dados Mockados

Edite `services/mockData.ts` para mudar os dados de exemplo.

## 🐛 Problemas Comuns

### Porta 3000 em uso

```bash
# Use outra porta
npm run dev -- --port 3001
```

### Erro ao importar arquivo

- Verifique se o arquivo tem as colunas corretas
- Certifique-se que as datas estão no formato DD/MM/YYYY
- Tente com um arquivo menor primeiro

### Análise de IA não funciona

- Verifique se a `GEMINI_API_KEY` está configurada
- Teste a chave em: https://makersuite.google.com/
- Verifique o console do navegador para erros

## 📚 Próximos Passos

- Leia o [README.md](README.md) completo
- Veja o [DEPLOY.md](DEPLOY.md) para fazer deploy
- Contribua! Veja [CONTRIBUTING.md](CONTRIBUTING.md)

## 🆘 Precisa de Ajuda?

- Abra uma issue no GitHub
- Consulte a documentação completa
- Entre em contato com a equipe

---

**Pronto!** Você está pronto para usar o Painel de Ocorrências do NSP! 🎉
