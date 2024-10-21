## Docs - fluxo

## Infra

### Actions

- Server actions
- Use-cases/Serviços
- Usados nos **controllers**
  - Além de executar as requests HTTP, gerenciam o cache e lógica relacionada á um serviço

### Cache

- Gerenciado pelas **actions**
  - Local Storage
  - Cookies
    - Client
    - Server

### HTTP

- Usados nas **actions**
  - Requests

### Controllers

- Usado na **view**
  - 1 controller por view (ou por conjunto de componentes onde faça sentido)
  - Gerencia toda a lógica e estado da view

### View

- Apresentação do(s) componente(s) em tela

### TO-DO:

- Criar cliente HTTP com ky ou axios.
- Implementar tanstack (talvez ssr/csr).
