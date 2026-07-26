# 🧪 Projeto de Automação Híbrida (UI & API) com Cypress + Cucumber

Este projeto reúne testes automatizados para a interface e para a API da plataforma ServeRest, com abordagem BDD em Gherkin e uma estrutura pensada para manutenção, clareza e apresentação profissional.

## � Visão geral

A solução foi organizada para demonstrar boas práticas de automação, incluindo:
- cobertura de cenários positivos e de exceção
- separação por camadas de UI, API e suporte
- geração de evidências visuais e relatórios executáveis

## ✅ Resultado alcançado

A suíte foi validada com sucesso na execução completa, com:
- 6 specs executados
- 12 testes passando
- 0 falhas

## �🏗️ Estrutura do projeto

```text
cypress/
├── e2e/                # Features e step definitions
├── fixtures/           # Dados base para os cenários
├── page_objects/       # Camada de interação com a UI
├── services/           # Camada de requisições de API
├── support/            # Comandos, hooks e utilidades
└── reports/            # Relatórios HTML gerados após execução
```

## ✅ O que foi aplicado

- Page Objects para interface
- Service Objects para API
- Helpers para criar dados únicos
- Comandos reutilizáveis para ações comuns
- Hooks para limpar sessão entre cenários
- Fixtures para centralizar dados de teste
- Relatório HTML com screenshots automáticos

## ▶️ Como executar

1. Instale as dependências:

```bash
npm install
```

2. Execute a suíte completa:

```bash
npm run cy:run:all
```

3. Execute apenas UI:

```bash
npm run cy:run:ui
```

4. Execute apenas API:

```bash
npm run cy:run:api
```

5. Execute com relatório HTML e screenshots:

```bash
npm run cy:run:all:report
```

6. Abra o runner visual:

```bash
npx cypress open
```

## 📊 Relatórios e evidências

- O relatório HTML é gerado em [cypress/reports](cypress/reports)
- Screenshots são salvos em [cypress/screenshots](cypress/screenshots)
- Em caso de falha, o Cypress registra automaticamente a evidência visual

## 🔧 Observações técnicas

- Os dados dinâmicos são gerados automaticamente para evitar conflitos.
- Os cenários usam fixtures para centralizar valores base.
- O estado de sessão é resetado antes e depois dos cenários.

## 🧠 Por que este projeto é interessante para avaliação

- mostra capacidade de estruturar automação de forma organizada
- evidencia entendimento de cenários de sucesso e falha
- demonstra preocupação com evidências e rastreabilidade
- apresenta uma base pronta para evolução em um ambiente real

- Os dados dinâmicos são gerados automaticamente para evitar conflitos.
- Os cenários usam fixtures para centralizar valores base.
- O estado de sessão é resetado antes e depois dos cenários.
