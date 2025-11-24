# Gestão de Ocorrências do NSP

Dashboard interativo de Business Intelligence para gestão de incidentes e ocorrências do NSP (Núcleo de Segurança do Paciente), com importação de dados e análise via IA.

## 🚀 Funcionalidades

- **Dashboard Interativo**: Visualização de KPIs e métricas em tempo real
- **Gráficos Dinâmicos**: Análise de ocorrências por mês, tipo, severidade, unidade e responsável
- **Filtros Avançados**: Filtragem por unidade, severidade e período
- **Importação de Dados**: Suporte para arquivos CSV e Excel
- **Exportação**: Geração de relatórios em CSV
- **Análise de IA**: Insights inteligentes gerados por IA (Google Gemini)
- **Design Responsivo**: Interface moderna e corporativa que funciona em todos os dispositivos
- **Sidebar Colapsável**: Navegação otimizada com sidebar que pode ser recolhida

## 🛠️ Tecnologias

- **React 19.2** - Framework JavaScript
- **TypeScript 5.8** - Tipagem estática
- **Vite 6.2** - Build tool e dev server
- **Tailwind CSS** - Framework CSS utilitário
- **Shadcn UI** - Componentes UI modernos e acessíveis
- **Recharts 3.5** - Biblioteca de gráficos
- **Lucide React** - Ícones
- **XLSX** - Processamento de planilhas
- **Google Gemini AI** - Análise inteligente de dados

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/seu-usuario/painel-ocorrencias-nsp.git

# Entre no diretório
cd painel-ocorrencias-nsp

# Instale as dependências
npm install
```

## ⚙️ Configuração

1. Crie um arquivo `.env.local` na raiz do projeto:

```env
GEMINI_API_KEY=sua_chave_api_aqui
```

2. Obtenha sua chave API do Google Gemini em: https://makersuite.google.com/app/apikey

## 🚀 Executando o Projeto

### Modo Desenvolvimento

```bash
npm run dev
```

O aplicativo estará disponível em `http://localhost:3000`

### Build para Produção

```bash
npm run build
```

### Preview da Build

```bash
npm run preview
```

## 📊 Estrutura do Projeto

```
├── components/
│   ├── ui/                    # Componentes Shadcn UI
│   ├── layout/                # Componentes de layout (Sidebar, Header, MainLayout)
│   ├── dashboard/             # Componentes do dashboard (KPICard, FilterBar, AIInsightsPanel)
│   ├── DashboardCharts.tsx    # Gráficos principais
│   └── NetworkGraph.tsx       # Gráfico de rede
├── hooks/                     # Custom hooks (use-mobile, use-sidebar, use-toast)
├── services/                  # Serviços (mockData, geminiService)
├── lib/                       # Utilitários
├── types.ts                   # Definições de tipos TypeScript
└── App.tsx                    # Componente principal
```

## 📱 Responsividade

O dashboard é totalmente responsivo e otimizado para:

- **Desktop** (≥1024px): Layout completo com sidebar expandida
- **Tablet** (768px - 1024px): Layout adaptado com sidebar colapsável
- **Mobile** (<768px): Layout mobile com sidebar como overlay

## 🎨 Design System

O projeto utiliza uma paleta de cores corporativa:

- **Primary**: #004080 (Azul Corporativo)
- **Success**: #10b981 (Verde)
- **Warning**: #f59e0b (Laranja)
- **Danger**: #ef4444 (Vermelho)
- **Background**: #f8fafc (Cinza Claro)

## 📈 Dados

O projeto vem com dados mockados de exemplo. Para usar seus próprios dados:

1. Prepare um arquivo CSV/Excel com as seguintes colunas:
   - Código
   - Data (formato DD/MM/YYYY)
   - Tipo de Ocorrência
   - Notificada (Unidade)
   - Severidade/Gravidade
   - Tipo de Incidente - OMS por Mês
   - Status
   - Responsável
   - Fase
   - Processo

2. Use o botão "Importar CSV/Excel" no dashboard

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues e pull requests.

## 📄 Licença

Este projeto está sob a licença MIT.

## 👥 Autores

Desenvolvido para o NSP (Núcleo de Segurança do Paciente) - SESI

## 🔗 Links Úteis

- [Documentação do React](https://react.dev/)
- [Documentação do Tailwind CSS](https://tailwindcss.com/)
- [Documentação do Shadcn UI](https://ui.shadcn.com/)
- [Documentação do Recharts](https://recharts.org/)
