# Frontend - TechNova

Este diretório contém a interface frontend do projeto de e-commerce.
O site foi construído com Vite e JavaScript puro, consumindo uma API REST para produtos e pedidos.

## Funcionalidades

- **Página de Produtos**
  - Exibe uma vitrine de produtos em cards.
  - Cada card mostra imagem, nome, categoria, descrição e preço.
  - Botões para adicionar o produto ao carrinho ou comprar diretamente.
- **Carrinho**
  - Armazena os itens selecionados no localStorage.
  - Exibe quantidade, preço unitário e subtotal de cada item.
  - Mostra o total do pedido.
  - Permite remover itens do carrinho.
  - Botão de checkout para enviar o pedido à API.
- **Pedidos**
  - Lista os pedidos já realizados.
  - Mostra o status de cada pedido (Aberto, Finalizado, Pendente).
  - Exibe detalhes dos itens de cada pedido e valores.
- **Notificações**
  - Mensagens de toast são exibidas ao adicionar produtos ao carrinho, remover itens ou enviar um pedido.
- **Roteamento por hash**
  - Navegação entre `#/` (Produtos), `#/carrinho` e `#/pedidos`.

## Estrutura principal

- `index.html` - layout principal e navegação.
- `src/main.js` - roteador e inicialização da aplicação.
- `src/pages/produtos.js` - renderiza a página de produtos.
- `src/pages/carrinho.js` - renderiza o carrinho e controla o checkout.
- `src/pages/pedidos.js` - renderiza a lista de pedidos.
- `src/components/card.component.js` - cria os cards de produto.
- `src/api/api.js` - chamadas à API para produtos, pedidos e envio de pedidos.
- `src/storage/cart.js` - lógica de armazenamento do carrinho no `localStorage`.
- `src/utils/toast.js` - exibe notificações toast.
- `src/style.css` - estilos da aplicação.

## Como executar

1. Instale as dependências:


npm install


2. Rode o servidor de desenvolvimento:


npm run dev


3. Acesse o frontend no navegador no endereço exibido pelo Vite.

## Dependências

- `vite` (para desenvolvimento e build)

## Observações importantes

- A API está configurada em `src/api/api.js` com o endereço:
  `http://10.87.169.50:8081`.
- O backend deve estar rodando e disponível nesse endereço para que o frontend funcione corretamente.
- O `clienteId` usado no envio de pedido está fixo como `27`.
