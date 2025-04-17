# 🛒 Sistemas de Produtos

Sistema web para gerenciamento de produtos com funcionalidades de registro, login, criação, edição e listagem de produtos.

---

## 🚀 Tecnologias Utilizadas

- **React** – Biblioteca JavaScript para construção de interfaces
- **TypeScript** – Superset de JavaScript com tipagem estática
- **Material UI** – Biblioteca de componentes visuais modernos
- **React Hook Form** – Manipulação de formulários com alta performance
- **Yup** – Validação de dados baseada em esquemas
- **Axios** – Cliente HTTP para requisições assíncronas
- **React Router DOM** – Gerenciamento de rotas
- **Day.js** – Manipulação de datas
- **Vitest** – Testes unitários (se utilizados)

---

## 📦 Instalação

```bash
# Clone o repositório
git clone https://github.com/luizcdribeiro/sistema-produtos

# Acesse o diretório do projeto
cd sistemas-de-produtos

# Instale as dependências
npm install

# Inicie o projeto em ambiente de desenvolvimento
npm run dev
```

---

## 🧭 Páginas

### 🔐 Login (`/login`)

- Autenticação de usuários com email e senha
- Validação de campos obrigatórios
- Exibe erros em caso de falha na autenticação
- Redireciona para a listagem de produtos ao logar com sucesso

### 📝 Registro (`/register`)

- Cadastro de novos usuários com campos como nome, CPF, CEP, email e senha
- Máscaras aplicadas em campos de CPF e CEP
- Busca automática de endereço com base no CEP via API do ViaCEP
- Validações com Yup e feedbacks de erro

### 📦 Listagem de Produtos (`/produtos`)

- Exibe a lista de produtos cadastrados
- Cada produto possui ações de editar e excluir
- Integração com a API para buscar os dados

### ➕ Criar Produto (`/produtos/novo`)

- Formulário para cadastro de novos produtos
- Campos obrigatórios: nome, descrição, preço, categoria, entre outros
- Envio dos dados para a API ao salvar

### ✏️ Editar Produto (`/produtos/:id/editar`)

- Formulário preenchido automaticamente com os dados do produto selecionado
- Permite editar os dados e atualizar via API
- Validações e feedbacks visuais de sucesso/erro

---

## 🔌 Integrações

- **ViaCEP API** – Utilizada para buscar endereço automaticamente a partir do CEP informado durante o cadastro de usuário
- **API REST de Produtos** – Realiza operações de CRUD (Create, Read, Update, Delete) de produtos
- **Autenticação com JWT** – Protege rotas e mantém sessão do usuário

---

## ✅ Funcionalidades

- [x] Cadastro de usuários com validação
- [x] Login com autenticação e proteção de rotas
- [x] Máscaras de CPF e CEP
- [x] Busca automática de endereço com ViaCEP
- [x] CRUD de produtos com integração a API
- [x] Feedback visual com Snackbar e validações
- [x] Redirecionamentos automáticos e seguros

---

## 📁 Estrutura de Pastas (resumida)

```bash
src/
├── components/        # Componentes reutilizáveis
├── hooks/             # Hooks customizados
├── pages/             # Páginas da aplicação (Login, Registro, Produtos, etc)
├── routes/            # Configuração das rotas
├── services/          # Serviços de API (axios)
├── context/           # Contextos da aplicação
├── utils/             # Funções utilitárias
└── App.tsx            # Componente raiz

```
