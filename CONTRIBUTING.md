# Contribuindo para o Painel de Ocorrências do NSP

Obrigado por considerar contribuir para este projeto! 🎉

## 📋 Código de Conduta

Este projeto segue um código de conduta. Ao participar, você concorda em manter um ambiente respeitoso e colaborativo.

## 🚀 Como Contribuir

### Reportando Bugs

Se você encontrou um bug, por favor abra uma issue incluindo:

- Descrição clara do problema
- Passos para reproduzir
- Comportamento esperado vs. comportamento atual
- Screenshots (se aplicável)
- Informações do ambiente (navegador, OS, versão do Node.js)

### Sugerindo Melhorias

Para sugerir melhorias:

1. Verifique se já não existe uma issue similar
2. Abra uma nova issue com o label "enhancement"
3. Descreva claramente a melhoria proposta
4. Explique por que seria útil

### Pull Requests

1. **Fork** o repositório
2. **Clone** seu fork localmente
3. **Crie uma branch** para sua feature/fix:
   ```bash
   git checkout -b feature/minha-feature
   ```
4. **Faça suas alterações** seguindo os padrões do projeto
5. **Teste** suas alterações
6. **Commit** suas mudanças:
   ```bash
   git commit -m "feat: adiciona nova funcionalidade"
   ```
7. **Push** para sua branch:
   ```bash
   git push origin feature/minha-feature
   ```
8. Abra um **Pull Request**

## 📝 Padrões de Código

### TypeScript

- Use TypeScript para todo código novo
- Defina tipos explícitos sempre que possível
- Evite usar `any`

### React

- Use componentes funcionais com hooks
- Mantenha componentes pequenos e focados
- Use `useMemo` e `useCallback` para otimização quando necessário

### Estilo de Código

- Use 2 espaços para indentação
- Use aspas simples para strings
- Adicione ponto e vírgula no final das linhas
- Use trailing commas em objetos e arrays

### Commits

Siga o padrão [Conventional Commits](https://www.conventionalcommits.org/):

- `feat:` - Nova funcionalidade
- `fix:` - Correção de bug
- `docs:` - Mudanças na documentação
- `style:` - Formatação, ponto e vírgula, etc
- `refactor:` - Refatoração de código
- `test:` - Adição ou correção de testes
- `chore:` - Tarefas de manutenção

Exemplos:
```
feat: adiciona filtro por responsável
fix: corrige bug no gráfico de agosto
docs: atualiza README com instruções de deploy
```

## 🧪 Testes

Antes de submeter um PR:

1. Execute o build: `npm run build`
2. Teste localmente: `npm run dev`
3. Verifique se não há erros no console
4. Teste em diferentes navegadores (Chrome, Firefox, Safari)
5. Teste em diferentes tamanhos de tela (mobile, tablet, desktop)

## 📁 Estrutura do Projeto

```
├── components/
│   ├── ui/              # Componentes Shadcn UI
│   ├── layout/          # Layout components
│   ├── dashboard/       # Dashboard components
│   └── ...
├── hooks/               # Custom React hooks
├── services/            # Services (API, data)
├── lib/                 # Utilities
└── types.ts             # TypeScript types
```

## 🎨 Design System

- Use componentes do Shadcn UI quando possível
- Siga a paleta de cores corporativa definida
- Mantenha consistência visual
- Garanta acessibilidade (ARIA labels, contraste, etc)

## ✅ Checklist do PR

Antes de submeter, verifique:

- [ ] O código segue os padrões do projeto
- [ ] Não há erros de TypeScript
- [ ] O build passa sem erros
- [ ] Testei em diferentes navegadores
- [ ] Testei em diferentes tamanhos de tela
- [ ] Adicionei comentários onde necessário
- [ ] Atualizei a documentação se necessário
- [ ] Meu commit segue o padrão Conventional Commits

## 🤝 Revisão de Código

Todos os PRs passarão por revisão. Esteja aberto a feedback e sugestões!

## 📞 Dúvidas?

Se tiver dúvidas, sinta-se à vontade para:

- Abrir uma issue
- Comentar em um PR existente
- Entrar em contato com os mantenedores

Obrigado por contribuir! 🙏
