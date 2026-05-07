# Backend E-commerce API

API REST desenvolvida em Node.js para gerenciar um sistema de e-commerce, incluindo produtos, categorias, clientes, pedidos e telefones.

## Funcionalidades 

- **Gerenciamento de Produtos**: CRUD completo de produtos com upload de imagens
- **Gerenciamento de Categorias**: CRUD de categorias de produtos
- **Gerenciamento de Clientes**: CRUD de clientes com validação de CPF
- **Gerenciamento de Pedidos**: Criação e consulta de pedidos
- **Gerenciamento de Telefones**: CRUD de telefones dos clientes
- **Upload de Imagens**: Suporte a upload de imagens para produtos
- **Validações**: Validação de CPF e limpeza de números de telefone

## Tecnologias Utilizadas

- **Node.js**: Runtime JavaScript
- **Express.js**: Framework web para Node.js
- **MySQL2**: Driver MySQL para Node.js
- **Multer**: Middleware para upload de arquivos
- **CORS**: Suporte a Cross-Origin Resource Sharing
- **Dotenv**: Gerenciamento de variáveis de ambiente

## Arquitetura

O projeto segue o padrão **MVC (Model-View-Controller)** com camadas adicionais:

- **Routes**: Definem os endpoints da API
- **Controllers**: Contêm a lógica de negócio
- **Models**: Representam as entidades do banco de dados
- **Repositories**: Encapsulam o acesso aos dados
- **Utils**: Funções utilitárias (validação CPF, limpeza de números)

## Estrutura do Projeto

```
dev/
├── package.json           # Dependências e scripts
├── DOCS/
│   └── arquivo_bd.sql     # Script SQL do banco de dados
├── src/
│   ├── server.js          # Ponto de entrada da aplicação
│   ├── configs/
│   │   ├── Database.js    # Configuração da conexão MySQL
│   │   └── produto.multer.js # Configuração do Multer
│   ├── controllers/       # Lógica de negócio
│   │   ├── categoriaController.js
│   │   ├── clienteController.js
│   │   ├── pedidoController.js
│   │   ├── produtoController.js
│   │   └── telefoneController.js
│   ├── models/           # Modelos de dados
│   │   ├── Categoria.js
│   │   ├── Clientes.js
│   │   ├── Enderecos.js
│   │   ├── itensPedidos.js
│   │   ├── Pedidos.js
│   │   ├── Produtos.js
│   │   └── Telefones.js
│   ├── repositories/     # Camada de acesso a dados
│   │   ├── categoriaRepository.js
│   │   ├── clienteRepository.js
│   │   ├── pedidoRepository.js
│   │   ├── produtoRepository.js
│   │   └── telefoneRepository.js
│   ├── routes/           # Definição das rotas
│   │   ├── categoriaRoutes.js
│   │   ├── clienteRoutes.js
│   │   ├── pedidoRoutes.js
│   │   ├── produtoRoutes.js
│   │   ├── routes.js     # Rota principal
│   │   └── telefoneRoutes.js
│   ├── utils/            # Utilitários
│   │   ├── limparNumero.js
│   │   └── validarCpf.js
│   └── middlewares/      # Middlewares
│       └── uploadImage.middleware.js
├── uploads/              # Arquivos enviados
│   └── images/           # Imagens dos produtos
└── frontend/             # Frontend da aplicação
```

## Pré-requisitos

- Node.js (versão 14 ou superior)
- MySQL Server
- npm ou yarn

## Instalação e Configuração

### 1. Clonagem e Instalação

```bash
# Navegue até a pasta do backend
cd dev

# Instale as dependências
npm install
```

### 2. Configuração do Banco de Dados

1. Crie um banco de dados MySQL
2. Execute o script SQL localizado em `DOCS/arquivo_bd.sql`
3. Configure as variáveis de ambiente (veja seção abaixo)

### 3. Variáveis de Ambiente

Crie um arquivo `.env` na raiz do projeto com as seguintes variáveis:

```env
DB_HOST=localhost
DB_USER=seu_usuario
DB_PASSWORD=sua_senha
DB_DATABASE=loja_ihs
DB_PORT=3306
SERVER_PORT=8081
```

### 4. Executar a Aplicação

```bash
# Modo desenvolvimento (com nodemon se instalado)
npm start

# Ou diretamente com node
node src/server.js
```

O servidor estará rodando em `http://localhost:8081`

## API Endpoints

### Categorias
- `GET /categorias` - Lista todas as categorias
- `GET /categorias/:id` - Busca categoria por ID
- `POST /categorias` - Cria nova categoria
- `PUT /categorias/:id` - Atualiza categoria
- `DELETE /categorias/:id` - Remove categoria

### Produtos
- `GET /produtos` - Lista todos os produtos
- `GET /produtos/:id` - Busca produto por ID
- `POST /produtos` - Cria novo produto (com upload de imagem)
- `PUT /produtos/:id` - Atualiza produto
- `DELETE /produtos/:id` - Remove produto
- `POST /produtos/upload` - Upload de imagem

### Clientes
- `GET /clientes` - Lista todos os clientes
- `GET /clientes/:id` - Busca cliente por ID
- `POST /clientes` - Cria novo cliente
- `PUT /clientes/:id` - Atualiza cliente
- `DELETE /clientes/:id` - Remove cliente

### Pedidos
- `GET /pedidos` - Lista todos os pedidos
- `GET /pedidos/:id` - Busca pedido por ID
- `POST /pedidos` - Cria novo pedido

### Telefones
- `GET /telefones` - Lista todos os telefones
- `GET /telefones/:id` - Busca telefone por ID
- `POST /telefones` - Cria novo telefone
- `PUT /telefones/:id` - Atualiza telefone
- `DELETE /telefones/:id` - Remove telefone

## Upload de Imagens

As imagens são armazenadas na pasta `uploads/images/` e servidas através do endpoint `/uploads`.

Para fazer upload de uma imagem de produto:
```javascript
const formData = new FormData();
formData.append('imagem', file);

fetch('/produtos/upload', {
  method: 'POST',
  body: formData
});
```

## Validações

- **CPF**: Validado no cadastro de clientes
- **Números de telefone**: Limpos de caracteres especiais
- **Campos obrigatórios**: Validados em todos os endpoints

## Desenvolvimento

### Scripts Disponíveis

- `npm start` - Inicia o servidor

### Estrutura do Banco de Dados

O banco de dados `loja_ihs` contém as seguintes tabelas principais:

- `categorias` - Categorias de produtos
- `produtos` - Produtos da loja
- `clientes` - Dados dos clientes
- `pedidos` - Pedidos realizados
- `itens_pedidos` - Itens de cada pedido
- `telefones` - Telefones dos clientes
- `enderecos` - Endereços dos clientes

### Padrões de Desenvolvimento

- **ES6 Modules**: Uso de imports/exports
- **Async/Await**: Para operações assíncronas
- **Repository Pattern**: Separação da lógica de acesso a dados
- **Middleware Pattern**: Para validações e uploads

## Tratamento de Erros

A API retorna códigos HTTP apropriados:

- `200` - Sucesso
- `201` - Criado
- `400` - Requisição inválida
- `404` - Não encontrado
- `500` - Erro interno do servidor

## Licença

Este projeto é parte de um trabalho acadêmico (TCC).</content>