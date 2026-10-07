# BLUSH — E-commerce de Maquiagem

Projeto full-stack de uma loja virtual de maquiagem. O repositório reúne uma **API REST** (Node.js + Express + Prisma + PostgreSQL) e um **frontend** em React com Tailwind CSS.

> **Status:** em desenvolvimento. O backend já cobre autenticação, produtos, carrinho, pedidos e favoritos. O frontend ainda é um protótipo visual com dados mockados e **não está integrado à API** (veja [Estado atual](#estado-atual-do-projeto)).

## Sumário

- [Tecnologias](#tecnologias)
- [Estrutura do projeto](#estrutura-do-projeto)
- [Como rodar localmente](#como-rodar-localmente)
- [API](#api)
- [Modelo de dados](#modelo-de-dados)
- [Estado atual do projeto](#estado-atual-do-projeto)
- [Próximos passos](#próximos-passos)

## Tecnologias

**Backend**
- Node.js (ES Modules) e Express 5
- Prisma ORM 7 com adapter `pg` e PostgreSQL
- Autenticação com JWT (`jsonwebtoken`) e hash de senha com `bcryptjs`
- `dotenv` para variáveis de ambiente

**Frontend**
- React 19 e Vite
- React Router DOM 7
- Tailwind CSS 4
- Lucide React (ícones)
- ESLint

## Estrutura do projeto

```
makeup-store-ecommerce/
├── backend/
│   ├── prisma/
│   │   ├── schema.prisma      # modelos do banco
│   │   ├── seed.js            # produtos, usuários, endereços e cupons de exemplo
│   │   └── create-user.js     # script avulso para criar um usuário de teste
│   └── src/
│       ├── server.js          # entrada da API
│       ├── routes/            # definição das rotas
│       ├── controllers/       # camada HTTP (req/res)
│       ├── services/          # regras de negócio e acesso ao banco
│       ├── middlewares/       # autenticação JWT
│       └── utils/             # validação, formatação e padrão de resposta
└── frontend/
    └── src/
        ├── pages/             # Hero, CategoryPage, ProductPage, FavoriteProductPage, Manifest, Footer
        ├── components/        # Header, SearchBar, Cart, CategoryCard, FavoriteProducts, ui/
        ├── context/           # CartContext (abrir/fechar a sacola)
        ├── data/              # produtos e categorias mockados
        └── assets/            # imagens
```

## Como rodar localmente

### Pré-requisitos

- Node.js 20.19 ou superior
- PostgreSQL em execução

### 1. Backend

```bash
cd backend
npm install
```

Crie o arquivo `backend/.env`:

```env
DATABASE_URL="postgresql://USUARIO:SENHA@localhost:5432/blush"
JWT_SECRET="troque-por-um-segredo-forte"
PORT=3000
```

Prepare o banco e popule com dados de exemplo:

```bash
npm run db:generate
npm run db:push
npm run db:seed
```

> **Prisma 7:** o `schema.prisma` não declara a URL do banco no `datasource`. Se os comandos `db:*` reclamarem disso, crie um `backend/prisma.config.ts` apontando para `DATABASE_URL`, conforme a [documentação do Prisma](https://www.prisma.io/docs).

Inicie a API em modo de desenvolvimento:

```bash
npm run dev
```

A API sobe em `http://localhost:3000` e a rota `/` lista os endpoints disponíveis.

### 2. Frontend

```bash
cd frontend
npm install
npm run dev
```

O Vite sobe em `http://localhost:5173`.

### Scripts úteis

| Local | Comando | O que faz |
| --- | --- | --- |
| backend | `npm run dev` | API com reload automático (`node --watch`) |
| backend | `npm run db:studio` | Prisma Studio para inspecionar o banco |
| backend | `npm run db:reset` | Recria o banco e roda o seed novamente |
| backend | `npm run db:migrate` | Cria e aplica uma migration |
| frontend | `npm run build` | Build de produção |
| frontend | `npm run lint` | Verifica o código com ESLint |

### Dados de exemplo (seed)

O seed cria 12 produtos (com variantes de tonalidade), 4 usuários, endereços e 3 cupons (`BLUSH10`, `PRIMEIRACOMPRA`, `FRETEGRATIS`). Os usuários são apenas para desenvolvimento — por exemplo, `cliente@blush.com.br` / `cliente123`.

## API

Prefixo: `/api`. Rotas marcadas com 🔒 exigem o header `Authorization: Bearer <token>`.

**Autenticação**

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/auth/register` | Cadastro de usuário |
| POST | `/auth/login` | Login (retorna o token JWT) |
| GET | `/auth/me` 🔒 | Dados do usuário logado |
| PATCH | `/auth/change-password` 🔒 | Altera a senha |
| POST | `/auth/recover-password` | Solicita recuperação de senha |
| POST | `/auth/reset-password` | Redefine a senha |

**Produtos**

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/products` | Lista produtos |
| GET | `/products/:slug` | Detalhe de um produto |
| GET | `/categories` | Lista categorias |

**Carrinho**

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/cart/:userId` | Carrinho do usuário |
| POST | `/cart/:userId/items` | Adiciona item |
| PATCH | `/cart/items/:itemId` | Atualiza a quantidade |
| DELETE | `/cart/items/:itemId` | Remove item |
| DELETE | `/cart/:userId` | Esvazia o carrinho |

**Pedidos**

| Método | Rota | Descrição |
| --- | --- | --- |
| GET | `/orders` | Lista todos os pedidos |
| GET | `/orders/:userId` | Pedidos de um usuário |
| GET | `/orders/detail/:id` | Detalhe de um pedido |
| POST | `/orders` | Cria pedido |
| PATCH | `/orders/:id/status` | Atualiza o status |
| DELETE | `/orders/:id` | Cancela pedido |

**Usuários e favoritos**

| Método | Rota | Descrição |
| --- | --- | --- |
| POST | `/users` | Cria usuário |
| GET | `/users/:id` | Busca por id |
| GET | `/users/email/:email` | Busca por e-mail |
| PATCH | `/users/:id` | Atualiza usuário |
| DELETE | `/users/:id` | Remove usuário |
| GET | `/users/:id/orders` | Pedidos do usuário |
| GET | `/users/:id/favorites` | Favoritos do usuário |
| POST | `/users/:id/favorites/:productId` | Adiciona favorito |
| DELETE | `/users/:id/favorites/:productId` | Remove favorito |

## Modelo de dados

O schema (PostgreSQL) está em `backend/prisma/schema.prisma` e inclui:

- **User** e **Address**: usuários com CPF e e-mail únicos e múltiplos endereços
- **Product** e **ProductVariant**: produtos com preço, preço promocional, estoque, acabamento e tonalidades (nome, código e cor em hex)
- **Cart** e **CartItem**: um carrinho por usuário
- **Order** e **OrderItem**: pedidos com número, endereço de entrega, subtotal, frete, desconto, cupom, status e pagamento (cartão, Pix ou boleto), guardando o preço unitário do momento da compra
- **Favorite**, **Review** (com moderação) e **Coupon** (porcentagem ou valor fixo, com validade e limite de uso)

## Estado atual do projeto

**Backend**
- Estrutura em camadas (rotas → controllers → services) e padronização de respostas e validações.
- Cadastro e login com JWT, e CRUDs de produtos, carrinho, pedidos, usuários e favoritos.

**Frontend**
- Home com hero, categorias, produtos favoritos e manifesto, além de header, footer e busca.
- Página de busca/listagem (`/busca`) com filtros por categoria, tonalidade e avaliação, usando dados locais de `src/data`.
- Sacola lateral com abertura e fechamento controlados por contexto, ainda com itens e valores estáticos.

## Próximos passos

Pontos identificados na análise do código:

- [ ] Integrar o frontend à API (hoje os produtos vêm de `src/data/products.js`).
- [ ] Implementar login, cadastro e área de conta no frontend e criar as rotas `/favoritos` e `/conta`, já linkadas no header mas ainda sem página.
- [ ] Ligar a sacola ao carrinho real: adicionar, remover e atualizar itens, calcular subtotal e fazer o checkout (botão de fechar e botões de finalizar ainda sem ação).
- [ ] Proteger com o middleware de autenticação as rotas de carrinho, pedidos e usuários e validar que cada usuário só acessa os próprios dados.
- [ ] Declarar a URL do banco no Prisma 7 (`prisma.config.ts`) e remover `prisma/create-user.js`, que grava senha sem hash.
- [ ] Ajustar os scripts do backend: `build` e `start` apontam para `tsc` e `dist/`, mas o projeto está em JavaScript puro.
- [ ] Adicionar CORS, `.env.example` e testes automatizados.
- [ ] Substituir o README padrão do Vite em `frontend/README.md` por documentação do projeto.

## Autor

Feito por [@gabrieelsza](https://github.com/gabrieelsza).